import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  IconButton,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
} from '@material-ui/icons'
import {
  deleteComment,
} from '../actions/comments'

class Comment extends PureComponent {

  deleteThisComment = () => {
    this.props.dispatch(
      deleteComment(this.props.comment)
    )
  }

  render() {
    const {
      // id, TODO: delete function
      timestamp,
      body,
      author,
      voteScore,
    } = this.props.comment
    const datetime = new Date(timestamp)
    return (
      <div >
        <div style={{width: 500, display: 'flex', alignItems: 'center', backgroundColor: '#dddddd', padding: 20, margin: 10}}>
          <div style={{padding: 20}}>{voteScore}</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <p style={{margin: 5}}>{body}</p>
            <div style={{alignSelf: 'flex-end'}}>
              {`${author} - ${datetime.toLocaleDateString()} - ${datetime.toLocaleTimeString()}`}
            </div>
          </div>
          <IconButton
            onClick={this.deleteThisComment}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default connect()(Comment)
