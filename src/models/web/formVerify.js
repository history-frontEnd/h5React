import {Toast} from 'antd-mobile'

export function verifyMomName (momName) {
  const reg = /^[a-zA-Z0-9 \u4e00-\u9fa5]*$/
  if (!momName) {
    Toast.fail('请输入母亲姓名!')
    return false
  }
  if (momName.length > 15) {
    Toast.fail('母亲姓名不能超过15个字!')
    return false
  }
  if (/(^\s+)|(\s+$)/g.test(momName)) {
    Toast.fail('姓名开头或者结尾不能包含空格!')
    return false
  }
  if (!reg.test(momName)) {
    Toast.fail('母亲姓名不能含特殊字符!')
    return false
  }
  return true
}

export function verifyMomPhone (momPhone) {
  const reg = /^1[0-9]{10}$/g
  if (!momPhone) {
    Toast.fail('请输入母亲手机!')
    return false
  }
  if (momPhone.length < 11) {
    Toast.fail('请输入11位手机号!')
    return false
  }
  if (!reg.test(momPhone)) {
    Toast.fail('非有效手机号!')
    return false
  }
  return true
}

export function verifyCode (code) {
  const reg = /^\d{6}$/g
  if (!code) {
    Toast.fail('请输入手机验证码!')
    return false
  }
  if (!reg.test(code)) {
    Toast.fail('请输入6位数字的验证码!')
    return false
  }
  return true
}

export function verifyMomCode (momCode) {
  const reg = /^[1-6][0-7][\d]{4}((19[\d]{2})|(20[0-1][\d]))((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))[\d]{3}[\dx|X]$/
  if (!momCode) {
    Toast.fail('请输入母亲身份证!')
    return false
  }
  if (!reg.test(momCode)) {
    Toast.fail('请重新核对身份证号码!')
    return false
  }
  return true
}

export function verifyLastMenstruation (lastMenstruation) {
  if (!lastMenstruation) {
    Toast.fail('请选择末次月经日期!')
    return false
  }
  return true
}

export function verifyMomBirthday (momBirthday) {
  if (!momBirthday) {
    Toast.info('请选择母亲生日!')
    return false
  }
  return true
}

export function verifyMomAge (momAge) {
  if (momAge === '' || momAge === undefined) {
    Toast.fail('请输入年龄!')
    return false
  }
  if (isNaN(momAge)) {
    Toast.fail('年龄只能是数字!')
  }
  if (momAge < 0 || momAge > 100) {
    Toast.fail('年龄只能0-100的数字!')
  }
  return true
}

export function verifyAddrStr (addrStr) {
  if (!addrStr) {
    Toast.fail('请选择地址!')
    return false
  }
  return true
}

export function verifyMomWeight (momWeight) {
  const reg = /^\d{1,3}(\.{1}\d{0,2})?$/g
  if (!reg.test(momWeight + '')) {
    Toast.fail('请输入正确的体重！')
    return false
  }
  if (momWeight < 0 || momWeight > 500) {
    Toast.fail('体重应大于0克小于等于500kg！')
    return false
  }
  return true
}

export function verifyDetailAddress (detailAddress) {
  if (!detailAddress) {
    Toast.fail('请输入详细地址！')
    return false
  }
  if (detailAddress.length < 5) {
    Toast.fail('详细地址不少于5个字！')
    return false
  }
  if (detailAddress.length > 50) {
    Toast.fail('地址最多为50字！')
    return false
  }
  return true
}

export function verifyProtocolChecked (protocolChecked) {
  if (!protocolChecked) {
    Toast.fail('请勾选已阅读服务协议！')
    return false
  }
  return true
}

export function verifyOrderCode (orderCode, isScan) {
  if (!orderCode && isScan === '0') {
    Toast.fail('请录入申请单号！')
    return false
  }
  return true
}

/**
 * 校验form1
 * @param params
 * @returns {boolean}
 */
export function isForm1Verified (params) {
  const isCodeValid = verifyCode(params.code)
  const isMonPhoneValid = verifyMomPhone(params.momPhone)
  const isMonCodeValid = verifyMomCode(params.momCode)
  const isLastMenstruationValid = verifyLastMenstruation(params.lastMenstruation)
  const isMonNameValid = verifyMomName(params.momName)
  if (
    isMonCodeValid &&
    isCodeValid &&
    isMonPhoneValid &&
    isLastMenstruationValid &&
    isMonNameValid
  ) {
    return true
  } else {
    return false
  }
}

export function isForm2Verified (params) {
  const isProtocolCheckedValid = verifyProtocolChecked(params.protocolChecked)
  const isOrderCodeValid = verifyOrderCode(params.orderCode, params.isScan)
  const isDetailAddressValid = verifyDetailAddress(params.detailAddress)
  const isAddrStrValid = verifyAddrStr(params.addrCodeArr)
  const isMomWeightValid = verifyMomWeight(params.momWeight)
  const isMomAgeValid = verifyMomAge(params.momAge)
  const isMomBirthdayValid = verifyMomBirthday(params.momBirthday)
  if (
    isMomAgeValid &&
    isMomWeightValid &&
    isMomBirthdayValid &&
    isAddrStrValid &&
    isDetailAddressValid &&
    isOrderCodeValid &&
    isProtocolCheckedValid
  ) {
    return true
  } else {
    return false
  }
}
