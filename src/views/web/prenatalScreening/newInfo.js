import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Button, DatePicker, InputItem, List} from 'antd-mobile'
import {createForm} from 'rc-form'

import './index.scss'
import 'themes/web/form.scss'

class NewInfo extends React.Component {
  constructor (props, context) {
    super(props, context)
    const timeZoneHour = new Date().getTimezoneOffset() / 60
    this.state = {
      currDate: new Date(Date.now() - timeZoneHour * 60 * 60 * 1000)
    }
  }
  componentDidMount () {
    console.log(navigator.userAgent)
    // TODO: 获取sysno、deptid、projectCode
    // const {location, dispatch} = this.props
    // const openid = location.search.split('=')[1]
    // dispatch({type: 'prenatalScreening/login', payload: {openid: openid, originType: 'official'}})
  }

  /**
   * 提交表单一
   * @param e
   */
  submitForm1 = (e) => {
    e.preventDefault()
    const {dispatch, form} = this.props
    form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'prenatalScreening/submitForm1', payload: values})
    })
  }

  /**
   * 获取短信验证码
   * @param e
   */
  getMobileCode = (e) => {
    e.preventDefault()
    const {form, dispatch} = this.props
    const momPhone = form.getFieldValue('momPhone')
    new Promise((resolve, reject) => {
      dispatch({type: 'prenatalScreening/getVerifyCode', payload: {momPhone, resolve, reject}})
    })
      .then((status) => {
        if (status) {
          // 发送成功后开始显示倒计时
          dispatch({type: 'prenatalScreening/isCountingDown', payload: false})
          this.countdownSeconds()
        }
      })
  }

  /**
   * 倒计时60秒
   */
  countdownSeconds () {
    const {prenatalScreening, dispatch} = this.props
    const {seconds} = prenatalScreening
    setTimeout(() => {
      if (seconds > 0) {
        dispatch({type: 'prenatalScreening/countdownSeconds', payload: seconds - 1})
        this.countdownSeconds()
      } else {
        dispatch({type: 'prenatalScreening/countdownSeconds', payload: 60})
        dispatch({type: 'prenatalScreening/isCountingDown', payload: false})
      }
    }, 1000)
  }

  onMenstruationChange = (date) => {
    const {dispatch} = this.props
    const lastMenstruation = date.toJSON().substr(0, 10)
    dispatch({type: 'prenatalScreening/setMenstruationDate', payload: lastMenstruation})
  }

  render () {
    const {currDate} = this.state
    const {form, prenatalScreening} = this.props
    const {counting, seconds} = prenatalScreening
    const lastMenstruation = form.getFieldValue('lastMenstruation')
    return (
      <div className='new-info'>
        <div className="tips-warp">请确保正确，否则将影响结果通知。</div>
        <form>
          <List className="inputs">
            <InputItem
              className="input-group require"
              {...form.getFieldProps('momName')}
              placeholder="请填写"
            >母亲姓名</InputItem>
            <DatePicker
              mode="date"
              extra=" "
              maxDate={currDate}
              onOk={this.onMenstruationChange}
              {...form.getFieldProps('lastMenstruation')}
            >
              <List.Item>
                <label className="require">末次月经</label>
                {!lastMenstruation &&
                  <div className="picker-arrow">
                    <span>请选择</span>
                    <img className="" src="https://oss.biosan.cn/weichat/line/arrow-right.png"/>
                  </div>
                }
              </List.Item>
            </DatePicker>
            <InputItem
              className="input-group require"
              {...form.getFieldProps('momCode')}
              placeholder="请填写"
            >母亲身份证</InputItem>
            <InputItem
              className="input-group require"
              {...form.getFieldProps('momPhone')}
              placeholder="请填写"
            >手机</InputItem>
            <InputItem
              className="input-group last phone-code"
              {...form.getFieldProps('code')}
              placeholder="请输入验证码"
            >
              {
                counting
                  ? <span className="gray">{seconds}</span>
                  : <span className="blue" onClick={this.getMobileCode}>获取验证码</span>
              }
            </InputItem>
          </List>
        </form>
        <Button className="btn-primary mt120" onClick={this.submitForm1}>下一步</Button>
      </div>
    )
  }
}

NewInfo.propTypes = {
  prenatalScreening: PropTypes.object,
  location: PropTypes.object,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({prenatalScreening, loading}) => ({prenatalScreening, loading}))(createForm()(NewInfo))
