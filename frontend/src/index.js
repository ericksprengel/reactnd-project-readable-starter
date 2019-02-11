import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import * as serviceWorker from './serviceWorker'

import Home from './components/Home'
import CategoryDetail from './components/CategoryDetail'

const store = createStore(
  reducer,
  middleware,
)

ReactDOM.render(
  <Provider store={store}>
    <CategoryDetail categoryPath="react" />
    <Home />
  </Provider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
