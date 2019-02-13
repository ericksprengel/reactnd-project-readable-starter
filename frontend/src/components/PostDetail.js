import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions/posts'
import Post from './Post';

class PostDetail extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadPost(this.props.match.params.postId))
  }

  render() {
    console.log('postId:', this.props.match.params.postId)
    console.log('post:', this.props.post)
    const { post } = this.props
    if (!post) {
      return (
        <h3>Wait...</h3>
      )
    }

    return (
      <div>
        <Post post={post} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts }, { match }) => {
  const post = posts[match.params.postId]

  return {
    post,
  }
}
export default connect(mapStateToProps)(PostDetail)