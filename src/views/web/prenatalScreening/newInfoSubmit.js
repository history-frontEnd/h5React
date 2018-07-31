import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Button, DatePicker, InputItem, List, Picker} from 'antd-mobile'
import {createForm} from 'rc-form'
import wx from 'weixin-js-sdk'
import './index.scss'
import 'themes/web/form.scss'

class NewInfoSubmit extends React.Component {
  constructor (props, context) {
    super(props, context)
    const timeZoneHour = new Date().getTimezoneOffset() / 60
    this.state = {
      currDate: new Date(Date.now() - timeZoneHour * 60 * 60 * 1000)
    }
    // props.dispatch({type: 'prenatalScreening/initAddress', payload: {index: 1, code: '100000'}})
  }

  /**
   * 提交表单
   */
  submit = () => {
    let {dispatch, form} = this.props
    form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'prenatalScreening/submitFormAll', payload: values})
    })
  }

  /**
   * 掉起微信扫码获取条形码数据
   */
  callScanCode = () => {
    const {dispatch} = this.props
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: res => {
        const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        dispatch({type: 'prenatalScreening/setOrderCode', payload: result})
        console.log(result)
      }
    })
  }

  checkProtocol = () => {
    const {dispatch, prenatalScreening} = this.props
    let {protocolChecked} = prenatalScreening
    dispatch({type: 'prenatalScreening/checkProtocol', payload: !protocolChecked})
  }

  /**
   * 生日改变后需要在state里更新momAge，momBirthday
   * @param date
   */
  onBirthdayChange = (date) => {
    const {dispatch, form} = this.props
    const momYear = date.getFullYear()
    const momAge = parseInt(new Date().getFullYear() - momYear)
    const momBirthday = date.toJSON().substr(0, 10)
    form.setFieldsValue({momAge})
    dispatch({type: 'prenatalScreening/setMomAgeBirthday', payload: {momAge, momBirthday}})
  }

  onLocationColChange = (val) => {
    const {prenatalScreening, dispatch, form} = this.props
    let {addrCodeArr} = prenatalScreening
    const provinceNum = val[0]
    const cityNum = val[1]
    const countyNum = val[2]
    if (addrCodeArr[0] !== provinceNum) {
      addrCodeArr = [provinceNum, 0, 0]
      dispatch({type: 'prenatalScreening/setAddrCodeArr', payload: addrCodeArr})
      dispatch({type: 'prenatalScreening/writeAddress', payload: {index: 2, code: provinceNum}})
      form.setFieldsValue({addrCodeArr: addrCodeArr})
    } else if (addrCodeArr[1] !== cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      addrCodeArr = [provinceNum, cityNum, 0]
      dispatch({type: 'prenatalScreening/setAddrCodeArr', payload: addrCodeArr})
      dispatch({type: 'prenatalScreening/writeAddress', payload: {index: 3, code: cityNum}})
      form.setFieldsValue({addrCodeArr: addrCodeArr})
    } else if (addrCodeArr[2] !== countyNum) {
      // 滑动选择了区
      addrCodeArr = [provinceNum, cityNum, countyNum]
      dispatch({type: 'prenatalScreening/setAddrCodeArr', payload: addrCodeArr})
      form.setFieldsValue({addrCodeArr: addrCodeArr})
    }
  }

  render () {
    const {currDate} = this.state
    const {form, dispatch, prenatalScreening} = this.props
    const {isScan, momAge, orderCode, district, protocolChecked} = prenatalScreening
    const momBirthday = form.getFieldValue('momBirthday')
    const addrCodeArr = form.getFieldValue('addrCodeArr')
    return (
      <div className='new-info'>
        <div className="tips-warp">请确保正确，否则将影响结果通知。</div>
        <form>
          <List className="inputs">
            <DatePicker
              mode="date"
              extra=" "
              maxDate={currDate}
              onOk={this.onBirthdayChange}
              {...form.getFieldProps('momBirthday')}
            >
              <List.Item>
                <label className="require">母亲生日</label>
                {!momBirthday &&
                <div className="picker-arrow">
                  <span>请选择</span>
                  <img src="https://oss.biosan.cn/weichat/line/arrow-right.png"/>
                </div>
                }
              </List.Item>
            </DatePicker>
            <InputItem
              disabled
              className="input-group require"
              {...form.getFieldProps('momAge')}
              placeholder="请填写"
              value={momAge}
            >年龄（周岁）</InputItem>
            <InputItem
              className="input-group require"
              {...form.getFieldProps('momWeight')}
              placeholder="请填写"
            >孕妇体重</InputItem>
            <Picker extra=" "
              data={district}
              title=""
              itemStyle={{ color: '#5D5D5D', fontSize: 12 }}
              {...form.getFieldProps('addrCodeArr')}
              onOk={e => console.log('ok', e)}
            >
              <List.Item>
                <label className="require">居住地址</label>
                {!addrCodeArr &&
                <div className="picker-arrow">
                  <span>请选择</span>
                  <img className="" src="https://oss.biosan.cn/weichat/line/arrow-right.png"/>
                </div>
                }
              </List.Item>
            </Picker>
            <InputItem
              className="input-group input-left"
              {...form.getFieldProps('detailAddress')}
              placeholder="请输入详细地址(不少于五个字)"
            > </InputItem>
          </List>
        </form>
        {isScan === '0' &&
          <div className="inputs blood-code" onClick={this.callScanCode}>
            <label>申请单号</label>
            {orderCode &&
              <view className="darker">{{orderCode}}</view>
            }
            <img src="https://oss.biosan.cn/weichat/line/blood-code.png"/>
          </div>
        }
        <div className="protocol">
          {protocolChecked
            ? <img src="https://biosan-saas.oss-cn-beijing.aliyuncs.com/h5Client/checked.png"
              onClick={this.checkProtocol}/>
            : <img src="https://biosan-saas.oss-cn-beijing.aliyuncs.com/h5Client/check.png" onClick={this.checkProtocol}/>
          }
          <span onClick={this.checkProtocol}>阅读并同意使用</span>
          <span className="link" onClick={() => dispatch({type: 'prenatalScreening/checkService'})}>服务协议</span>
        </div>
        <Button className="btn-primary" onClick={this.submit}>提交</Button>
      </div>
    )
  }
}

NewInfoSubmit.propTypes = {
  form: PropTypes.object,
  prenatalScreening: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({prenatalScreening, loading}) => ({prenatalScreening, loading}))(createForm()(NewInfoSubmit))
