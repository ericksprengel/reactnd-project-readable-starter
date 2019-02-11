import { prop } from 'rambda'
import { objFromListWith } from '../utils/rambaExt'
import {
  LOAD_CATEGORIES,
} from '../actions/categories'
import { LOAD_POSTS_BY_CATEGORY } from '../actions/posts';

const categories = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        ...objFromListWith(
          prop('path'),
          action.categories,
        )
      }
    case LOAD_POSTS_BY_CATEGORY:
      return {
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