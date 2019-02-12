import React, { PureComponent } from 'react'

class PostDetail extends PureComponent {
  render() {
    return (
      <div>
        <h1>TODO: PostDetail</h1>
        <h3>{this.props.postId}</h3>
      </div>
    )
  }
}

export default PostDetail