import { prop } from 'ramda'
import { objFromListWith } from '../utils/rambaExt'
import {
  LOAD_POST,
  LOAD_POSTS,
  LOAD_POSTS_BY_CATEGORY,
} from '../actions/posts'
import {
  LOAD_COMMENTS_BY_POST,
} from '../actions/comments'

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
    case LOAD_COMMENTS_BY_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentIds: action.comments.map(comment => comment.id),
        }
      }
    default:
      return state
  }
}

export default posts