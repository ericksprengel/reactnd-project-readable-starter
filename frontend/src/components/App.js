import React, { PureComponent, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import CategoryDetail from './CategoryDetail'
import PostDetail from './PostDetail'

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <Router>
          <Switch>
            <Route path="/" exact component={CategoryDetail} />
            <Route path="/categories/:categoryPath" component={CategoryDetail} />
            <Route path="/posts/:postId" component={PostDetail} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App