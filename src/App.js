import React from 'react';
import Chatkit from '@pusher/chatkit'
//import Message from './components/Message'
import MessageList from './components/MessageList'
//import SendMessageForm from './components/SendMessageForm'
//import RoomList from './components/RoomList'
//import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
  //To hook a react component to an API:  use lifecycle method componentDidMount()
  //this method is triggered right after the render() method
  componentDidMount() {
     const chatManager = new Chatkit.ChatManager({
       instanceLocator: instanceLocator,
       userId: 'cyberbelle',
       tokenProvider: new Chatkit.TokenProvider({
         url: tokenUrl
       })
     })

     //this returns a promise and when this promise is resolved we get access to the 
     //...current user -- and the currentUser object contains a bunch of methods for interacting with the API
     //currentUser here is our interface for interacting with the chatkit API
    chatManager.connect()
      .then(currentUser => {
        debugger;
        currentUser.subscribeToRoom ({
          roomId: 11213510,
          //we need to provide a hook here: an event listener for new messages
          //we want to me notified of a new message in the chatroom
          hooks: {
            onNewMessage: message => {
              console.log('message.text: ', message.text);
            }
          }
        })
      })
    }

  render() {
    return (
      <div className="app">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <RoomList/> */}
        {/* <Message/> */}
        <MessageList/>
        {/* <SendMessageForm/> */}
        {/* <NewRoomForm/> */}
      </div>
    );
  }
}

export default App;


//CHATKIT TEST TOKEN PROVIDER:
//only for testing purposes
//what you'd rather have in production is is an endpoint which you have 
//...created for exampte, using node -- and ther you would authenticate 
//..the user which you can so using the chatkit server sdk.