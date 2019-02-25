import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  prop,
  reverse,
  sortBy,
} from 'ramda'
import {
  Typography,
} from '@material-ui/core'
import Comment, { commentPropType } from './Comment'

class CommentList extends PureComponent {
  render() {
    const comments = reverse(sortBy(prop('voteScore'))(this.props.comments))
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
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

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentPropType),
  )
}

export default CommentList
