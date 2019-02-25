import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  prop,
  reverse,
  sortBy,
} from 'ramda'
import {
  MenuItem,
  Select,
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
  state = {
    orderBy: 'voteScore',
  }

  handleOrderByChange = (e) => {
    this.setState({ orderBy: e.target.value })
  }

  render() {
    const posts = reverse(sortBy(prop(this.state.orderBy))(this.props.posts))
    const { orderBy } = this.state
    return (
      <div style={styles.container}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        <Select
          value={orderBy}
          onChange={this.handleOrderByChange}
        >
          <MenuItem value="timestamp">Date</MenuItem>
          <MenuItem value="voteScore">Vote Score</MenuItem>
          <MenuItem value="commentCount">Comments</MenuItem>
        </Select>
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
