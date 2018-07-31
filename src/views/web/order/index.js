import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import shallowEqual from 'fbjs/lib/shallowEqual'
// import shallowCompare from 'react-addons-shallow-compare'

require('./index.scss')
class Order extends React.Component {
  constructor (props, context) {
    super(props, context)
    console.log(props)
    this.pay.bind(this)
    this.state = {
      payBtnEnable: true,
    }
  }
  pay = (e) => {
    e.preventDefault()
    this.setState({ payBtnEnable: false })
    this.props.dispatch({ type: 'order/pay', payload: { orderId: 'b408805d0d16498798b6df200a5ce30d' } }).then(() => {
      this.setState({ payBtnEnable: true })
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props.order, nextProps.order) || !shallowEqual(this.state, nextState)
  }
  componentDidMount () {
    this.props.dispatch({ type: 'order/getOrderDetail', payload: { orderId: 'b408805d0d16498798b6df200a5ce30d' } })
  }
  componentWillUpdate () {}
  componentWillMount () {}
  componentDidUpdate () {}
  render () {
    let order = this.props.order
    return (
      <div className="pay-order">
        <div className="title">订单信息</div>

        <div className="item">
          <div className="name">项目名称</div>
          <div className="value">{order.projectName}</div>
        </div>

        <div className="item">
          <div className="name">母亲名称</div>
          <div className="value">{order.motherName}</div>
        </div>

        <div className="item">
          <div className="name">开单医院</div>
          <div className="value">{order.hospitalName}</div>
        </div>

        <div className="item">
          <div className="name">开单时间</div>
          <div className="value">{order.orderDatetime}</div>
        </div>

        <div className="item">
          <div className="name">订单编号</div>
          <div className="value">{order.orderNo}</div>
        </div>

        <div className="item last">
          <div className="name">订单金额</div>
          <div className="value price">{order.payPrice}</div>
        </div>

        <div className="title">支付方式</div>

        <div className="item last">
          <div className="wechat-pay-name">
            <div></div>
            <div>微信支付</div>
          </div>
          <div className="wechat-pay-checked"></div>
        </div>
        <div className="pay saas-primary-btn" onClick={this.pay}>立即支付</div>
      </div>
    )
  }
}

Order.propTypes = {
  order: PropTypes.object,
  dispatch: PropTypes.func
}
export default connect(({ order }) => ({ order }))(Order)
