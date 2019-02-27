import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Typography,
} from '@material-ui/core'
import {
  loadCategories as loadCategoriesAction,
} from '../actions/categories'
import {
  loadPost as loadPostAction,
} from '../actions/posts'
import CategoryList from './CategoryList'
import Post from './Post'
import CommentList from './CommentList'
import CommentNew from './CommentNew'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  }
}

class PostDetail extends PureComponent {
  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPost(this.props.match.params.postId)
  }

  redirectToHome = () => {
    this.props.history.replace('/')
  }

  render() {
    const {
      categories,
      post,
      comments,
      loadingBar
    } = this.props
    if (loadingBar.default > 0) {
      return (
        <h3>Wait...</h3>
      )
    }
    if (!post || post.deleted) {
      return (
        <h3>Post not found</h3>
      )
    }
    return (
      <div style={styles.container}>
        <CategoryList categories={categories} />
        <div style={styles.container}>
          <Typography variant="h4" gutterBottom>
            Post
          </Typography>
          <Post post={post} onDelete={this.redirectToHome}/>
          <CommentList comments={comments} />
          <CommentNew postId={post.id} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts, comments, loadingBar }, { match }) => {
  const post = posts[match.params.postId]

  let commentsByPost = []
  if (post && post.commentIds) {
    commentsByPost = post.commentIds.map(commentId => comments[commentId])
  }
  return {
    categories: Object.values(categories),
    post,
    comments: commentsByPost,
    loadingBar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => dispatch(loadCategoriesAction()),
    loadPost: (postId) => dispatch(loadPostAction(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))