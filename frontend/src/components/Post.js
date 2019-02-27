import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  TextField,
  Typography,
  ButtonBase,
} from '@material-ui/core'
import {
  deletePost as deletePostAction,
  updatePost as updatePostAction,
  votePost as votePostAction,
  PARAM_UPVOTE,
  PARAM_DOWNVOTE,
} from '../actions/posts'
import ActionsBar from './ActionsBar'
import AuthorAndDate from './AuthorAndDate'
import Vote from './Vote'


// TINY COMPONENTS

const LinkWithRipple = ({to, children}) => (
  <ButtonBase
    focusRipple
    component={Link}
    to={to}
  >
    {children}
  </ButtonBase>
)

const Title = ({title}) => (
  <Typography
    variant="h5"
    gutterBottom
    style={{margin: 29, flexGrow: 1, whiteSpace: 'pre-line'}}
  >
    {title}
  </Typography>
)
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
    this.props.votePost(this.props.post.id, vote)
  }

  deleteThisPost = () => {
    this.props.deletePost(this.props.post)
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
    this.props.updatePost(id, titleEdit, bodyEdit)
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
                { showDetails
                  ? (
                    <LinkWithRipple to={`/${category}/${id}`}>
                      <Title title={title} />
                    </LinkWithRipple>
                  )
                  : (
                    <Title title={title} />
                  )
                }
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
  votePost: PropTypes.func.isRequired,
  showDetails: PropTypes.bool,
  onDelete: PropTypes.func,
  post: PropTypes.shape(postPropType).isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    votePost: (postId, vote) => dispatch(
      votePostAction(postId, vote)
    ),
    deletePost: (post) => dispatch(
      deletePostAction(post)
    ),
    updatePost: (postId, title, body) => dispatch(
      updatePostAction(postId, title, body)
    )
  }
}

export {
  postPropType,
}
export default connect(null, mapDispatchToProps)(Post)
