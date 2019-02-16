import {
  getCommentsByPost as loadCommentsByPostFromApi,
} from "../utils/api/comments"

const LOAD_COMMENTS_BY_POST = 'LOAD_COMMENTS_BY_POST'

const actionLoadCommentsByPost = (postId, comments) => {
  return {
    type: LOAD_COMMENTS_BY_POST,
    postId,
    comments,
  }
}

const loadCommentsByPost = (postId) => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return loadCommentsByPostFromApi(postId).then((comments) => {
        dispatch(actionLoadCommentsByPost(postId, comments))
        // dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in loadCommentsByPost', e)
        // dispatch(hideLoading())
      })
  }
}

export {
  LOAD_COMMENTS_BY_POST,
  loadCommentsByPost,
}
