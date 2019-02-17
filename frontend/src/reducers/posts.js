import { prop } from 'ramda'
import { objMergeFromListWith } from '../utils/commonFuncs'
import {
  LOAD_POST,
  LOAD_POSTS,
  LOAD_POSTS_BY_CATEGORY,
} from '../actions/posts'
import {
  LOAD_COMMENTS_BY_POST,
  ADD_COMMENT,
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
      return objMergeFromListWith(
        prop('id'),
        action.posts,
        state,
      )
    case LOAD_COMMENTS_BY_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentIds: action.comments.map(comment => comment.id),
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          commentIds: [
            ...state[action.comment.parentId].commentIds,
            action.comment.id,
          ],
        }
      }
    default:
      return state
  }
}

export default posts