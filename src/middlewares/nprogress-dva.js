import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

function onEffect (effect, { put }, model, actionType) {
  return function * (...args) {
    NProgress.start()
    yield effect(...args)
    NProgress.done()
  }
}

function onAction () {
  return next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
      NProgress.start()
      NProgress.done()
    }
    return next(action)
  }
}

export default {
  onEffect,
  onAction
}
