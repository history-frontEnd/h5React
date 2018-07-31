<div align="center">
<h1>DvaReact 模板</h1>
</div>

[![React](https://img.shields.io/badge/react-^15.6.1-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.11.2-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![dva](https://img.shields.io/badge/dva-^2.0.1-orange.svg?style=flat-square)](https://github.com/dvajs/dva)

[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

### Quick start

```bash
$ npm start 
```

### Technology Stack

* [Webpack](https://webpack.js.org/)
* [React](https://doc.react-china.org/)
* [Ant Design](https://ant.design/docs/react/introduce-cn)
* [dva](https://github.com/dvajs/dva)

### File Structure 

```bash
5in/
├── /dist/            # 输出目录
│ ├── /admin/         # 输出 - 运营后台
│ └── /web/           # 输出 - web
├── /build/           # 构建文件
├── /src/             # 源码目录
│ ├── /assets/        # 资源文件
│ ├── /components/    # UI组件
│ ├── /middlewares/   # 插件
│ ├── /mocks/         # 数据mock
│ ├── /models/        # 数据模型
│ ├── /routes/        # 路由配置
│ ├── /themes/        # 样式文件
│ ├── /utils/         # 工具函数
│ ├── /views/         # 页面组件
│ ├── admin-entry.js  # 运营后台入口
│ ├── web-entry.js    # web入口
│ ├── _polyfill.js    # 依赖代码
│ └── _tpl.html       # 模版文件
├── /test/            # 测试目录
├── config.mock.js    # mock配置
├── package.json      # 项目信息
├── .gitignore        # git过滤配置
├── .babelrc          # Babel配置
└── .eslintrc         # Eslint配置
```
