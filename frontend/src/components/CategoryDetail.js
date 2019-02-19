import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
} from '@material-ui/core'
import { loadCategories } from '../actions/categories'
import { loadPostsByCategory } from '../actions/posts'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostNew from './PostNew'

class CategoryDetail extends Component {
  state = {
    modalNewPostOpen: false,
  }

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

  openPostNew = () => this.setState({modalNewPostOpen: true})
  closePostNew = () => this.setState({modalNewPostOpen: false})

  render() {
    const { categoryPath } = this.props.match.params
    const { categories, posts } = this.props
    const { modalNewPostOpen } = this.state
    return (
      <div>
        <CategoryList categories={categories} disabledCategory={categoryPath} />
        <PostList posts={posts} />
        <Button onClick={this.openPostNew} variant="contained" color="primary">
          New Post
        </Button>
        <PostNew onClose={this.closePostNew} open={modalNewPostOpen} category={categoryPath} />
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
