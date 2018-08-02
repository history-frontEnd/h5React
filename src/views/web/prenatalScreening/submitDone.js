import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'

import './index.scss'

class SubmitDone extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.getSubmitDoneCode()
  }

  getSubmitDoneCode = () => {
    let {dispatch} = this.props
    dispatch({
      type: 'prenatalScreening/getSubmitDone',
      payload: {}
    })
  }

  render () {
    const {orderCode} = this.props.prenatalScreening
    return (
      <div className='submit-done'>
        <img src={'https://biosan-saas.oss-cn-beijing.aliyuncs.com/weichat/line/submit-success.png'}/>
        {orderCode
          ? (
            <div className="order-tip">
              <p>申请单号：{orderCode}</p>
              <p>请将申请条码填写到知情同意书的左上角</p>
              <p>请在“我的-我的订单”中查看订单详情</p>
            </div>
          )
          : (
            <p>请在“我的-我的订单”中查看订单详情</p>
          )
        }
      </div>
    )
  }
}

SubmitDone.propTypes = {
  history: PropTypes.object,
  prenatalScreening: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({prenatalScreening, loading}) => ({prenatalScreening, loading}))(SubmitDone)
