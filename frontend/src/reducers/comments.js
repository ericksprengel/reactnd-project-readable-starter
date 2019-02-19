import {
  dissoc,
  prop,
} from 'ramda'
import { objFromListWith } from '../utils/commonFuncs'
import {
  LOAD_COMMENTS_BY_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/comments'

const comments = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS_BY_POST:
      return {
        ...state,
        ...objFromListWith(
          prop('id'),
          action.comments,
        )
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
        }
      }
    case DELETE_COMMENT:
      return dissoc(action.comment.id, state)

    default:
      return state
  }
}

export default comments