import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'
import {
  Typography,
  Button,
} from '@material-ui/core'
import Category from './Category'

const CATEGORY_ALL_POSTS = 'CATEGORY_ALL_POSTS'

const Home = ({disabled}) => (
  <Button
    component={Link}
    to="/"
    size="large"
    disabled={disabled}
  >
    All
  </Button>
)
class CategoryList extends PureComponent {
  render() {
    const { categories, disabledCategory } = this.props
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Typography variant="h2" gutterBottom>
          Categories
        </Typography>
        <div>
          <Home
            disabled={disabledCategory === CATEGORY_ALL_POSTS}
          />
          {categories.map((category) => (
            <Category
              key={category.path}
              category={category}
              disabled={category.path === disabledCategory}
            />
          ))}
        </div>
      </div>
    )
  }
}

CategoryList.defaultProps = {
  disabledCategory: null,
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(Category.propTypes.category),
  disabledCategory: PropTypes.string,
}

export {
  CATEGORY_ALL_POSTS,
}
export default CategoryList
