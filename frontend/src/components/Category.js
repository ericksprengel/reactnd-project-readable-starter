import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Button,
} from '@material-ui/core'

class Category extends PureComponent {
  render() {
    const { category, disabled } = this.props
    return (
      <Button
        disabled={disabled}
        component={Link}
        to={`/${category.path}`}
        size="large"
      >
        {category.name}
      </Button>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default Category
