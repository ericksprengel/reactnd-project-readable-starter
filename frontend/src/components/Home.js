import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from '../actions/categories'
import { loadPosts } from '../actions/posts'
import CategoryList from './CategoryList'
import PostList from './PostList'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(loadCategories())
    this.props.dispatch(loadPosts())
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <CategoryList categories={categories} />
        <PostList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps)(Home)
