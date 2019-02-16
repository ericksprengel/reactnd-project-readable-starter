import React, { PureComponent } from 'react'
import Comment from './Comment'

class CommentList extends PureComponent {
  render() {
    const { comments } = this.props
    return (
      <div>
        <h2>Comments</h2>
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        { comments.length === 0 && <h4>No comments...</h4> }
      </div>
    )
  }
}

export default CommentList
