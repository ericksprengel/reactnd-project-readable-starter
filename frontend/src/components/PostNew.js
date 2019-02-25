import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { addPost as addPostAction } from '../actions/posts'

class PostNew extends PureComponent {
  state = {
    title: '',
    body: '',
    category: null,
  }

  getSelectedCategory = () => {
    if (this.state.category !== null) {
      return this.state.category
    }

    if (this.props.categories.length === 0) {
      return ''
    }

    return this.props.categories[0].path
  }

  handleTitleChange = (e) => {
    e.preventDefault()
    this.setState({title: e.target.value});
  }

  handleBodyChange = (e) => {
    e.preventDefault()
    this.setState({body: e.target.value});
  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleCreate = () => {
    const {
      category,
      author,
      onClose,
    } = this.props
    this.props.addPost({
      id: uuid(),
      timestamp: (new Date()).getTime(),
      title: this.state.title,
      body: this.state.body,
      author: author,
      category: category === null ? this.getSelectedCategory() : category,
    })

    this.setState({
      title: '',
      body: '',
      category: null,
    })
    onClose()
  }

  render() {
    const { category, categories, open, onClose } = this.props
    const selectedCategory = this.getSelectedCategory()
    return (
      <Dialog
        aria-labelledby="form-dialog-title"
        open={open}
        onClose={onClose}
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          { category === null && (
            <Select
              value={selectedCategory}
              onChange={this.handleCategoryChange}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              { categories.map(cat => (
                <MenuItem key={cat.path} value={cat.path}>{cat.name}</MenuItem>
              )) }
            </Select>
          )}
          <TextField
            value={this.state.title}
            onChange={this.handleTitleChange}
            autoFocus
            label="Title"
            fullWidth
          />
          <TextField
            value={this.state.body}
            onChange={this.handleBodyChange}
            label="Content"
            multiline
            rowsMax="10"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PostNew.defaultProps = {
  category: null,
}

PostNew.propTypes = {
  state: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  category: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = ({ session, categories }) => {
  return {
    author: session.username,
    categories: Object.values(categories),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: (post) => dispatch(addPostAction(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNew)
