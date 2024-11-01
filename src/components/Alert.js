import React from 'react'

const Alert = (props) => {
  if (!props.alert) {
    return null; // Return nothing if alert is null
  }
  return (
    <div>
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong> {props.alert.type}</strong> : {props.alert.msg}
    </div>
    </div>
  )
}

export default Alert
