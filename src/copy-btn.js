import {React} from 'reactuate'
import classnames from 'classnames'
import Clipboard from 'clipboard'

class CopyBtn extends React.Component {
  constructor() {
    super()
    this.timeoutId = null
    this.state = {
      copySccess: false
    }
  }

  componentDidMount() {
    const clipboard = new Clipboard('.CopyBtn')

    clipboard.on('success', () => {
      this.setState({copySccess: true})
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.setState({copySccess: false})
      }, 5000)
    })

    clipboard.on('error', () => {
      this.setState({copySccess: false})
      alert('Copy failed. Please reload this page and try again.')
    })
  }

  render() {
    return (
      <div
        className='CopyBtn'
        data-clipboard-text={localStorage.getItem('markdown') || 'Edit your rich text.'}>
        {this.state.copySccess ? 'Copied' : 'Copy'}
      </div>
    )
  }
}

export default CopyBtn
