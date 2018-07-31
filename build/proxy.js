const assert = require('assert')
const request = require('request')
const PassThrough = require('stream').PassThrough
const join = require('path').join
const chokidar = require('chokidar')
let config = require('../config.mock')
const configModule = require.cache[require.resolve('../config.mock')]
const watcher = chokidar.watch([configModule.filename].concat(configModule.children.map(_ => _.filename)), {
  ignored: /node_modules/,
  persistent: true
})
watcher.on('change', path => {
  delete require.cache[require.resolve('../config.mock')]
  config = require('../config.mock')
})
module.exports = async (ctx, next) => {
  let shouldProxy = false
  Object.keys(config).forEach((key) => {
    if (shouldProxy) return
    const keyParsed = parseKey(key)
    assert(
      !!request[keyParsed.method],
      `method of ${key} is not valid`
    )
    assert(
      typeof config[key] === 'function' ||
      typeof config[key] === 'object' ||
      typeof config[key] === 'string',
      `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
    )
    const reg = new RegExp(`^${keyParsed.path}`)
    if (reg.test(ctx.url) && keyParsed.method.toUpperCase() === ctx.method) {
      shouldProxy = true
      if (typeof config[key] === 'string') {
        let url = reg.exec(ctx.url).length > 1 ? reg.exec(ctx.url)[1] : ctx.url
        url = join(config[key], url).replace(/:\//, '://')

        let j = request.jar();
        let cookie = request.cookie('auth_key_for_platform=cb4a2af030ca45388893706183993d44');
        j.setCookie(cookie, url);

        ctx.body = ctx.req.pipe(request({
          uri: url,
          jar: j,
          method: ctx.method
        }).on('response', response => {
          ctx.set(response.headers)
        })).pipe(PassThrough())
      } else {
        ctx.type = 'json'
        ctx.body = config[key]
      }
    }
  })
  await next()
}

function parseKey (key) {
  let method = 'get'
  let path = key
  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ')
    method = splited[0].toLowerCase()
    path = splited[1]
  }
  return { method, path }
}
