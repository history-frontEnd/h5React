// import {routerRedux} from 'dva/router'
// import {Toast} from 'antd-mobile'
import modelExtend from 'dva-model-extend'
import { model } from '../extend'
import { pay, getOrderDetail } from 'services/web/common'

export default modelExtend(model, {
  namespace: 'order',
  state: {
    motherName: '',
    projectName: '',
    hospitalName: '',
    orderDatetime: '',
    orderNo: '',
    payPrice: '',
    payDatetime: ''
  },
  reducers: {},
  subscriptions: {},
  effects: {
    * getOrderDetail ({ payload }, { put, call, select, take }) {
      let resp = yield call(getOrderDetail, payload)
      if (resp.result === 'success' && resp.data) {
        let currentOrder = {
          motherName: resp.data.mother_name,
          projectName: resp.data.project_name,
          hospitalName: resp.data.hospital_name,
          orderDatetime: resp.data.order_datetime,
          payDatetime: resp.data.pay_datetime,
          orderNo: resp.data.order_no,
          payPrice: resp.data.pay_price
        }
        yield put({
          type: 'updateState',
          payload: { ...currentOrder }
        })
      }
    },
    * pay ({payload}, {put, call, select, take}) {
      let res = yield call(pay, payload)
      console.log(res)
      // yield put({
      //   type: 'app/updateState',
      //   payload: {pin: false, oss: {orderCode: 'dsadasd'}}
      // })
    }
  }
})
