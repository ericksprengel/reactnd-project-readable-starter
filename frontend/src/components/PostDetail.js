import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadPost as loadPostAction } from '../actions/posts'
import Post from './Post'
import CommentList from './CommentList'
import CommentNew from './CommentNew'

class PostDetail extends PureComponent {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.postId)
  }

  redirectToHome = () => {
    this.props.history.replace('/')
  }

  render() {
    const { post, comments, loadingBar } = this.props
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Post post={post} onDelete={this.redirectToHome}/>
        <CommentList comments={comments} />
        <CommentNew postId={post.id} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments, loadingBar }, { match }) => {
  const post = posts[match.params.postId]

  let commentsByPost = []
  if (post && post.commentIds) {
    commentsByPost = post.commentIds.map(commentId => comments[commentId])
  }
  return {
    post,
    comments: commentsByPost,
    loadingBar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPost: (postId) => dispatch(loadPostAction(postId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))