import React from 'react'
import { connect } from 'react-redux'
class Notification extends React.Component {
  render() {

    const { notification } = this.props

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: notification.show ? 'block' : 'none'
    }
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)


export default ConnectedNotification
