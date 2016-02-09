import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import {
  React,
  Route,
  Application,
  connect,
  bindActionCreators
} from 'reactuate'
import MediumEditor from 'medium-editor'

import counter from './counter'
import counterAsync from './counter/async'

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

HomePage = connect(state => ({counter: state.counter.counter}),
                   dispatch => ({actions:
                     bindActionCreators({...counter.actions, ...counterAsync.actions}, dispatch)}))(HomePage)

const routes = (
  <Route component={App}>
    <Route path="/" component={HomePage} />
  </Route>
)

new Application({routes, domains: {counter, counterAsync}}).render()
