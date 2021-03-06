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
    headers,
  }).then(res => res.json())
    .then(data => data)

const deletePost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())
    .then(data => data)

const updatePost = (postId, title, body) =>
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers,
  }).then(res => res.json())
    .then(data => data)

const votePost = (postId, vote) =>
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify({
      option: vote,
    }),
    headers,
  }).then(res => res.json())
    .then(data => data)

export {
  getPost,
  getPosts,
  getPostsByCategory,
  addPost,
  deletePost,
  updatePost,
  votePost,
}
