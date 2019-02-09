import {
  getCategories as loadCategoriesFromApi,
} from "../utils/api/categories"

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

const actionLoadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories,
  }
}

const loadCategories = () => {
  return (dispatch, getState) => {
    // dispatch(showLoading())
    return loadCategoriesFromApi().then((categories) => {
        dispatch(actionLoadCategories(categories))
        // dispatch(hideLoading())
      })
      .catch((e) => {
        console.warn('Error in fetchCategories', e)
        // dispatch(hideLoading())
      })
  }
}

export {
  LOAD_CATEGORIES,
  loadCategories,
}
