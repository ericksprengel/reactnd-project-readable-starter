import { prop } from 'ramda'
import { objFromListWith } from '../utils/rambaExt'
import {
  LOAD_POST,
  LOAD_POSTS,
  LOAD_POSTS_BY_CATEGORY,
} from '../actions/posts'

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POST:
      return {
        ...state,
        [action.post.id]: {
          ...action.post,
        }
      }
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