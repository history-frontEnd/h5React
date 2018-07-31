// import { routerRedux } from 'dva/router'
// import config from 'utils/config'
// import {
//   // login as loginService,
//   requestWithLogin
// } from 'utils/request'
// import co from 'co'
import { test } from 'services/web/common'
import { model } from '../extend'
import modelExtend from 'dva-model-extend'
import db from 'utils/db'
import queryString from 'query-string'
export default modelExtend(model, {
  namespace: 'app',
  state: {
    pin: false,
  },
  reducers: {
    updateState (state : Object, { payload }:{payload: Object}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * login ({payload}, {put, call, select, take}) {
      let res = yield call(test, payload)
      console.log(res)
      // let res = yield call(requestWithLogin, { openid: 'osi8b0YMNbblqM87ev2RwgXRHtfA' })
      // yield put({
      //   type: 'app/updateState',
      //   payload: {pin: false, oss: {orderCode: 'dsadasd'}}
      // })
    }

  },
  subscriptions: {
    setup ({ history }) {
      let query = queryString.parse(history.location.search)
      if (query.openid) {
        db.set('openid', query.openid)
      }
      return () => {}
    }
  }
})
