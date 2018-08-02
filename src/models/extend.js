const model = {
  reducers: {
    update (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  subscriptions: {},
  effects: {
    * updateState ({ payload = {} }, { call, put }) {
      yield put({ type: 'update', payload })
    },
  }
}

module.exports = {model}
