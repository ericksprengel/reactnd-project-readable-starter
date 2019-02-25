import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
} from '@material-ui/core'
import Post, { postPropType } from './Post'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  }
}

class PostList extends PureComponent {
  render() {
    const { posts } = this.props
    return (
      <div style={styles.container}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} showDetails />
          ))}
        </div>
        { posts.length === 0 && <h4>No posts...</h4> }
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape(postPropType)
  ),
}

export default PostList
