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
import LeftMobileOutOverlay from './left-mobile-out-overlay'

class HomePage extends React.Component {
  constructor() {
    super()
    this.editableElSelecter = '.editable'
    this.markDownElSelecter = '.markdown'
    this.state = {
      isModalShow: false
    }
  }

  componentDidMount() {
    this._initMediumEditor()
  }

  _initMediumEditor() {
    const editableEl = document.querySelector(this.editableElSelecter)
    const markDownEl = document.querySelector(this.markDownElSelecter)
    const editor = new MediumEditor(editableEl, {
      targetBlank: true,
      paste: {
        forcePlainText: false
      },
      extensions: {
        markdown: new MeMarkdown({
          events: ['input', 'change', 'DOMSubtreeModified']
        }, (md) => {
          markDownEl.textContent = md
          localStorage.setItem('markdown', markDownEl.textContent)
        })
      }
    }).subscribe('editableInput', function (e, editable) {
      localStorage.setItem('editable', e.target.innerHTML)
    })
    editableEl.innerHTML = localStorage.getItem('editable') || readmeText
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
          <ResetEditableBtn editableElSelecter={this.editableElSelecter} readmeText={readmeText} />
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
        <LeftMobileOutOverlay />
      </div>
    )
  }
}

ReactDOM.render(<HomePage/>, document.getElementById('app'))
