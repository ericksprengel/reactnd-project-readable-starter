import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
} from '@material-ui/core'
import {
  loadCategories as loadCategoriesAction,
} from '../actions/categories'
import {
  loadPosts as loadPostsAction,
  loadPostsByCategory as loadPostsByCategoryAction,
} from '../actions/posts'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostNew from './PostNew'

class CategoryDetail extends Component {
  state = {
    modalNewPostOpen: false,
  }

  componentDidMount() {
    this.props.loadCategories()
    this.loadPosts()
  }

  componentDidUpdate(prevProps) {
    const { categoryPath } = this.props.match.params
    if (categoryPath !== prevProps.match.params.categoryPath) {
      this.loadPosts()
    }
  }

  loadPosts = () => {
    const { categoryPath } = this.props.match.params
    if (categoryPath) {
      this.props.loadPostsByCategory(this.props.match.params.categoryPath)
    } else {
      this.props.loadPosts()
    }
  }

  openPostNew = () => this.setState({modalNewPostOpen: true})
  closePostNew = () => this.setState({modalNewPostOpen: false})

  render() {
    const { categoryPath } = this.props.match.params
    const { categories, posts } = this.props
    const { modalNewPostOpen } = this.state
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CategoryList categories={categories} disabledCategory={categoryPath} />
        <PostList posts={posts} />
        <Button onClick={this.openPostNew} variant="contained" color="primary">
          New Post
        </Button>
        <PostNew onClose={this.closePostNew} open={modalNewPostOpen} category={categoryPath || null} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, { match }) => {
  const categoryPath = match.params.categoryPath

  let category = null
  let postsArray = []
  if (categoryPath) {
    category = categories[categoryPath]
    if (category && category.postIds) {
      postsArray = category.postIds.map(id => posts[id])
    }
  } else {
    postsArray = Object.values(posts)
  }
  return {
    categories: Object.values(categories),
    posts: postsArray,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => dispatch(loadCategoriesAction()),
    loadPostsByCategory: (categoryPath) => dispatch(loadPostsByCategoryAction(categoryPath)),
    loadPosts: () => dispatch(loadPostsAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)
