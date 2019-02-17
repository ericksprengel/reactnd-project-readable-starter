import React, { PureComponent } from 'react'

class Comment extends PureComponent {
  render() {
    const {
      // id, TODO: delete function
      timestamp,
      body,
      author,
      voteScore,
    } = this.props.comment
    return (
      <div >
        <div style={{width: 500, display: 'flex', alignItems: 'center', backgroundColor: '#dddddd', padding: 20, margin: 10}}>
          <div style={{padding: 20}}>{voteScore}</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <p style={{margin: 5}}>{body}</p>
            <div style={{alignSelf: 'flex-end'}}>{`${author} - ${timestamp}`}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment
