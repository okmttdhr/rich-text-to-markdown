import {React} from 'reactuate'
import classnames from 'classnames'
import Clipboard from 'clipboard'

class CopyBtn extends React.Component {
  componentDidMount() {
    new Clipboard('.CopyBtn')
  }

  render() {
    return (
      <div className='CopyBtn' data-clipboard-text={localStorage.getItem('editable')}>Copy</div>
    )
  }
}

export default CopyBtn
