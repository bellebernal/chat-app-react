import React from 'react';
import styles from './App.css'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
//import Chatkit from '@pusher/chatkit-server';
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
//import { ErrorResponse } from '../node_modules/pusher-platform'; 

class App extends React.Component {
  //constructor method is needed to initialize a component's state
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    //to enable the sendMessage method to have access to this keyword in line 93 we must bind it here
    this.sendMessage = this.sendMessage.bind(this)
    //we now have access to this in line 60 and enable us to access the currentUser object and call the sendMessage method
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  //To hook a react component to an API:  use lifecycle method componentDidMount()
  //this method is triggered right after the render() method
  componentDidMount() {
    //  const chatManager = new Chatkit.ChatManager({
    //    instanceLocator,
    //    userId: 'cyberbelle',
    //    tokenProvider: new Chatkit.TokenProvider({
    //      url: tokenUrl
    //    })
    //  })  --> no longer in beta

    //  const chatManager = new ChatManager({
    //   instanceLocator: 'v1:us1:0cb87b87-b8f4-40ed-9ce3-08c7719bb230',
    //   userId: 'cyberbelle',
    //   tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0cb87b87-b8f4-40ed-9ce3-08c7719bb230/token' })
    // }) --> per pusher update syntax

    const chatManager = new ChatManager({
       instanceLocator,
       userId: 'cyberbelle',
       tokenProvider: new TokenProvider({
         url: tokenUrl
       })
     })

     //this returns a promise and when this promise is resolved we get access to the 
     //...current user -- and the currentUser object contains a bunch of methods for interacting with the API
     //currentUser here is our interface for interacting with the chatkit API
    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
        // this.subscribeToRoom() --this gets removed from componentDidMount because we want the user to specifically perform this method via onClick
    })
    .catch(err => alert('error on connecting: ', err))
      //cach errors logic needed for promises
  }

    /* updating to method below */
    getRooms() {
      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms 
        })
    })
    .catch(err => alert('error on joinableRooms : ', err))
  }

    /* updating to method below that allows user to choose which room to display on app launch*/
    subscribeToRoom(roomId) {
      this.setState({
        // to clear the prior history in the messages display everytime a room is clicked on
        messages: []
      })
      this.currentUser.subscribeToRoom({
        //roomId: 11213510 --> statically set the subscribed room on app launch
        roomId: roomId, //dynamically subscribe to any room
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
      // after we subscribe to a room we must also update the joinable/joined rooms states--so, after the .subscribeToRoom() method returns a promise we do this update as follows...
      .then(room => { 
        this.setState({
          roomId: room.id
        })
        this.getRooms() 
      })
      //and catch any errors if any...
      .catch(err => alert('error on subscribing to room: ', err))
    }

    sendMessage(text) {
      this.currentUser.sendMessage({
        text, // 'text: text' is the ES5 way of syntax, ES6 shortens the syntax when the key-value pair is the same
        roomId: this.state.roomId  //dyanamically set the room 
        //roomId: 11213510 --> this is a statically pre-set room that has been created and will auto-display on app load
      })
      .catch(err => alert('error on message send: ', err))
    }

    createRoom(name) {
      //console.log('roomName: ', roomName)
      this.currentUser.createRoom({
        name 
      })
      //returns a promise and after the promise resolves, we also subscribe to that new room
      //i.e. afer we create a room we auto-subscribe to it
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => console.log('error with createRoom: ', error))
    }

  render() {
    // console.log('this.state.messages: ', this.state.messages);
    return (
      <div className="app">

        {/* Boilerplate code:
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

        {/* to enable the user to click on a room and subscribe to hit we pass subscribeToRoom as a property to RoomList */}
        <RoomList 
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList 
          //on app launch prompt, no room is joined so we set the initial state
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          //disable when no room joined
          disabled={!this.state.roomId} 
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;


//CHATKIT TEST TOKEN PROVIDER:
//only for testing purposes
//what you'd rather have in production is an endpoint which you have 
//...created for exampte, using node -- and there you would authenticate 
//..the user which you can do so using the chatkit server sdk.

//STATE + PROPS:
// when using these features, you must first add a constructor to your app component
// SPREAD OPERATOR - '...' -> allows you to expand the this.state.messages array into the newly modified array so as not to use the previous version/state of that array it was origianlly defined as (line 15)
// -> this array: ...this.state.messages is expanded to be included in the new state array; essentially, taking away the use of [[this.state.messages], message] bc here we are referenceing the old state version but we want to instead create a copy it and make a new verison of it (the updated state version)
// - using message: this.state.messages.push(message) should not be used becuase this push method forcefully updates the orginial (old) array but we do not want to do that as we must keep the original state and work from that version and update it state by creating a copy of it
//PROPS - passing data received in the component to its' selector via property attributes 
//*NOTE: '.state' is private and only lives in the App component (via a component's selector); we do not use 'state' keyword in the child compnoent (e.g. MessageList); hence why 'props' is used in the MessageList component (line 24 MessageList.js)



//CHANGED METHODS:

/* on app launch, this logic auto subscribes to a room and displays the chat history */
//this.currentUser.subscribeToRoom ({
  /* room id generated from pusher chatkit engine */
  //roomId: 11213510,
  /*we need to provide a hook here: an event listener for new messages */
  /*we want to me notified of a new message in the chatroom */
  /*messageLimit: 20, this is an option attribute--the default is 20 */
  //hooks: {
    /*event-handler */
    //onNewMessage: message => {
      // console.log('message.text: ', message.text);
      /*for every new message we get from chatkit, we are describing its new state: */
      //this.setState({
        /*use spread operator to add a copy of the messages array (the this.state.messages array) and append the latest message (line 42) to the end of it via the comma , */
        //messages: [...this.state.messages, message]
      //})
    //}
  //}
//})

/* to fetch a subscribed/subscribable room */
//this.currentUser.getJoinableRooms()
//.then(joinableRooms => {
  //this.setState({
    //joinableRooms,
    //joinedRooms: this.currentUser.rooms 
    /* the instances where the user has already joined */
  //})
//})
//.catch(err => alert('error on joinableRooms : ', err))
/* getJoinableRooms() returns a promise .then after that promise we get access to the (joinableRooms) */
/* cach errors logic needed for promises */