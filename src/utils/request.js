/* global window */
// import Qs from 'qs'
// import cloneDeep from 'lodash/cloneDeep'
// import pathToRegexp from 'path-to-regexp'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { domain, isMock } from './config'
import db from 'utils/db'
import { Debug } from 'utils'
import co from 'co'
import { login as loginService } from 'services/web/common'
axios.defaults.withCredentials = true

export const forEachParam = (forEach, ...params) => params.forEach(param => param && Object.keys(param).forEach(key => forEach(key, param[`${key}`])))
export const buildPostParam = (...params) => {
  let data = new FormData()
  forEachParam((key, val) => {
    data.append(key, val)
  }, ...params)
  return data
}

export const logout = () => {
  db.remove('token')
  db.remove('isRegister')
  db.remove('userId')
}

export const req = (options, loading = false) => {
  return co(requestWithLogin(options, loading))
}

export function deepCopy (source) {
  let result = {}
  for (let key in source) {
    result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
  }
  return result
}

export function * requestWithLogin (options, loading = false) {
  let isLogin = false
  let token = db.get('token')
  let resp = {}
  if (token) {
    isLogin = true
  } else {
    isLogin = yield login()
  }
  if (isLogin) {
    resp = yield request(options, loading)
    if (isNeedFreshCode(options.url, resp.result, resp.message)) {
      isLogin = yield login()
      Debug('> code need refresh ~')
      Debug(isLogin)
      if (isLogin) {
        resp = yield request(options, loading)
      }
    }
  }

  return resp
}

export function setSession (loginData) {
  db.set('token', loginData.usertoken)
  db.set('isRegister', !(loginData.notregister === 'true'))
  db.set('userId', loginData.user_id)
}

export function * login (options = {}) {
  logout()
  let openid = db.get('openid')

  try {
    let loginResp = yield loginService({ openid })

    if (loginResp.result === 'success') {
      setSession(loginResp.data)
      return true
    } else {
      throw new Error('用户登录失败！')
    }
  } catch (err) {
    console.log('err', err)
    Toast.fail('登录失败！')
    return false
  }
}

const fetch = (options) => {
  let {
    headers,
    method = 'get',
    data,
    url
  } = options
  method = method.toLowerCase()
  let params = (method === 'get') && options.data || {}
  let baseURL = domain
  if (isMock && options.mock) {
    baseURL = location.origin
    delete options.mock
  }
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: headers
  })
  return instance({
    url,
    data,
    method,
    params,
    transformRequest: [(params) => {
      let ret = []
      for (let it in params) {
        ret.push(`${encodeURIComponent(it)}=${encodeURIComponent(params[it])}&`)
      }
      return ret.join('')
    }]
  })
}
export const baseParams = {
  originType: 'official'
  // originType: 'miniprogram'
}

export const isParamsNeedToken = (url) => {
  return !/login/gi.test(url)
}

export const isNeedFreshCode = (url, result, message) => {
  return !/login/.test(url) && (result === 'fail' && message === 'token失效')
}

// options.data = Qs.stringify(options.params)
export default function request (options, loading = false) {
  let opts = deepCopy(options)
  opts.params = opts.params || {}
  if (isParamsNeedToken(opts.url)) {
    opts.params.usertoken = db.get('token')
  }
  opts.params = {
    ...baseParams,
    ...opts.params
  }
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  opts.data = opts.params
  if (loading) Toast.loading('加载中...', 0)
  return fetch(opts).then((response) => {
    Debug('response success: ' + opts.url)
    Debug(response.data)
    if (loading) Toast.hide()
    return Promise.resolve(response && response.data)
  }).catch((error) => {
    Debug('response fail: ' + opts.url)
    Debug(error)
    if (loading) Toast.hide()
    let msg = error.message || '网络错误'
    Toast.fail(msg)
    return Promise.reject(new Error(msg))
  })
}
