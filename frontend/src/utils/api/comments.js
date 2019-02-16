
const BASE_URL = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Basic YmFuYW5hOmJhbmFuYQ=='
}

const getCommentsByPost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export {
  getCommentsByPost,
}
