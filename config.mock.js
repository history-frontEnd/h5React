const mock = {
  'POST /khaos/pay': {
    "code":10001,
    "result":"success",
    "message":"成功",
    "data": {"open_id":"osi8b0YMNbblqM87ev2RwgXRHtfA","usertoken":"70D3A732DF518BCD819E23F7E1EE6F85","notregister":"true","user_id":"21c7cb26f94a469b941a33ef225a073b"}
  },
  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // Forward 到另一个服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'Get /someDir/(.*)': 'http://172.16.0.97:8000',

  'Get /uploadCode/(.*)': 'http://promo.in66.com',

  'Post /postSomeDir/(.*)': 'http://172.16.0.97:8000',
  'Put /postSomeDir/(.*)': 'http://172.16.0.97:8000',
  'Delete /postSomeDir/(.*)': 'http://172.16.0.97:8000',
  'PATCH /postSomeDir/(.*)': 'http://172.16.0.97:8000'
}
require('fs').readdirSync(require('path').join(__dirname + '/src/mocks')).forEach(function (file) {
  Object.assign(mock, require('./src/mocks/' + file))
})
module.exports = mock
