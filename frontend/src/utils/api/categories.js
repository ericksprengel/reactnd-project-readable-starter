
const BASE_URL = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Basic YmFuYW5hOmJhbmFuYQ=='
}

const getCategories = () =>
  fetch(`${BASE_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export {
  getCategories,
}
