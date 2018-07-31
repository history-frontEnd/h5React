export let env = process.env.NODE_ENV

const domains = {
  test: 'https://xcx.saas.biosan.cn', // 测试api接口
  development: 'https://xcx.dev.saas.biosan.cn', // 开发api接口
  // development: 'http://172.16.28.216:8000', // 开发api接口
  production: 'https://api-saas.biosan.cn', // api接口
  sys: 'https://xcx.sys.saas.biosan.cn'
}
const dbPrefixes = {
  test: 'biosan.sass.h5.test.',
  development: 'biosan.sass.h5.dev.',
  production: 'biosan.sass.h5.prod.',
  sys: 'biosan.sass.h5.sys.'
}

// env = 'sys'
env = 'test'
// env = 'development'
// env = 'production'

console.log('-----------')
console.log('current: ' + env)
console.log('-----------')

export const isMock = true // 开启mock功能，设为false时全局request中mock选项失效
export const isDebug = true
export const domain = domains[env]
export const dbPrefix = dbPrefixes[env]
export const appTitle = '贝安康'
export const isPord = env === 'production'
export const isDev = env === 'development'
export const isTest = env === 'test'
