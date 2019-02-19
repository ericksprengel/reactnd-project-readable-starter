import React, { PureComponent } from 'react'
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
        to={`/categories/${category.path}`}
        size="large"
      >
        {category.name}
      </Button>
    )
  }
}

export default Category
