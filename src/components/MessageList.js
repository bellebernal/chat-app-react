import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

// const DUMMY_DATA =[
//     {`
//         senderId: 'cyberbelle',
//         text: 'Yo!'
//     },
//     {
//         senderId: 'janedroid',
//         text: 'Sup'
//     },
//     {
//         senderId: 'cyberbelle',
//         text: 'lets eat!'
//     }
// ]

//This version of MessageList component includes the <Message/> component
class MessageList extends React.Component {

    componentWillUpdate() {
        //to disable auto-scroll when user is looking back through history of messages (scrolling up)
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        // to have auto-scroll enabled work while user is near bottom of message list but not quite at the bottom
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }

        //to add auto-scroll to bottom when user sends new message which appends to bottom of message view
        // const node = ReactDOM.findDOMNode(this)
        // node.scrollTop = node.scrollHeight
    }

    render() {
        //on app launch prompt user to join a room and disable messager !joinedRoom
        if(!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join A Room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                 {this.props.messages.map((message, index) => {
                    return(
                        <Message key={index} username={message.senderId} text={message.text} />
                        //this is where we import our sub-compoenent, Message.js
                    )
                })}
            </div>
        )
    }
}

export default MessageList

//NOTES:
//This version of the MessageList component does not include the Message component
// class MessageList extends React.Component {
//     render() {
//         return (
//             <div className="message-list">
//                 //to use dummmy data use:  DUMMY_DATA.map((message, index)),
//                 //...instead of using the chatkit message data below:
//                  {this.props.messages.map((message, index) => {
//                     return(
//                         //note: this div can be better composed using a separate component (see Message.js):
//                         <div key={index} className="message">
//                             <div className="message-username">{message.senderId}</div>
//                             <div className="message-text">{message.text}</div>
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }
// }
//
//export default MessageList