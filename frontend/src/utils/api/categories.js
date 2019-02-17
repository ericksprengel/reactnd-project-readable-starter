import {
  BASE_URL,
  headers,
} from './common'

const getCategories = () =>
  fetch(`${BASE_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export {
  getCategories,
}
