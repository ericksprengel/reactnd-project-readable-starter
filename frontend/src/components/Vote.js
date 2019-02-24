import React from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrorDownwardIcon,
} from '@material-ui/icons'


class Vote extends React.PureComponent {
  render() {
    const {
      score,
      onUpvote,
      onDownvote,
    } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <IconButton
          onClick={onUpvote}
          aria-label="Upvote"
        >
          <ArrowUpwardIcon />
        </IconButton>
        <Typography
          variant="h5"
        >
          {score}
        </Typography>
        <IconButton
          onClick={onDownvote}
          aria-label="Downvote"
        >
          <ArrorDownwardIcon />
        </IconButton>
      </div>
    )
  }
}

Vote.propTypes = {
  score: PropTypes.number.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
}
export default Vote