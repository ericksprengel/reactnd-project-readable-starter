
const BASE_URL = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Basic YmFuYW5hOmJhbmFuYQ=='
}

const getPost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

const getPosts = () =>
  fetch(`${BASE_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

const getPostsByCategory = (categoryPath) =>
  fetch(`${BASE_URL}/${categoryPath}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export {
  getPost,
  getPosts,
  getPostsByCategory,
}
