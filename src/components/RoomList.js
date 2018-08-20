import React from 'react'

class RoomList extends React.Component {
    render() {
        return (
            <div className="rooms-list">
                <ul>
                <h3>Chat Rooms:</h3>
                    {this.props.rooms.map(room => {
                        return(
                            <li key={room.id} className="room">
                                {/* another part to pass subscribeToRoom method in this component to enable to user to click and subscribe */}
                                <a 
                                    onClick={ () => this.props.subscribeToRoom(room.id) } 
                                    href="#"> 
                                    # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList