import { buildGetParam, buildPostParam } from './params'
import { isProd } from './index'

let host = isProd() ? `${location.protocol}//promo.in66.com` : ''

/**
 * 根据当前 protocol 选择地址
 * @param {String} https https的地址
 * @param {String} http http的地址
 */
const isHttps = (https, http) => location.protocol === 'http:' ? http : https

/**
 * 获取七牛token地址
 */
let qnTokenUrl = host + '/uploadCode/api/common/qiniutoken'
if (isProd()) {
  qnTokenUrl = host + '/api/common/qiniutoken'
}

/**
 * 七牛上传地址
 */
const qnUrl = isHttps('https://up.qbox.me', 'http://up.qiniu.com')

/**
 * 七牛base64上传地址
 */
const qnBase64Url = isHttps('https://up.qbox.me/putb64/-1/key/', 'http://up.qiniu.com/putb64/-1/key/')

/**
 * 获取七牛token失败
 */
const code0 = 'code: 0'
/**
 * 上传失败
 */
const code1 = 'code: 1'

/**
 * 获取上传图片的token
 * @param {Boolean} isPrivate 是否为私密空间
 */
const qnToken = isPrivate => new Promise((resolve, reject) => {
  fetch(buildGetParam(qnTokenUrl, isPrivate
    ? { time: +new Date(), isPrivate: 1 }
    : { time: +new Date() })).then(res => res.json()).then(res => {
    if (res.succ) {
      resolve(res.data)
    } else {
      reject(res.data.msg)
    }
  }).catch(() => { reject(code0) })
})

/**
 * 七牛base64上传图片
 * @param {String} base64 图片信息
 * @param {Boolean} isPrivate 是否为私密空间
 */
export const uploadBase64 = (base64, isPrivate = false) => new Promise((resolve, reject) => {
  base64 = /^data:image/.test(base64) ? base64.replace(/^.*?,/, '') : base64
  qnToken(isPrivate).then(tokenRes => {
    fetch(`${qnBase64Url}${tokenRes.key}`, {
      method: 'POST',
      headers: {
        Authorization: `UpToken ${tokenRes.token}`,
        contentType: 'application/octet-stream'
      },
      body: base64
    }).then(res => res.json()).then(res => {
      resolve({
        origin: tokenRes.urlTpl.replace('%QiniuUploadImg%', res.key).replace(/\?[^?]+$/, ''),
        key: res.key,
        hash: res.hash
      })
    }).catch(() => { reject(code1) })
  }, error => {
    reject(error)
  })
})

/**
 * 七牛二进制上传图片
 * @param {File} file 选择的文件
 * @param {Boolean} isPrivate 是否为私密空间
 */
export const uploadBlobFile = (file, isPrivate = false) => new Promise((resolve, reject) => {
  qnToken(isPrivate).then(tokenRes => {
    fetch(qnUrl, {
      method: 'POST',
      body: buildPostParam({
        key: tokenRes.key,
        token: tokenRes.token,
        file: file
      })
    }).then(res => res.json()).then(res => {
      resolve({
        origin: tokenRes.urlTpl.replace('%QiniuUploadImg%', res.key).replace(/\?[^?]+$/, ''),
        key: res.key,
        hash: res.hash
      })
    }).catch(() => { reject(code1) })
  }, error => {
    reject(error)
  })
})
