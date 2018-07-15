import React from 'react'
import Message from './Message'

// const DUMMY_DATA =[
//     {
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
    render() {
        return (
            <div className="message-list">
                 {this.props.messages.map((message, index) => {
                    return(
                        <Message key={index} username={message.senderId} text={message.text} />
                    )
                })}
            </div>
        )
    }
}

//This version of the MessageList component does not include the Message component
// class MessageList extends React.Component {
//     render() {
//         return (
//             <div className="message-list">
//                 //to use dummmy data use:  DUMMY_DATA.map((message, index)),
//                   in stead of using the chatkit message data below: */}
//                  {this.props.messages.map((message, index) => {
//                     return(
//                         //note: his div can be created using a separate component (see Message.js):
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

export default MessageList