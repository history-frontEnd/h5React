import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import './item.scss'

class ItemDetail extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isIpx: ''
    }
  }
  componentDidMount () {
    console.log(this.props.location.state)
  }
  componentWillMount () {
    this.setState({isIpx: this.isIpx()})
  }
  isIpx = () => {
    return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
  }
  render () {
    return (
      <div className="detail-page">
        <div className={this.state.isIpx ? 'detail-page-container ipx-detail-page-container' : 'detail-page-container'}>
          <img className="detail-page-banner" />
          <div className="detail-page-intro">
            <h4 className="item-title">4项疾病筛查</h4>
            <p className="item-desc">基础4病筛查：包括PKU，CH，CAH，G-6-PD筛查</p>
            <div className="item-bottom">
              <div className="item-price"><span className="low">￥</span>299<span className="low">.00</span></div>
              <div className="item-users detail-users">3298人次已做检查</div>
            </div>
          </div>
          <div className="detail-page-article">
            <h4 className="article-title">什么是发育健康评估及其意义？</h4>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
            <p className="article-p">蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者在冰岛转飞机的几小时的间歇中也要...</p>
          </div>
        </div>
        <button className={this.state.isIpx ? 'btn-write ipx-btn-write' : 'btn-write'}>填写资料</button>
      </div>
    )
  }
}

ItemDetail.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  location: PropTypes.object
}
export default connect(({ app, loading }) => ({ app, loading }))(ItemDetail)
