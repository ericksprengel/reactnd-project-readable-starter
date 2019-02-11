import React, { PureComponent } from 'react'
import Post from './Post'

class PostList extends PureComponent {
  render() {
    const { posts } = this.props
    return (
      <div>
        <h2>Posts</h2>
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    )
  }
}

export default PostList
