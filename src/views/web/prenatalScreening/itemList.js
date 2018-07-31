import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ProjectItem from '../components/projectItem'

import './item.scss'

class ItemList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      data: [
        {
          id: 0,
          title: '5项疾病筛查',
          desc: '包含基础4病及地中海贫血筛查',
          price: '280.00',
          num: 908
        },
        {
          id: 1,
          title: '5项疾病筛查',
          desc: '包含基础4病及地中海贫血筛查',
          price: '280.00',
          num: 908
        }
      ],
      isIpx: ''
    }
  }
  componentWillMount () {
    this.setState({isIpx: this.isIpx()})
  }
  // 判断是否iphoneX机型
  isIpx = () => {
    return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
  }
  render () {
    return (
      <div className={this.state.isIpx ? 'item-page ipx-item-page' : 'item-page'}>
        <ul className="item-list">
          {
            this.state.data.map((item, index) =>
              <ProjectItem data={item} key={index} />
            )
          }
        </ul>
      </div>
    )
  }
}

ItemList.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ app, loading }) => ({ app, loading }))(ItemList)
