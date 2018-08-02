const Koa = require('koa')
const app = new Koa()
const port = process.env.PORT
const serve = require('koa-static');
const path = require('path')
const staticPath = path.join(__dirname, `../dist`)
app.use(serve(staticPath))
app.use( async ( ctx ) => {
  // ctx.body = `try http://localhost:${port}/${target}/index.html`
  // ctx.set('Content-Type', 'text/plain')
  ctx.set('content-encoding', 'gzip')
})
app.listen(port, () => {
  console.log(`> serve statice: ${staticPath}`)
  console.log(`> Listening at http://localhost:${port}\n`)
})
