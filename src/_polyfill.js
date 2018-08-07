import 'core-js/fn/promise'
import 'react'
import 'react-dom'
import 'dva'
import 'dva-loading'
import FastClick from 'fastclick'

if (document.body) {
  FastClick.attach(document.body)
}
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill (mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener () {},
      removeListener: function removeListener () {}
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
}
