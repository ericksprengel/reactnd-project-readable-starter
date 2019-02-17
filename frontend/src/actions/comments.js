import {
  getCommentsByPost as loadCommentsByPostFromApi,
  addComment as addCommentFromApi,
} from "../utils/api/comments"

const LOAD_COMMENTS_BY_POST = 'LOAD_COMMENTS_BY_POST'
const ADD_COMMENT = 'ADD_COMMENT'

const actionLoadCommentsByPost = (postId, comments) => ({
  type: LOAD_COMMENTS_BY_POST,
  postId,
  comments,
})

const actionAddComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
})

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

const addComment = (comment) => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return addCommentFromApi(comment).then((commentFromApi) => {
        dispatch(actionAddComment(commentFromApi))
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
  ADD_COMMENT,
  loadCommentsByPost,
  addComment,
}
