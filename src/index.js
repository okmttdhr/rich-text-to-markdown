import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/flat.css'
import './index.css'
import {React} from 'reactuate'
import ReactDOM from 'react-dom'
import MediumEditor from 'medium-editor'
import MeMarkdown from 'medium-editor-markdown'

import readmeText from './readme'
import Modal from './modal'
import CopyMarkdownBtn from './copy-markdown-btn'
import ResetEditableBtn from './reset-editable-btn'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      isModalShow: false,
      editableEl: null,
      markDownEl: null,
    }
  }

  componentDidMount() {
    this._initMediumEditor()
  }

  _initMediumEditor() {
    // this.setState({
      // editableEl: 'aaa',
      // markDownEl: 'aaa',
    // })
    // this.setState({isModalShow: 'text'})
    this.setState({
      editableEl: document.querySelector('.editable'),
      markDownEl: document.querySelector('.markdown'),
    })
    console.log(this.state)
    const editor = new MediumEditor(this.state.editableEl, {
      targetBlank: true,
      paste: {
        forcePlainText: false
      },
      extensions: {
        markdown: new MeMarkdown({
          events: ['input', 'change', 'DOMSubtreeModified']
        }, (md) => {
          this.state.markDownEl.textContent = md
          localStorage.setItem('markdown', this.state.markDownEl.textContent)
        })
      }
    }).subscribe('editableInput', function (e, editable) {
      localStorage.setItem('editable', e.target.innerHTML)
    })
    this.state.editableEl.innerHTML = localStorage.getItem('editable') || readmeText
  }

  toggleModalShow() {
    this.setState({isModalShow: !this.state.isModalShow})
  }

  render() {
    return (
      <div className='container'>
        <h1>Rich Text to Markdown</h1>
        <div className='editor'>
          <div className='editable'></div>
          <ResetEditableBtn editableEl={this.state.editableEl} readmeText={readmeText} />
          <pre className='markdown'></pre>
          <CopyMarkdownBtn />
        </div>
        <div className='footer'>
          <ul>
            <li onClick={::this.toggleModalShow}>About</li>
            <li>
              <a target='_blank' href='https://github.com/okmttdhr/rich-text-to-markdown'>GitHub</a>
            </li>
          </ul>
        </div>
        <Modal html={readmeText} isShow={this.state.isModalShow} toggleShow={::this.toggleModalShow} />
      </div>
    )
  }
}

ReactDOM.render(<HomePage/>, document.getElementById('app'))
