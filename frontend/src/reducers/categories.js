import { prop } from 'ramda'
import { objMergeFromListWith } from '../utils/commonFuncs'
import {
  LOAD_CATEGORIES,
} from '../actions/categories'
import {
  LOAD_POSTS_BY_CATEGORY,
  ADD_POST,
  DELETE_POST,
} from '../actions/posts'

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
    case ADD_POST:
    {
      const categoryPath = action.post.category
      const category = state[categoryPath]
      return {
        ...state,
        [categoryPath]: {
          ...category,
          postIds: [
            ...(category.postIds ? category.postIds : []),
            action.post.id,
          ],
        }
      }
    }
    case DELETE_POST:
    {
      const categoryPath = action.post.category
      const category = state[categoryPath]
      return {
        ...state,
        [categoryPath]: {
          ...category,
          postIds: category.postIds.filter(
            (postId) => postId !== action.post.id,
          ),
        }
      }
    }
    default:
      return state
  }
}

export default categories