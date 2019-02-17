import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions/posts'
import { loadCommentsByPost } from '../actions/comments'
import Post from './Post'
import CommentList from './CommentList'
import CommentNew from './CommentNew'

class PostDetail extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadPost(this.props.match.params.postId))
    this.props.dispatch(loadCommentsByPost(this.props.match.params.postId))
  }

  render() {
    const { post, comments } = this.props
    if (!post) {
      return (
        <h3>Wait...</h3>
      )
    }

    return (
      <div>
        <Post post={post} />
        <CommentList comments={comments} />
        <CommentNew postId={post.id} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }, { match }) => {
  const post = posts[match.params.postId]

  let commentsByPost = []
  if (post && post.commentIds) {
    commentsByPost = post.commentIds.map(commentId => comments[commentId])
  }
  return {
    post,
    comments: commentsByPost,
  }
}
export default connect(mapStateToProps)(PostDetail)