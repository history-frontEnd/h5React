// import {Toast} from 'antd-mobile'
// import {routerRedux} from 'dva/router'
import {model} from '../extend'
import modelExtend from 'dva-model-extend'

export default modelExtend(model, {
  namespace: 'itemDetail',
  state: {
    id: ''
  },
  reducers: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
      })
    }
  }
})
