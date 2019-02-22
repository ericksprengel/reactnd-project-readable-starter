import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrorDownwardIcon,
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
    return (
      <div >
        <div style={{width: 500, display: 'flex', backgroundColor: '#dddddd', margin: 10}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton
              onClick={this.upvote}
              aria-label="Upvote"
            >
              <ArrowUpwardIcon />
            </IconButton>
            <Typography
              variant="h5"
            >
              {voteScore}
            </Typography>
            <IconButton
              onClick={this.upvote}
              aria-label="Downvote"
            >
              <ArrorDownwardIcon />
            </IconButton>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignSelf: 'stretch', padding: 10}}>
            { editMode
              ? (
                <TextField
                  style={{margin: 5,flex: 1}}
                  value={this.state.bodyEdit}
                  onChange={this.handleBodyChange}
                  label="Body"
                  multiline
                  rows="2"
                  rowsMax="2"
                  fullWidth
                  variant="outlined"
                />
              )
              : (
              <Typography
                variant="body1"
                style={{margin: 20, flexGrow: 1}}
              >
                {body}
              </Typography>
              )
            }
            <Typography
              variant="caption"
              gutterBottom
              style={{alignSelf: 'flex-end'}}
            >
              {`${author} - ${moment(timestamp).from(moment())}`}
            </Typography>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'stretch', backgroundColor: '#ccc'}}>
            { editMode
              ? (
                <IconButton
                  onClick={this.saveThisComment}
                  aria-label="Done"
                >
                  <DoneIcon
                    fontSize="small"
                  />
                </IconButton>
              )
              : (
                <Fragment>
                  <IconButton
                    onClick={this.editThisComment}
                    aria-label="Edit"
                  >
                    <EditIcon
                      fontSize="small"
                      />
                  </IconButton>
                  <IconButton
                    onClick={this.deleteThisComment}
                    aria-label="Delete"
                  >
                    <DeleteIcon
                      fontSize="small"
                    />
                  </IconButton>
                </Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Comment)
