import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from '../actions/categories'
import { loadPostsByCategory } from '../actions/posts'
import CategoryList from './CategoryList'
import PostList from './PostList'

class CategoryDetail extends Component {
  componentDidMount() {
    this.props.dispatch(loadCategories())
    this.props.dispatch(loadPostsByCategory(this.props.match.params.categoryPath))
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.categoryPath !== prevProps.match.params.categoryPath) {
      this.props.dispatch(loadCategories())
      this.props.dispatch(loadPostsByCategory(this.props.match.params.categoryPath))
    }
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <CategoryList categories={categories} />
        <PostList posts={posts} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, { match }) => {
  const categoryPath = match.params.categoryPath
  const category = categories[categoryPath]

  let postsByCategory = []
  if (category && category.postIds) {
    postsByCategory = category.postIds.map(id => posts[id])
  }
  return {
    categories: Object.values(categories),
    posts: postsByCategory,
  }
}

export default connect(mapStateToProps)(CategoryDetail)
