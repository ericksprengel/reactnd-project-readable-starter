import {
  BASE_URL,
  headers,
} from './common'

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

const addPost = (post) =>
    fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers
    }).then(res => res.json())
      .then(data => data)

export {
  getPost,
  getPosts,
  getPostsByCategory,
  addPost,
}
