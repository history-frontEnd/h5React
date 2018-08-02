import modelExtend from 'dva-model-extend'
import { model } from './extend'
import {routerRedux} from 'dva/router'

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
    * toIndex ({payload}, {put}) {
      /**
       * 前往首页
       */
      yield put(routerRedux.push('/'))
    }
  }
})
