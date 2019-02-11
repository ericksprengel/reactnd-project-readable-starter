import React, { PureComponent, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import CategoryDetail from './CategoryDetail'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/categories/:categoryPath" component={CategoryDetail} />
        </Fragment>
      </Router>
    )
  }
}

export default App