/**
 * 是否为数组
 * @param {Object} val
 */
const isObj = val => Object.prototype.toString.call(val) === '[object Object]'
/**
 * 是否为数组
 * @param {Object} val
 */
const isArray = val => Object.prototype.toString.call(val) === '[object Array]'

/**
 * 遍历请求参数
 * @param {object} param 参数
 * @param {function} append 回调方法
 */
const analyseParam = (param, append) => buildParam('', param, append)

/**
 * 构建参数
 * @param {string} prefix key的前缀
 * @param {object} param  参数
 * @param {function} append 回调方法
 */
const buildParam = (prefix, param, append) => {
  if (isObj(param) || isArray(param)) {
    Object.keys(param).forEach(key => {
      let val = param[`${key}`]
      let _key = isObj(val) || isArray(val) || isObj(param) ? key : ``
      buildParam(prefix === '' ? key : `${prefix}[${_key}]`, val, append)
    })
  } else {
    append(`${prefix}`, param)
  }
}

/**
 * 构建get请求参数
 * @param {*} url 地址
 * @param {*} params 请求对象
 */
export const buildGetParam = (url, ...params) => {
  let query = []
  params.forEach(param => analyseParam(param, (key, val) => {
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
  }))
  if (query.length === 0) return url
  return `${url}?${query.join('&')}`
}

/**
 * 构建post请求参数
 * @param {*} params 请求对象
 */
export const buildPostParam = (...params) => {
  let data = new FormData()
  params.forEach(param => analyseParam(param, (key, val) => {
    data.append(key, val)
  }))
  return data
}

/**
 * 如果在请求中，让方法无效
 */
export const loadingPromise = (errInfo) => new Promise((resolve, reject) => console.warn(errInfo))
