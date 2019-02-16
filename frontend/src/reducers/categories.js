import { prop } from 'ramda'
import { objMergeFromListWith } from '../utils/commonFuncs'
import {
  LOAD_CATEGORIES,
} from '../actions/categories'
import { LOAD_POSTS_BY_CATEGORY } from '../actions/posts'

const categories = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return objMergeFromListWith(
        prop('path'),
        action.categories,
        state,
      )
    case LOAD_POSTS_BY_CATEGORY:
      return {
        ...state,
        [action.categoryPath]: {
          ...state[action.categoryPath],
          postIds: action.posts.map(post => post.id),
        }
      }
    default:
      return state
  }
}

export default categories