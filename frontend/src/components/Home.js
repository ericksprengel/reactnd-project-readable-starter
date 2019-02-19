import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
} from '@material-ui/core'
import { loadCategories } from '../actions/categories'
import { loadPosts } from '../actions/posts'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostNew from './PostNew'

class Home extends Component {
  state = {
    modalNewPostOpen: false,
  }

  componentDidMount() {
    this.props.dispatch(loadCategories())
    this.props.dispatch(loadPosts())
  }

  openPostNew = () => this.setState({modalNewPostOpen: true})
  closePostNew = () => this.setState({modalNewPostOpen: false})

  render() {
    const { categories, posts } = this.props
    const { modalNewPostOpen } = this.state
    return (
      <div>
        <CategoryList categories={categories} />
        <PostList posts={posts} />
        <Button onClick={this.openPostNew} variant="contained" color="primary">
          New Post
        </Button>
        <PostNew onClose={this.closePostNew} open={modalNewPostOpen} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories: Object.values(categories),
    posts: Object.values(posts),
  }
}

export default connect(mapStateToProps)(Home)
