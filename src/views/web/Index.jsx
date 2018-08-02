import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import 'themes/web/index.scss'
class Web extends React.Component {
  state = {}

  render () {
    return (
      <div className="web-container">
        {this.props.children}
      </div>
    )
  }
}

Web.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object
}
export default withRouter(connect(({app, loading}) => ({app, loading}))(Web))
