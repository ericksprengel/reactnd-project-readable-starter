import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Category extends PureComponent {
  render() {
    const { category } = this.props
    return (
      <Link to={`/categories/${category.path}`} >
        <h3>{category.name}</h3>
      </Link>
    )
  }
}

export default Category
