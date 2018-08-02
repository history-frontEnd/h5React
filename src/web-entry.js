import nprogressDva from './middlewares/nprogress-dva'
import {Toast} from 'antd-mobile'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
// import dvaImmer from 'dva-immer'
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  history: createHistory(),
  onError (error) {
    Toast.fail(error.message)
  }
})
app.use(nprogressDva)

// 2. Model
app.model(require('./models/index'))

// 3. Router
app.router(require('./routes/web'))

// 4. Start
app.start('#app')
