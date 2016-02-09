import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import {
  React,
  Route,
  Application
} from 'reactuate'
import MediumEditor from 'medium-editor'

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class HomePage extends React.Component {
  componentDidMount() {
    const elements = document.querySelectorAll('.editable')
    const editor = new MediumEditor(elements)
  }

  render() {
    return (
      <div>
        <div className='editable'>test test</div>
      </div>
    )
  }
}

const routes = (
  <Route component={App}>
    <Route path="/" component={HomePage} />
  </Route>
)

new Application({routes}).render()
