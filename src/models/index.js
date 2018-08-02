import {test} from 'services/web/common'
import {model} from './extend'
import modelExtend from 'dva-model-extend'
import db from 'utils/db'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'app',
  state: {
    pin: false
  },
  reducers: {
    updateState (state: Object, {payload}: { payload: Object }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * login ({payload}, {put, call, select, take}) {
      /**
       * 登录
       */
      let res = yield call(test, payload)
      console.log(res)
    }
  },
  subscriptions: {
    setup ({history}) {
      let query = queryString.parse(history.location.search)
      if (query.openid) {
        db.set('openid', query.openid)
      }
      return () => {
      }
    }
  }
})
