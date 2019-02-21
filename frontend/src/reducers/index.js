import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import session from './session'

const reducers = combineReducers({
  categories,
  posts,
  comments,
  session,
  loadingBar: loadingBarReducer,
})

export default reducers