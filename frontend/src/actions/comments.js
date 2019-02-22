import { showLoading, hideLoading } from 'react-redux-loading'
import {
  getCommentsByPost as loadCommentsByPostFromApi,
  addComment as addCommentFromApi,
  deleteComment as deleteCommentFromApi,
  updateComment as updateCommentFromApi,
} from "../utils/api/comments"

const LOAD_COMMENTS_BY_POST = 'LOAD_COMMENTS_BY_POST'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'

const actionLoadCommentsByPost = (postId, comments) => ({
  type: LOAD_COMMENTS_BY_POST,
  postId,
  comments,
})

const actionAddComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
})

const actionDeleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
})

const actionUpdateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
})

const loadCommentsByPost = (postId) => {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return loadCommentsByPostFromApi(postId).then((comments) => {
        dispatch(actionLoadCommentsByPost(postId, comments))
        dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in loadCommentsByPost', e)
        dispatch(hideLoading())
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
        console.warn('Error in addComment', e)
        // dispatch(hideLoading())
      })
  }
}

const deleteComment = (comment) => {
  return (dispatch) => {
    // dispatch(showLoading())
    console.warn('parece ruim')
    return deleteCommentFromApi(comment.id).then((commentFromApi) => {
      dispatch(actionDeleteComment(commentFromApi))
      // dispatch(hideLoading())
    })
    .catch((e) => {
      console.warn('Error in deleteComment', e)
      // dispatch(hideLoading())
    })
  }
}

const updateComment = (commentId, body) => {
  return (dispatch) => {
    return updateCommentFromApi(commentId, body).then((commentFromApi) => {
      dispatch(actionUpdateComment(commentFromApi))
    })
    .catch((e) => {
      console.warn('Error in updateComment', e)
    })
  }
}

export {
  LOAD_COMMENTS_BY_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  loadCommentsByPost,
  addComment,
  deleteComment,
  updateComment,
}
