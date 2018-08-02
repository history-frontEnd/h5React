/* globals ls */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const compressionPlugin = require('compression-webpack-plugin');

const assetsPath = (...relativePath) => path.join(__dirname, '..', ...relativePath)
const isFontFile = url => /\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(url)
const isProd = process.env.BABEL_ENV === 'production'
const isReport = process.env.REPORT === 'true'

const postCssPlugins = [
  autoprefixer({
    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
  }),
  pxtorem({ rootValue: 75, propWhiteList: [] })
]

let entryObj = {}
let invalidEntry = []
const entryGlobs = 'src/pages/**/entry.js'
ls(entryGlobs).forEach(file => {
  let folder = path.dirname(file)
  let includLen = ls(folder).filter(file => ['entry.js', 'tpl.pug'].includes(path.basename(file))).length
  if (includLen === ['entry.js', 'tpl.pug'].length) {
    entryObj[`${path.basename(folder)}`] = `./${path.relative(process.cwd(), file)}`
  } else {
    invalidEntry.push(folder)
  }
})

let webpackConfig = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'cheap-module-source-map',
  entry: entryObj,
  output: {
    path: assetsPath('dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    modules: [
      assetsPath('src'),
      assetsPath('node_modules')
    ],
    alias: Object.assign({}, {
      '@': assetsPath('src'),
      'assets': assetsPath('src/assets'),
      'components': assetsPath('src/components'),
      'middlewares': assetsPath('src/middlewares'),
      'models': assetsPath('src/models'),
      'routes': assetsPath('src/routes'),
      'themes': assetsPath('src/themes'),
      'utils': assetsPath('src/utils')
    }, {
      // 'react': 'anujs',
      // 'react-dom': 'anujs',
      // // 若要兼容 IE 请使用以下配置
      // // 'react': 'anujs/dist/ReactIE',
      // // 'react-dom': 'anujs/dist/ReactIE',
      // // 如果引用了 prop-types 或 create-react-class
      // // 需要添加如下别名
      // 'prop-types': 'anujs/lib/ReactPropTypes',
      // 'create-react-class': 'anujs/lib/createClass',
      // //如果你在移动端用到了onTouchTap事件
      // 'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
    })
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: [assetsPath('src')],
      exclude: [assetsPath('src/assets/libs')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.js$/,
      include: [assetsPath('src/assets/libs')],
      use: 'imports-loader?this=>window&define=>false'
    },
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: [assetsPath('src')],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => postCssPlugins
          }
        },
        'sass-loader',
      ]
    },
    {
      test: /\.less$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => postCssPlugins
          }
        },
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "hd": "2px",
            },
          }
        }
      ]
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]',
        publicPath: '../'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        outputPath: url => `${isFontFile(url) ? 'fonts' : 'media'}/${url}`,
        publicPath: url => `${isFontFile(url) ? '../' : './'}${url}`
      }
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader'
    }]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: isProd,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules\/(.*)\.js/,
          chunks: 'initial',
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: false
        }
      }
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
      DEBUG: !isProd
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[name].[hash].css' : '[name].css'
    })
  ].concat(isProd ? [
    new compressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ] : [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
}

Object.keys(webpackConfig.entry).forEach(entry => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      chunks: ['manifest', 'vendor', entry, '_polyfill', '_whm'],
      filename: `${entry}.html`,
      template: `./src/pages/${entry}/tpl.pug`
    }))
})
entryObj['_polyfill'] = [assetsPath(`src/_polyfill`)]
if (!isProd) {
  entryObj['_whm'] = ['webpack-hot-middleware/client']
}
console.log(entryObj)

isReport && webpackConfig.plugins.push(new BundleAnalyzerPlugin())
module.exports = webpackConfig
