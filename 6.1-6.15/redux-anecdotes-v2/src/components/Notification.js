import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: this.props.store.getState().notification.show ? 'block' : 'none'
    }
    return (
      <div style={style}>
        {this.props.store.getState().notification.text}
      </div>
    )
  }
}

export default Notification
