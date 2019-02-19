import React, { PureComponent } from 'react'
import Category from './Category';

class CategoryList extends PureComponent {
  render() {
    const { categories, disabledCategory } = this.props
    return (
      <div>
        <h2>Categories</h2>
        <div>
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

export default CategoryList
