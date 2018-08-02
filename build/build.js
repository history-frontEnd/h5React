const { test, rm } = require('shelljs')
const webpack = require('webpack')
const webpackcfg = require('./webpack.config')
const cfg = webpackcfg
if (test('-e', cfg.output.path)) {
  rm('-rf', cfg.output.path)
}
webpack(cfg, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})



