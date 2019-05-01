import React from 'react'
//import ReactDOM from 'react-dom';

function Message(props) {
    return (
        <div className="message">
            <div className="message-username">{props.username}</div>
            <div className="message-text">{props.text}</div>
        </div>
    )
}

export default Message


//NOTE: this component was updated from a class to a function
// (when a component doesnt have state or any lifecycle methods or any other methods, we can simplify this class by turning into a function which is best practice as functional components have more restraints to it making it less prone to bugs)
//refer to resource --> https://reactjs.org/docs/components-and-props.html

// class Message extends React.Component {
//     render() {
//         return (
//             <div className="message">
//                 <div className="message-username">{this.props.username}</div>
//                 <div className="message-text">{this.props.text}</div>
//             </div>
//         )
//     }
// }
//
// export default Message