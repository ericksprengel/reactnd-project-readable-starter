import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'

const reducers = combineReducers({
  categories,
  posts,
  comments,
})

export default reducers