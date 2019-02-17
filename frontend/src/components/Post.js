import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Post extends PureComponent {
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
        </div>
      </div>
    )
  }
}

export default Post
