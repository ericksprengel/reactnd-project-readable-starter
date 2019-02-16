import { prop } from 'ramda'
import { objFromListWith } from '../utils/rambaExt'
import {
  LOAD_COMMENTS_BY_POST,
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
    default:
      return state
  }
}

export default comments