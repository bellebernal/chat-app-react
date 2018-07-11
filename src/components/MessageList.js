import React from 'react'

const DUMMY_DATA =[
    {
        senderId: 'cyberbelle',
        text: 'Yo!'
    },
    {
        senderId: 'janedroid',
        text: 'Sup'
    },
    {
        senderId: 'cyberbelle',
        text: 'lets eat'
    }
]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index) => {
                    return(
                        <div key={index} className="message">
                            <div className="message-username">{message.senderId}</div>
                            <div className="messge-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList