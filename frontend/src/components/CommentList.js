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
      </div>
    )
  }
}

export default CommentList
