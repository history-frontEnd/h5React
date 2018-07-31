import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import '../prenatalScreening/item.scss'

class ProjectItem extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = (id) => {
    let {dispatch} = this.props
    dispatch({type: 'prenatalScreening/toDetailPage', payload: {id: id}})
  }
  render () {
    return (
      <li className="item-li" onClick={() => this.handleClick(this.props.data.id)}>
        <img className="item-img" />
        <div className="item-text">
          <h4 className="item-title">{this.props.data.title}</h4>
          <p className="item-desc">{this.props.data.desc}</p>
          <div className="item-bottom">
            <div className="item-price"><span className="low">￥</span>{this.props.data.price}<span className="low">.00</span></div>
            <div className="item-users">{this.props.data.num}人次已做检查</div>
          </div>
        </div>
      </li>
    )
  }
}

ProjectItem.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  data: PropTypes.object
}
export default connect(({ app, loading }) => ({ app, loading }))(ProjectItem)
