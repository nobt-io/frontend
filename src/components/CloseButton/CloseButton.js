import React from 'react'
import {IconButton} from "react-toolbox/lib/button"

export const CloseButton = (props) => (
  <IconButton icon="close" onClick={props.onClick} />
)

export default CloseButton

CloseButton.PropTypes = {
  onClick: React.PropTypes.func.isRequired
}
