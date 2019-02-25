import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import {
  Button,
  TextField,
} from '@material-ui/core'
import { addComment as addCommentAction} from '../actions/comments'

class CommentNew extends PureComponent {
  state = {
    text: '',
  }

  handleChange = (e) => {
    console.log(e)
    e.preventDefault()
    this.setState({text: e.target.value});
  }

  handleSend = () => {
    const {
      postId,
      author,
    } = this.props
    this.props.addComment({
      id: uuid(),
      parentId: postId,
      timestamp: (new Date()).getTime(),
      body: this.state.text,
      author: author,
    })
    this.setState({
      text: '',
    })
  }

  render() {
    return (
      <div style={{flexDirection: 'row', display: 'flex', padding: 20}}>
        <TextField
          style={{width: 440}}
          value={this.state.text}
          onChange={this.handleChange}
          label="New comment"
          multiline
          rowsMax="10"
          variant="outlined"
        />
        <Button style={{left: -4}} onClick={this.handleSend} variant="contained" color="primary">
          Send
        </Button>
      </div>
    )
  }
}

CommentNew.propTypes = {
  state: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = ({ session }) => {
  return {
    author: session.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment) => dispatch(
      addCommentAction(comment)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentNew)
