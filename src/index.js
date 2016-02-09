import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/flat.css'
import './index.css'
import {
  React,
  Route,
  Application
} from 'reactuate'
import ReactDOM from 'react-dom'
import MediumEditor from 'medium-editor'
import MeMarkdown from 'medium-editor-markdown'

import readmeText from './readme'
import Modal from './modal'

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      isModalShow: false
    }
  }

  componentDidMount() {
    this._initMediumEditor()
  }

  _initMediumEditor() {
    const editableEl = document.querySelectorAll('.editable')
    const markDownEl = document.querySelector('.markdown')
    const editor = new MediumEditor(editableEl, {
      targetBlank: true,
      extensions: {
        markdown: new MeMarkdown({
          events: ['input', 'change', 'DOMSubtreeModified']
        }, (md) => {
          markDownEl.textContent = md
        })
      }
    }).subscribe('editableInput', function (e, editable) {
      localStorage.setItem('editable', e.target.innerHTML)
    })
    editableEl[0].innerHTML = localStorage.getItem('editable') || readmeText
    // editableEl[0].innerHTML = readmeText
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
          <pre className='markdown'></pre>
        </div>
        <div className='footer'>
          <ul>
            <li onClick={::this.toggleModalShow}>About</li>
            <li>
              <a target='_blank' href='http://ionicabizau.github.io/medium-editor-markdown/'>GitHub</a>
            </li>
          </ul>
        </div>
        <Modal html={readmeText} isShow={this.state.isModalShow} toggleShow={::this.toggleModalShow} />
      </div>
    )
  }
}

// const routes = (
//   <Route component={App}>
//     <Route path='/' component={HomePage} />
//   </Route>
// )

ReactDOM.render(<HomePage/>, document.getElementById('app'))
// new Application({routes}).render()
