import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import Web from '../views/web/Index'

const {ConnectedRouter} = routerRedux
const Routers = function ({history, app}) {
  const routes = []
  routes.push({
    path: `/prenatalScreening/newInfo`,
    models: () => [import(`../models/web/prenatalScreening`)],
    component: () => import(`../views/web/prenatalScreening/newInfo`)
  })
  routes.push({
    path: `/prenatalScreening/newInfoSubmit`,
    models: () => [import(`../models/web/prenatalScreening`)],
    component: () => import(`../views/web/prenatalScreening/newInfoSubmit`)
  })
  routes.push({
    path: `/prenatalScreening/submitDone`,
    models: () => [import(`../models/web/prenatalScreening`)],
    component: () => import(`../views/web/prenatalScreening/submitDone`)
  })
  routes.push({
    path: `/prenatalScreening/itemList`,
    models: () => [import(`../models/web/prenatalScreening`)],
    component: () => import(`../views/web/prenatalScreening/itemList`)
  })
  routes.push({
    path: `/prenatalScreening/itemDetail`,
    models: () => [import(`../models/web/itemDetail`)],
    component: () => import(`../views/web/prenatalScreening/itemDetail`)
  })
  routes.push({
    path: `/order`,
    models: () => [import(`../models/web/order`)],
    component: () => import(`../views/web/order`)
  })
  routes.push({
    path: `/prenatalScreening/checkServicePage`,
    models: () => [import(`../models/web/prenatalScreening`)],
    component: () => import(`../views/web/prenatalScreening/checkServicePage`)
  })
  return (
    <ConnectedRouter history={history}>
      <Web>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/prenatalScreening/newInfoSubmit"/>)}/>
          {routes.map(({path, ...dynamics}, key) =>
            (<Route key={key}
              exact
              path={path}
              component={dynamic({app, ...dynamics})}
            />))}
        </Switch>
      </Web>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
}

export default Routers
