import React, { PureComponent } from 'react'

class Post extends PureComponent {
  render() {
    const { post } = this.props
    return (
      <h3>{post.title}</h3>
    )
  }
}

export default Post
