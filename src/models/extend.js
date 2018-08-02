import modelExtend from 'dva-model-extend'

const model = {
  reducers: {
    update (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  subscriptions: {
    // setup ({ dispatch, history }) {
    //   history.listen((location) => {
    //     dispatch({
    //       type: '@@dva/UPDATE'
    //     })
    //   })
    // }
  },
  effects: {
    * updateState ({ payload = {} }, { call, put }) {
      yield put({ type: 'update', payload })
    },
  }
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      // showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 15
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})

module.exports = {
  model,
  pageModel,
}
