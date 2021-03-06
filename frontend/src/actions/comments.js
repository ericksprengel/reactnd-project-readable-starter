import { showLoading, hideLoading } from 'react-redux-loading'
import {
  getCommentsByPost as loadCommentsByPostFromApi,
  addComment as addCommentFromApi,
  deleteComment as deleteCommentFromApi,
  updateComment as updateCommentFromApi,
  voteComment as voteCommentFromApi,
} from "../utils/api/comments"

const LOAD_COMMENTS_BY_POST = 'LOAD_COMMENTS_BY_POST'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'

const PARAM_UPVOTE = 'upVote'
const PARAM_DOWNVOTE = 'downVote'

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
    console.warn('parece ruim')
    return deleteCommentFromApi(comment.id).then((commentFromApi) => {
      dispatch(actionDeleteComment(commentFromApi))
    })
    .catch((e) => {
      console.warn('Error in deleteComment', e)
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

const voteComment = (commentId, vote) => {
  return (dispatch) => {
    return voteCommentFromApi(commentId, vote).then((commentFromApi) => {
      dispatch(actionUpdateComment(commentFromApi))
    })
    .catch((e) => {
      console.warn('Error in voteComment', e)
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
  voteComment, PARAM_UPVOTE, PARAM_DOWNVOTE,
}
