import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Post extends PureComponent {
  render() {
    const {
      id,
      title,
      body,
      author,
      timestamp,
      voteScore,
      commentCount,
    } = this.props.post
    return (
      <div >
        <div style={{width: 500, display: 'flex', alignItems: 'center', backgroundColor: '#dddddd', padding: 20, margin: 10}}>
          <div style={{padding: 20}}>{voteScore}</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>{title}</h3>
            <p style={{margin: 5}}>{body}</p>
            <div style={{alignSelf: 'flex-end'}}>{`${author} - ${timestamp}`} <Link to={`/posts/edit/${id}`}>Edit</Link></div>
            <div>{commentCount} Comment(s)</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
