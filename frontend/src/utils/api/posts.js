
const BASE_URL = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Basic YmFuYW5hOmJhbmFuYQ=='
}

const getPosts = () =>
  fetch(`${BASE_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)

export {
  getPosts,
}
