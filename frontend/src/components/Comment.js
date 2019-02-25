import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  TextField,
  Typography,
} from '@material-ui/core'
import {
  deleteComment,
  updateComment,
  voteComment,
  PARAM_UPVOTE,
  PARAM_DOWNVOTE,
} from '../actions/comments'
import ActionsBar from './ActionsBar'
import AuthorAndDate from './AuthorAndDate'
import Vote from './Vote'

class Comment extends PureComponent {
  state = {
    editMode: false,
    bodyEdit: '',
  }

  voteThisComment = (vote) => {
    this.props.dispatch(
      voteComment(this.props.comment.id, vote)
    )
  }

  deleteThisComment = () => {
    this.props.dispatch(
      deleteComment(this.props.comment)
    )
  }

  editThisComment = () => {
    this.setState({
      editMode: true,
      bodyEdit: this.props.comment.body,
    })
  }

  saveThisComment = () => {
    const {
      id,
    } = this.props.comment
    const {
      bodyEdit,
    } = this.state
    this.setState({
      editMode: false,
    })
    this.props.dispatch(
      updateComment(id, bodyEdit)
    )
  }

  handleBodyChange = (e) => {
    e.preventDefault()
    this.setState({bodyEdit: e.target.value});
  }

  render() {
    const {
      timestamp,
      body,
      author,
      voteScore,
    } = this.props.comment
    const {
      editMode,
    } = this.state
    return (
      <div style={{width: 500, display: 'flex', backgroundColor: '#dddddd', margin: 10}}>
        <Vote
          score={voteScore}
          onUpvote={() => this.voteThisComment(PARAM_UPVOTE)}
          onDownvote={() => this.voteThisComment(PARAM_DOWNVOTE)}
        />
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignSelf: 'stretch', padding: 10}}>
          { editMode
            ? (
              <TextField
                value={this.state.bodyEdit}
                onChange={this.handleBodyChange}
                autoFocus
                label="Body"
                multiline
                fullWidth
                variant="outlined"
                margin="normal"
              />
            )
            : (
            <Typography
              variant="body1"
              style={{margin: 29, flexGrow: 1, whiteSpace: 'pre-line'}}
            >
              {body}
            </Typography>
            )
          }
          <AuthorAndDate
            author={author}
            timestamp={timestamp}
          />
        </div>
        <ActionsBar
          editMode={editMode}
          onDoneAction={this.saveThisComment}
          onEditAction={this.editThisComment}
          onDeleteAction={this.deleteThisComment}
        />
      </div>
    )
  }
}

const commentPropType = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
}
Comment.propTypes = {
  comment: PropTypes.shape(commentPropType).isRequired,
}

export {
  commentPropType
}
export default connect()(Comment)
