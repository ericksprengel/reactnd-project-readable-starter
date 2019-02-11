import { prop } from 'rambda'
import { objFromListWith } from '../utils/rambaExt'
import {
  LOAD_POSTS, LOAD_POSTS_BY_CATEGORY,
} from '../actions/posts'

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
    case LOAD_POSTS_BY_CATEGORY:
      return {
        ...state,
        ...objFromListWith(
          prop('id'),
          action.posts,
        )
      }
    default:
      return state
  }
}

export default posts