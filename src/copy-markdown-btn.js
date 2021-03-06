import {React} from 'reactuate'
import classnames from 'classnames'
import Clipboard from 'clipboard'

class CopyMarkdownBtn extends React.Component {
  constructor() {
    super()
    this.timeoutId = null
    this.state = {
      copySccess: false
    }
  }

  componentDidMount() {
    const clipboard = new Clipboard('.CopyMarkdownBtn')

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
        className='CopyMarkdownBtn mdBtn--green'
        data-clipboard-text={localStorage.getItem('markdown') || 'Edit your rich text.'}>
        {this.state.copySccess ? 'Copied' : 'Copy'}
      </div>
    )
  }
}

export default CopyMarkdownBtn
