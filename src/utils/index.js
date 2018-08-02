/**
 * 工具类、实用函数
 */

import {
  isPord,
  isDebug
} from 'utils/config'

/**
 * 获取当前url中key对应的value
 * @param name
 */
const queryURL = (name: string) : ?string => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 获取url的查询对象，必须包含‘?’
 * @param url 可选，默认为当前location地址
 */
export function getUrlQuery (url) {
  url = url || window.location.href
  let query = {}

  if (typeof url === 'string' && url.length) {
    url = url.indexOf('?') > -1 ? url.replace(/\S*\?/, '') : ''

    let params = url.split('&')
    let length = params.length

    for (let i = 0; i < length; i++) {
      let param = params[i].replace(/#\S+/g, '').split('=')
      query[decodeURIComponent(param[0])] = decodeURIComponent(param[1]) || ''
    }
  }

  return query
}

const Debug = (msg) => {
  if (!isDebug || isPord) {
    return
  }
  if (typeof (msg) === 'string') {
    console.log(' ====Debug====: ' + msg)
  } else {
    console.log(' ====Debug====: ')
    console.log(msg)
  }
}

const currentUser = () => {
  return {
    login: window.sessionStorage.getItem('login'),
    nickName: window.sessionStorage.getItem('nick_name'),
    bindStatus: window.sessionStorage.getItem('bind_status'),
    isCompleted: window.sessionStorage.getItem('is_completed'),
  }
}

const setUser = (user) => {
  window.sessionStorage.setItem('login', user.login)
  window.sessionStorage.setItem('nick_name', user.nickName)
  window.sessionStorage.setItem('bind_status', user.bindStatus)
  window.sessionStorage.setItem('is_completed', user.isCompleted)
  return user
}
const setCookie = (cname, cvalue, exdays) => {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
const clearAllCookie = () => {
  // setCookie('PHPSESSID', '', -1)
}

const clearUser = () => {
  window.sessionStorage.setItem('login', null)
  window.sessionStorage.setItem('nick_name', null)
  window.sessionStorage.setItem('bind_status', null)
  window.sessionStorage.setItem('is_completed', null)
  clearAllCookie()
  return true
}

const isAuth = () => {
  let user = currentUser()
  return (user.isCompleted === true && user.login === true && user.bindStatus === true) || (user.isCompleted === 'true' && user.login === 'true' && user.bindStatus === 'true')
}

const isLogin = () => {
  let user = currentUser()
  return user.login === true || user.login === 'true'
}

const isCompleted = () => {
  let user = currentUser()
  return (user.login === true && user.isCompleted === true) || (user.login === 'true' && user.isCompleted === 'true')
}

// checkString(user.name, 8, '...')
const checkString = (str, len, tag) => {
  if (str && str.length > len) {
    return str.substring(0, len) + tag
  }
  return str
}

export default {
  checkString,
  setCookie,
  isCompleted,
  isLogin,
  isAuth,
  queryURL,
  currentUser,
  setUser,
  clearUser,
  Debug
}
