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

  _resetEditable() {
    const {editableElSelecter, readmeText} = this.props
    const editableEl = document.querySelector(editableElSelecter)
    editableEl.innerHTML = readmeText
    localStorage.setItem('editable', readmeText)
    this._changeText()
  }

  _changeText() {
    this.setState({resetSccess: true})
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
      this.setState({resetSccess: false})
    }, 5000)
  }

  render() {
    return (
      <div className='ResetEditableBtn' onClick={::this._resetEditable}>
        {this.state.resetSccess ? 'Done' : 'Reset'}
      </div>
    )
  }
}

export default ResetEditableBtn
