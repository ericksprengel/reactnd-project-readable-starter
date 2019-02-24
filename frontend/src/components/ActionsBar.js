import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Done as DoneIcon,
} from '@material-ui/icons'

class ActionsBar extends PureComponent {
  render() {
    const {
      editMode,
      onDoneAction,
      onEditAction,
      onDeleteAction,
    } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'stretch', backgroundColor: '#ccc'}}>
        { editMode
          ? (
            <IconButton
              onClick={onDoneAction}
              aria-label="Done"
            >
              <DoneIcon
                fontSize="small"
              />
            </IconButton>
          )
          : (
            <Fragment>
              <IconButton
                onClick={onEditAction}
                aria-label="Edit"
              >
                <EditIcon
                  fontSize="small"
                  />
              </IconButton>
              <IconButton
                onClick={onDeleteAction}
                aria-label="Delete"
              >
                <DeleteIcon
                  fontSize="small"
                />
              </IconButton>
            </Fragment>
          )
        }
      </div>
    )
  }
}

ActionsBar.propTypes = {
  editMode: PropTypes.bool.isRequired,
  onDoneAction: PropTypes.func.isRequired,
  onEditAction: PropTypes.func.isRequired,
  onDeleteAction: PropTypes.func.isRequired,
}

export default ActionsBar
