import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from '../actions/categories'
import { loadPostsByCategory } from '../actions/posts'
import Category from './Category'
import PostList from './PostList'

class CategoryDetail extends Component {
  componentDidMount() {
    this.props.dispatch(loadCategories())
    this.props.dispatch(loadPostsByCategory(this.props.match.params.categoryPath))
  }

  render() {
    const { category, posts } = this.props
    if (!category) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div>
        <Category category={category} />
        <PostList posts={posts} />
      </div>
    );
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
    category: categories[categoryPath],
    posts: postsByCategory,
  }
}

export default connect(mapStateToProps)(CategoryDetail)
