import React, { PureComponent } from 'react'

class Category extends PureComponent {
  render() {
    const { category } = this.props
    return (
      <h3>{category.name}</h3>
    )
  }
}

export default Category
