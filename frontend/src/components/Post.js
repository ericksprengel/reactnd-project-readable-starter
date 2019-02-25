import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  TextField,
  Typography,
} from '@material-ui/core'
import {
  deletePost,
  updatePost,
  votePost,
  PARAM_UPVOTE,
  PARAM_DOWNVOTE,
} from '../actions/posts'
import ActionsBar from './ActionsBar'
import AuthorAndDate from './AuthorAndDate'
import Vote from './Vote'


// TINY COMPONENTS

const CommentsCounter = ({value}) => (
  <Typography
    variant="caption"
    gutterBottom
    style={{alignSelf: 'flex-end'}}
  >
    {value} comment(s)
  </Typography>
)


// POST COMPONENT

class Post extends PureComponent {
  state = {
    editMode: false,
    titleEdit: '',
    bodyEdit: '',
  }

  voteThisPost = (vote) => {
    this.props.dispatch(
      votePost(this.props.post.id, vote)
    )
  }

  deleteThisPost = () => {
    this.props.dispatch(
      deletePost(this.props.post)
    )
    this.props.onDelete()
  }

  editThisPost = () => {
    this.setState({
      editMode: true,
      titleEdit: this.props.post.title,
      bodyEdit: this.props.post.body,
    })
  }

  saveThisPost = () => {
    const {
      id,
    } = this.props.post
    const {
      titleEdit,
      bodyEdit,
    } = this.state
    this.setState({
      editMode: false,
    })
    this.props.dispatch(
      updatePost(id, titleEdit, bodyEdit)
    )
  }

  handleTitleChange = (e) => {
    e.preventDefault()
    this.setState({titleEdit: e.target.value});
  }

  handleBodyChange = (e) => {
    e.preventDefault()
    this.setState({bodyEdit: e.target.value});
  }

  render() {
    const {
      showDetails,
      post,
    } = this.props
    const {
      id,
      title,
      body,
      author,
      category,
      timestamp,
      voteScore,
      commentCount,
    } = post
    const {
      editMode,
    } = this.state
    return (
      <div style={{width: 600, display: 'flex', backgroundColor: '#dddddd', margin: 10}}>
        <Vote
          score={voteScore}
          onUpvote={() => this.voteThisPost(PARAM_UPVOTE)}
          onDownvote={() => this.voteThisPost(PARAM_DOWNVOTE)}
        />
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignSelf: 'stretch', padding: 10}}>
          { editMode
            ? (
              <div>
                <TextField
                  value={this.state.titleEdit}
                  onChange={this.handleTitleChange}
                  autoFocus
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  value={this.state.bodyEdit}
                  onChange={this.handleBodyChange}
                  label="Body"
                  multiline
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </div>
            )
            : (
              <div>
                <h3
                  style={{margin: 29, flexGrow: 1, whiteSpace: 'pre-line'}}
                >
                  {title}
                </h3>
                <Typography
                  variant="body1"
                  style={{margin: 45, flexGrow: 1, whiteSpace: 'pre-line'}}
                >
                  {body}
                </Typography>
              </div>
            )
          }
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            { showDetails
              ? (
                <Link to={`/${category}/${id}`}>
                  <CommentsCounter value={commentCount} />
                </Link>
              )
              : (
                <CommentsCounter value={commentCount} />
              )
            }
            <AuthorAndDate
              author={author}
              timestamp={timestamp}
            />
          </div>
        </div>
        <ActionsBar
          editMode={editMode}
          onDoneAction={this.saveThisPost}
          onEditAction={this.editThisPost}
          onDeleteAction={this.deleteThisPost}
        />
      </div>
    )
  }
}

Post.defaultProps = {
  showDetails: false,
  onDelete: () => {},
}

const postPropType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showDetails: PropTypes.bool,
  onDelete: PropTypes.func,
  post: PropTypes.shape(postPropType).isRequired,
}

export {
  postPropType,
}
export default connect()(Post)
