import {
  getPosts as loadPostsFromApi,
  getPostsByCategory as loadPostsByCategoryFromApi,
} from "../utils/api/posts"

const LOAD_POSTS = 'LOAD_POSTS'
const LOAD_POSTS_BY_CATEGORY = 'LOAD_POSTS_BY_CATEGORY'

const actionLoadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    posts,
  }
}

const actionLoadPostsByCategory = (categoryPath, posts) => {
  return {
    type: LOAD_POSTS_BY_CATEGORY,
    categoryPath,
    posts,
  }
}

const loadPosts = () => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return loadPostsFromApi().then((posts) => {
        dispatch(actionLoadPosts(posts))
        // dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in loadPosts', e)
        // dispatch(hideLoading())
      })
  }
}

const loadPostsByCategory = (categoryPath) => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return loadPostsByCategoryFromApi(categoryPath).then((posts) => {
        dispatch(actionLoadPostsByCategory(categoryPath, posts))
        // dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in loadPostsByCategory', e)
        // dispatch(hideLoading())
      })
  }
}

export {
  LOAD_POSTS,
  LOAD_POSTS_BY_CATEGORY,
  loadPosts,
  loadPostsByCategory
}
