import {
  BASE_URL,
  headers,
} from './common'

const getCommentsByPost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

const addComment = (comment) =>
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers
  })
  .then(res => res.json())
  .then(data => data)

const deleteComment = (commentId) =>
  fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  })
  .then(res => res.json())
  .then(data => data)

export {
  getCommentsByPost,
  addComment,
  deleteComment,
}
