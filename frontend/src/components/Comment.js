import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  IconButton,
  TextField,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@material-ui/icons'
import {
  deleteComment,
  updateComment,
} from '../actions/comments'

class Comment extends PureComponent {
  state = {
    editMode: false,
    bodyEdit: '',
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
    console.log(e)
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
    const datetime = new Date(timestamp)
    return (
      <div >
        <div style={{width: 500, display: 'flex', alignItems: 'center', backgroundColor: '#dddddd', padding: 20, margin: 10}}>
          <div style={{padding: 20}}>{voteScore}</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            { editMode
              ? (<TextField
                  value={this.state.bodyEdit}
                  onChange={this.handleBodyChange}
                  label="Body"
                  multiline
                  rowsMax="10"
                  fullWidth
                  variant="outlined"
                />
              )
              : (<p style={{margin: 5}}>{body}</p>)
            }
            <div style={{alignSelf: 'flex-end'}}>
              {`${author} - ${datetime.toLocaleDateString()} - ${datetime.toLocaleTimeString()}`}
            </div>
          </div>
          { editMode
            ? (
              <IconButton
                onClick={this.saveThisComment}
                aria-label="Save"
              >
                <SaveIcon />
              </IconButton>
            )
            : (
              <Fragment>
                <IconButton
                  onClick={this.deleteThisComment}
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={this.editThisComment}
                  aria-label="Edit"
                >
                  <EditIcon />
                </IconButton>
              </Fragment>
            )
          }
        </div>
      </div>
    )
  }
}

export default connect()(Comment)
