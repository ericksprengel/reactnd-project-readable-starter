import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(
  thunk,
  logger,
)

export default composeEnhancers(middleware)