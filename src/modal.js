import {React} from 'reactuate'
import classnames from 'classnames'

class Modal extends React.Component {
  componentDidMount() {
    document.querySelectorAll('.Modal__content')[0].innerHTML = this.props.html;
  }

  render() {
    return (
      <div className={classnames({
        Modal: true,
        isShow: this.props.isShow
      })}>
        <div className='Modal__overlay' onClick={::this.props.toggleShow}></div>
        <div className='Modal__content'></div>
      </div>
    )
  }
}

export default Modal
