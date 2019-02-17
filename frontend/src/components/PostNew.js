import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import { addPost } from '../actions/posts'

class PostNew extends PureComponent {
  state = {
    title: '',
    body: '',
  }

  handleTitleChange = (e) => {
    e.preventDefault()
    this.setState({title: e.target.value});
  }

  handleBodyChange = (e) => {
    e.preventDefault()
    this.setState({body: e.target.value});
  }

  handleCreate = () => {
    const {
      category,
      author,
      onCreated,
    } = this.props
    this.props.dispatch(addPost({
      id: uuid(),
      timestamp: (new Date()).getTime(),
      title: this.state.title,
      body: this.state.body,
      author: author,
      category,
    }))
    onCreated()
  }

  render() {
    return (
      <div>
        <legend>Enter your post:</legend>
        <input
          value={this.state.text}
          onChange={this.handleTitleChange}
        />
        <textarea
          value={this.state.text}
          onChange={this.handleBodyChange}
        />
        <button onClick={this.handleCreate}>Create</button>
      </div>
    )
  }
}

PostNew.propTypes = {
  state: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  category: PropTypes.string.isRequired,
  onCreated: PropTypes.func.isRequired,
}

const mapStateToProps = ({ session }) => {
  return {
    author: session.username,
  }
}
export default connect(mapStateToProps)(PostNew)
