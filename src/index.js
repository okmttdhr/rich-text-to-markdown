import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/flat.css'
import './index.css'
import {
  React,
  Route,
  Application
} from 'reactuate'
import MediumEditor from 'medium-editor'
import MeMarkdown from 'medium-editor-markdown'

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class HomePage extends React.Component {
  componentDidMount() {
    this.initMediumEditor()
  }

  initMediumEditor() {
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
    editableEl[0].innerHTML = localStorage.getItem('editable') || 'text here'
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
          <a target='_blank' href='http://ionicabizau.github.io/medium-editor-markdown/'>GitHub</a>
        </div>
      </div>
    )
  }
}

const routes = (
  <Route component={App}>
    <Route path='/' component={HomePage} />
  </Route>
)

new Application({routes}).render()
