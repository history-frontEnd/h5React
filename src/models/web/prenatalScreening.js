import {Toast} from 'antd-mobile'
import {routerRedux} from 'dva/router'
import {model} from '../extend'
import modelExtend from 'dva-model-extend'
import {login} from '../../services/web/common'
import {verifyMobileCode, getCode, submitFormData, queryAreaTree} from '../../services/web/prenatalScreening'
import {isForm1Verified, isForm2Verified, verifyMomPhone} from './formVerify'
import {district} from './district'

export default modelExtend(model, {
  namespace: 'prenatalScreening',
  state: {
    usertoken: '',
    momName: '',
    momPhone: '',
    momCode: '',
    code: '',
    lastMenstruation: '',
    momBirthday: '',
    momAge: '',
    momWeight: '',
    addrCodeArr: [0, 0, 0],
    addrStr: '',
    detailAddress: '',
    orderCode: '',
    projectCode: '',
    sysNo: '',
    deptId: '',
    isScan: '1',
    isFree: '',
    seconds: 60,
    counting: false,
    canClick: true,
    protocolChecked: false,
    provinces: [],
    cities: [],
    areas: [],
    district: district
  },
  reducers: {
    'countdownSeconds' (state, {payload}) {
      return {
        ...state,
        seconds: payload
      }
    },
    'isCountingDown' (state, {payload}) {
      return {
        ...state,
        counting: payload
      }
    },
    'setFormData' (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    'setOrderCode' (state, {payload}) {
      return {
        ...state,
        orderCode: payload
      }
    },
    'checkProtocol' (state, {payload}) {
      return {
        ...state,
        protocolChecked: payload
      }
    },
    'setMomAgeBirthday' (state, {payload}) {
      return {
        ...state,
        momAge: payload.momAge,
        momBirthday: payload.momBirthday
      }
    },
    'setMenstruationDate' (state, {payload}) {
      return {
        ...state,
        lastMenstruation: payload
      }
    },
    'setProvinceList' (state, {payload}) {
      return {
        ...state,
        provinces: payload
      }
    },
    'setCityList' (state, {payload}) {
      return {
        ...state,
        cities: payload
      }
    },
    'setAreaList' (state, {payload}) {
      return {
        ...state,
        areas: payload
      }
    },
    'setAddrCodeArr' (state, {payload}) {
      return {
        ...state,
        addrCodeArr: payload
      }
    },
    'setDistrict' (state, {payload}) {
      return {
        ...state,
        district: payload
      }
    }
  },
  subscriptions: {},
  effects: {
    * getVerifyCode ({payload}, {put, call, select, take}) {
      /**
       * 获取验证码
       */
      if (!verifyMomPhone(payload.momPhone)) return
      const resp = yield call(getCode, {mobile: payload.momPhone})
      let {result, message} = resp
      if (result === 'success') {
        payload.resolve(true)
      } else {
        Toast.fail(message)
        payload.reject(false)
      }
    },

    * checkService ({payload}, {put, call, select, take}) {
      /**
       * 前往服务协议页面
       */
      yield put(routerRedux.push('/prenatalScreening/checkServicePage'))
    },

    * submitForm1 ({payload}, {put, call, select, take}) {
      /**
       * 表单一提交只发送校验验证码的请求
       */
      delete payload.lastMenstruation
      yield put({type: 'setFormData', payload: payload})
      const formData = yield select(getFormData)
      if (!isForm1Verified(formData)) return
      yield put(routerRedux.push('/prenatalScreening/newInfoSubmit'))
      const resp = yield call(verifyMobileCode, {
        mobile: payload.momPhone,
        verifycode: payload.code
      })
      let {result, message} = resp
      if (result === 'success') {
        // 验证码校验成功跳转到表单页2（newInfoSubmit）
        yield put(routerRedux.push('/prenatalScreening/newInfoSubmit'))
      } else {
        Toast.fail(message)
      }
    },

    * submitFormAll ({payload}, {put, call, select, take}) {
      /**
       * 表单所有数据提交
       */
      delete payload.momAge
      delete payload.momBirthday
      yield put({type: 'setFormData', payload: payload})
      const formData = yield select(getFormData)
      if (!isForm2Verified(formData)) return
      const resp = yield call(submitFormData, {
        mother_name: formData.momName,
        mother_mobile: formData.momPhone,
        mobile_type: navigator.userAgent,
        identity_cardNo: formData.momCode,
        lmpcycle: formData.lastMenstruation,
        mother_age: formData.momAge,
        mother_weight: formData.momWeight,
        mother_birthday: formData.momBirthday,
        address_code: formData.addrCodeArr.join(','),
        address: formData.detailAddress,
        project_code: formData.projectCode,
        request_no: formData.orderCode,
        sysno: formData.sysNo,
        deptid: formData.deptId
      })
      let {result, message} = resp
      if (result === 'success') {
        // 提交成功重刷token
        const loginResp = yield call(login, {
          openid: payload.openid,
          originType: payload.originType
        })
        let {result, message} = loginResp
        if (result === 'success') {
          if (formData.isFree === '1') {
            // 免费项目提交完后跳到完成订单页面
            Toast.success('提交成功')
            yield put(routerRedux.push(`/prenatalScreening/submitDone?orderCode=${resp.data.request_no}`))
          } else {
            // 非免费项目提交完后跳到订单详情支付
            Toast.success('提交成功')
            yield put(routerRedux.push(`/order?orderId=${resp.data.order_id}&orderType=tower`))
          }
        } else {
          Toast.fail(message)
        }
      } else {
        Toast.fail(message)
      }
    },

    * writeAddress ({payload}, {put, call, select, take}) {
      let tArea = []
      let tCity = []
      let pickerData = []
      let tempData = []
      const districtData = yield select(getDistrictData)
      const resp = yield call(queryAreaTree, {
        parent_code: payload.code
      })
      let {result, message, data} = resp
      if (result === 'fail') {
        Toast.hide()
        Toast.fail(message)
        return false
      }
      if (result === 'success' && result) {
        switch (payload.index) {
          case 1:
            tArea = data.district.map(d => {
              return {
                label: d.area_name,
                value: d.area_code,
                children: []
              }
            })
            tCity = data.city.map(c => {
              return {
                label: c.area_name,
                value: c.area_code,
                children: tArea
              }
            })
            pickerData = data.province.map(p => {
              return {
                label: p.area_name,
                value: p.area_code,
                children: tCity
              }
            })
            yield put({type: 'setDistrict', payload: pickerData})
            yield put({type: 'setProvinceList', payload: data.province})
            yield put({type: 'setCityList', payload: data.city})
            yield put({type: 'setAreaList', payload: data.district})
            break
          case 2:
            tArea = data.district.map(d => {
              return {
                label: d.area_name,
                value: d.area_code,
                children: []
              }
            })
            tCity = data.city.map(c => {
              return {
                label: c.area_name,
                value: c.area_code,
                children: tArea
              }
            })
            tempData = districtData.map(item => {
              item.children = tCity
              return item
            })
            console.log(tempData)
            yield put({type: 'setDistrict', payload: tempData})
            yield put({type: 'setCityList', payload: data.city})
            yield put({type: 'setAreaList', payload: data.district})
            break
          case 3:
            tArea = data.district.map(d => {
              return {
                label: d.area_name,
                value: d.area_code,
                children: []
              }
            })
            tempData = districtData.map(item => {
              item.children.map(d => {
                d.children = tArea
                return d
              })
              return item
            })
            yield put({type: 'setDistrict', payload: tempData})
            yield put({type: 'setAreaList', payload: data.district})
            break
          default:
            break
        }
        return true
      }
    },

    * initAddress ({payload}, {put, call, select, take}) {
      const resp = yield call(queryAreaTree, {
        parent_code: payload.code
      })
      let {result, message, data} = resp
      if (result === 'fail') {
        Toast.hide()
        Toast.fail(message)
        return false
      }
      if (result === 'success' && result) {
        switch (payload.index) {
          case 1:
            const tArea = data.district.map(d => {
              return {
                label: d.area_name,
                value: d.area_code,
                children: []
              }
            })
            const tCity = data.city.map(c => {
              return {
                label: c.area_name,
                value: c.area_code,
                children: tArea
              }
            })
            const pickerData = data.province.map(p => {
              return {
                label: p.area_name,
                value: p.area_code,
                children: tCity
              }
            })
            yield put({type: 'setAddrCodeArr', payload: [pickerData[0].value, 0, 0]})
            yield put({type: 'setDistrict', payload: pickerData})
            yield put({type: 'setProvinceList', payload: data.province})
            yield put({type: 'setCityList', payload: data.city})
            yield put({type: 'setAreaList', payload: data.district})
            break
          case 2:
            yield put({type: 'setCityList', payload: data.city})
            yield put({type: 'setAreaList', payload: data.district})
            break
          case 3:
            yield put({type: 'setAreaList', payload: data.district})
            break
          default:
            break
        }
        return true
      }
    },

    * getSubmitDone ({payload}, {put, call, select, take}) {
      /**
       * 表单提交完成
       */
      yield put({
        type: 'app/updateState',
        payload: {orderCode: 'dsadasd'}
      })
    },
    * toDetailPage ({payload}, {put, call, select, take}) {
      yield put(routerRedux.push('/prenatalScreening/itemDetail', {id: payload.id}))
    }
  }
})
export const getFormData = state => state.prenatalScreening
export const getDistrictData = state => state.prenatalScreening.district
