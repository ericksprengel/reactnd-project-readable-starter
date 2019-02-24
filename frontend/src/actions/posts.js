import { showLoading, hideLoading } from 'react-redux-loading'
import {
  getPost as loadPostFromApi,
  getPosts as loadPostsFromApi,
  getPostsByCategory as loadPostsByCategoryFromApi,
  addPost as addPostFromApi,
  deletePost as deletePostFromApi,
  updatePost as updatePostFromApi,
  votePost as votePostFromApi,
} from '../utils/api/posts'
import {
  loadCommentsByPost,
} from './comments'

const LOAD_POST = 'LOAD_POST'
const LOAD_POSTS = 'LOAD_POSTS'
const LOAD_POSTS_BY_CATEGORY = 'LOAD_POSTS_BY_CATEGORY'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'

const PARAM_UPVOTE = 'upVote'
const PARAM_DOWNVOTE = 'downVote'

const actionLoadPost = (post) => {
  return {
    type: LOAD_POST,
    post,
  }
}

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

const actionAddPost = (post) => ({
  type: ADD_POST,
  post,
})

const actionDeletePost = (post) => ({
  type: DELETE_POST,
  post,
})

const actionUpdatePost = (post) => ({
  type: UPDATE_POST,
  post,
})

const loadPost = (postId) => {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return loadPostFromApi(postId).then((post) => {
      if (!post.id || post.error) {
        dispatch(hideLoading())
        return
      }
      dispatch(loadCommentsByPost(postId))
      dispatch(actionLoadPost(post))
      dispatch(hideLoading())
    })
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

const addPost = (post) => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return addPostFromApi(post).then((postFromApi) => {
        dispatch(actionAddPost(postFromApi))
        // dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in addPost', e)
        // dispatch(hideLoading())
      })
  }
}

const deletePost = (post) => {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return deletePostFromApi(post.id).then((postFromApi) => {
        dispatch(actionDeletePost(postFromApi))
        dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in deletePost', e)
        dispatch(hideLoading())
      })
  }
}

const updatePost = (postId, title, body) => {
  return (dispatch) => {
    return updatePostFromApi(postId, title, body).then((postFromApi) => {
      dispatch(actionUpdatePost(postFromApi))
    })
    .catch((e) => {
      console.warn('Error in updatePost', e)
    })
  }
}

const votePost = (postId, vote) => {
  return (dispatch) => {
    return votePostFromApi(postId, vote).then((postFromApi) => {
      dispatch(actionUpdatePost(postFromApi))
    })
    .catch((e) => {
      console.warn('Error in votePost', e)
    })
  }
}

export {
  LOAD_POST,
  LOAD_POSTS,
  LOAD_POSTS_BY_CATEGORY,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  loadPost,
  loadPosts,
  loadPostsByCategory,
  addPost,
  deletePost,
  updatePost,
  votePost, PARAM_UPVOTE, PARAM_DOWNVOTE,
}
