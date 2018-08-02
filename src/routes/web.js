import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect, routerRedux} from 'dva/router'
import dynamic from 'dva/dynamic'
import Web from '../views/Index'

const {ConnectedRouter} = routerRedux
const Routers = function ({history, app}) {
  const routes = []
  routes.push({
    path: `/home`,
    models: () => [import(`../models/home`)],
    component: () => import(`../views/Home`)
  })
  return (
    <ConnectedRouter history={history}>
      <Web>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
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
