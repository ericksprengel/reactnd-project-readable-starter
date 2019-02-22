import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  IconButton,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import {
  deletePost,
} from '../actions/posts'

class Post extends PureComponent {

  deleteThisPost = () => {
    this.props.dispatch(
      deletePost(this.props.post)
    )
    this.props.onDelete()
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
      timestamp,
      voteScore,
      commentCount,
    } = post
    const datetime = new Date(timestamp)
    return (
      <div >
        <div style={{width: 500, display: 'flex', alignItems: 'center', backgroundColor: '#dddddd', padding: 20, margin: 10}}>
          <div style={{padding: 20}}>{voteScore}</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>{title}</h3>
            <p style={{margin: 5}}>{body}</p>
            <div style={{alignSelf: 'flex-end'}}>
              {`${author} - ${datetime.toLocaleDateString()} - ${datetime.toLocaleTimeString()}`}
              <Link to={`/posts/edit/${id}`}>Edit</Link>
            </div>
            <div>{commentCount} Comment(s)</div>
            {showDetails && <Link to={`/posts/${id}`}>More details</Link>}
          </div>
          <IconButton
            onClick={this.deleteThisPost}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={this.editThisPost}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

Post.defaultProps = {
  showDetails: false,
  onDelete: () => {},
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showDetails: PropTypes.bool,
  onDelete: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }).isRequired,
}

export default connect()(Post)
