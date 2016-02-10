import {React} from 'reactuate'

class ResetEditableBtn extends React.Component {
  constructor() {
    super()
    this.timeoutId = null
    this.state = {
      resetSccess: false
    }
  }

  componentDidMount() {}

  handlereset() {
    const {editableEl, readmeText} = this.props
    editableEl.innerHTML = readmeText
    this.setState({resetSccess: true})
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      this.setState({resetSccess: false})
    }, 5000)
  }

  render() {
    return (
      <div className='ResetEditableBtn' onClick={::this.handlereset}>
        {this.state.resetSccess ? 'Resetted' : 'Reset'}
      </div>
    )
  }
}

export default ResetEditableBtn
