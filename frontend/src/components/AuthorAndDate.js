import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Typography,
} from '@material-ui/core'

class AuthorAndDate extends PureComponent {
  render() {
    const {
      author,
      timestamp,
    } = this.props
    return (
      <Typography
        variant="caption"
        gutterBottom
        style={{alignSelf: 'flex-end'}}
      >
        {`${author} - ${moment(timestamp).from(moment())}`}
      </Typography>
    )
  }
}

AuthorAndDate.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
}

export default AuthorAndDate