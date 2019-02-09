import {
  getPosts as loadPostsFromApi,
} from "../utils/api/posts"

const LOAD_POSTS = 'LOAD_POSTS'

const actionLoadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
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
        console.warn('Error in fetchPosts', e)
        // dispatch(hideLoading())
      })
  }
}

export {
  LOAD_POSTS,
  loadPosts,
}
