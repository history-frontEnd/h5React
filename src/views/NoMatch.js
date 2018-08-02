/**
 * 未匹配 (404)
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {connect} from 'dva/index'
import {withRouter} from 'dva/router'

const PageWrapper = styled.div`
  font-size: 28px;
`

class NoMatch extends React.Component {
  componentDidMount () {
    setTimeout(() => this.props.dispatch({type: 'app/toIndex'}), 2500)
  }

  render () {
    const {location} = this.props
    return (
      <PageWrapper>
        <h3>Not Found ~<code>{location.pathname}</code></h3>
      </PageWrapper>
    )
  }
}

NoMatch.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object
}

export default withRouter(connect(({app}) => ({app}))(NoMatch))
