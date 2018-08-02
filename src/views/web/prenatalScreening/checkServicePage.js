import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'

import './index.scss'

class ItemList extends React.Component {
  render () {
    return (
      <div className="rule-container">
        <div className="rules-text">
          <h1 className="title">贝安康服务协议</h1>
          <p>欢迎您使用贝安康的服务！</p>
          <p>为使用贝安康的服务，您应当阅读并遵守《贝安康服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、管辖与法律适用条款，以及开通或使用某项服务的单独协议。限制、免责条款可能以黑体加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本协议所有条款，否则您无权使用贝安康提供的服务。您使用贝安康的服务即视为您已阅读并同意上述协议的约束。</p>
          <p>如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。</p>
          <p className="sub-title">一、【协议的范围】</p>
          <p>1.1本协议是您与贝安康之间关于用户使用贝安康相关服务所订立的协议。“贝安康”是指杭州贝安云科技有限公司及其相关服务可能存在的运营关联单位。“用户”是指使用贝安康相关服务的使用人，在本协议中更多地称为“您”。</p>
          <p>1.2本协议项下的服务是指贝安康向用户提供的包括但不限于报告查询、科普宣教、登记录入、电子商务和广告等产品及服务（以下简称“本服务”）。</p>
          <p className="sub-title">二、【帐号与密码安全】</p>
          <p>2.1您在使用登记录入的服务时会注册一个帐号并且登录。</p>
          <p>2.2贝安康特别提醒您应妥善保管您的帐号及血卡信息。因您保管不善可能导致遭受个人信息泄露，责任由您自行承担。</p>
          <p className="sub-title">三、【用户个人信息保护】</p>
          <p>3.1保护用户个人信息是贝安康的一项基本原则。贝安康将按照法律法规及相关医院的信息安全要求执行保护个人信息。</p>
          <p>3.2您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若因查询服务有特殊规定的，您需要填写真实的身份信息及相关孕产信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>
          <p>3.3一般情况下，您可随时浏览、修改自己提交的信息。</p>
          <p>3.4贝安康将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
          <p className="sub-title">四、【按现状提供服务】</p>
          <p>您理解并同意，贝安康的服务是按照现有技术和条件所能达到的现状提供的。贝安康会尽最大努力向您提供服务，确保服务的连贯性和安全性；但贝安康不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</p>
          <p className="sub-title">五、【自备设备】</p>
          <p>5.1您应当理解，您使用贝安康的服务需自行准备与相关服务有关的终端设备（如电脑、调制解调器等装置），并承担所需的费用（如电话费、上网费等费用）。</p>
          <p>5.2您理解并同意，您使用本服务时会耗用您的终端设备和带宽等资源。</p>
          <p className="sub-title">六、【广告】</p>
          <p>6.1您同意贝安康可以在提供服务的过程中自行或由第三方广告商向您发送广告、推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向您特别通知而变更。</p>
          <p>6.2贝安康可能为您提供选择关闭广告信息的功能，但任何时候您都不得以本协议未明确约定或贝安康未书面许可的方式屏蔽、过滤广告信息。</p>
          <p>6.3贝安康依照法律的规定对广告商履行相关义务，您应当自行判断广告信息的真实性并为自己的判断行为负责，除法律明确规定外，您因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，贝安康不承担责任。</p>
          <p>6.4您同意，对贝安康服务中出现的广告信息，您应审慎判断其真实性和可靠性，除法律明确规定外，您应对依该广告信息进行的交易负责。</p>
          <p className="sub-title">七、【支付服务】</p>
          <p>7.1贝安康的部分服务是提供相关的支付服务，请遵守相关协议。</p>
          <p className="sub-title">八、【知识产权声明】</p>
          <p>8.1贝安康在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归贝安康所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有。</p>
          <p>8.2除另有特别声明外，贝安康提供本服务时所依托软件的著作权、专利权及其他知识产权均归贝安康所有。</p>
          <p>8.3贝安康在本服务中所使用的“贝安康”、“贝安昕”、“贝安课堂”、“贝安韵”、“贝安海”及logo等商业标识，其著作权或商标权归杭州贝安云科技有限公司所有。</p>
          <p>8.4上述及其他任何本服务包含的内容的知识产权均受到法律保护，未经杭州贝安云科技有限公司、用户或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。</p>
          <p className="sub-title">九、【不可抗力及其他免责事由】</p>
          <p>9.1您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，贝安康将努力在第一时间与相关单位配合，及时进行修复，但是由此给您造成的损失贝安康在法律允许的范围内免责。</p>
          <p>9.2在法律允许的范围内，贝安康对以下情形导致的服务中断或受阻不承担责任：</p>
          <p>(1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</p>
          <p>(2）用户或贝安康的电脑软件、系统、硬件和通信线路出现故障；</p>
          <p>(3）用户操作不当；</p>
          <p>(4）用户通过非贝安康授权的方式使用本服务；</p>
          <p>(5）其他贝安康无法控制或合理预见的情形。</p>
          <p>9.4您理解并同意，本服务并非为某些特定目的而设计，包括但不限于核设施、军事用途、医疗设施、交通通讯等重要领域。如果因为软件或服务的原因导致上述操作失败而带来的人员伤亡、财产损失和环境破坏等，贝安康不承担法律责任。</p>
          <p>9.5贝安康依据本协议约定获得处理违法违规内容的权利，该权利不构成贝安康的义务或承诺，贝安康不能保证及时发现违法行为或进行相应处理。</p>
          <p>9.6在任何情况下，您不应轻信借款、索要密码或其他涉及财产的网络信息。涉及财产操作的，请一定先核实对方身份，并请经常留意贝安康有关防范诈骗犯罪的提示。</p>
          <p className="sub-title">十、【协议的生效与变更】</p>
          <p>10.1您使用贝安康的服务即视为您已阅读本协议并接受本协议的约束。</p>
          <p>10.2贝安康有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。</p>
          <p>10.3本协议条款变更后，如果您继续使用贝安康提供的软件或服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用贝安康提供的软件或服务。</p>
          <p className="sub-title">十一、【管辖与法律适用】</p>
          <p>11.1本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>
          <p>11.2本协议签订地为中华人民共和国浙江省杭州市西湖区。</p>
          <p>11.3若您和贝安康之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地（即中国浙江省杭州市西湖区）有管辖权的人民法院管辖。</p>
          <p>11.4本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
          <p>11.5本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
          <p>特别提示：本平台内部分内容来自互联网，如主张知识产权，请来电或致函告知，本平台将迅速采取适当措施，否则，与之有关的知识产权纠纷本平台不承担任何责任。</p>
          <p style={{textAlign: 'right', marginTop: 60}}>杭州贝安云科技有限公司</p>
        </div>
      </div>
    )
  }
}

ItemList.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}
export default connect(({app, loading}) => ({app, loading}))(ItemList)
