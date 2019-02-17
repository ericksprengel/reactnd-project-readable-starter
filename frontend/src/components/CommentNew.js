import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import { addComment } from '../actions/comments'

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
    this.props.dispatch(addComment({
      id: uuid(),
      parentId: postId,
      timestamp: (new Date()).getTime(),
      body: this.state.text,
      author: author,
    }))
  }

  render() {
    return (
      <div>
        <legend>Enter your comment:</legend>
        <textarea
          value={this.state.text}
          onChange={this.handleChange} />
        <button onClick={this.handleSend}>Send</button>
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
export default connect(mapStateToProps)(CommentNew)
