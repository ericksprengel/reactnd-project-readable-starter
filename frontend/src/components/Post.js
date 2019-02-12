import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Post extends PureComponent {
  render() {
    const { post } = this.props
    return (
      <div>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <Link to={`/posts/edit/${post.id}`}>Edit</Link>
      </div>
    )
  }
}

export default Post
