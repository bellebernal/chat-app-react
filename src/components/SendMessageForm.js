import React from 'react'

class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        // console.log(e.target.value);
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.message)
    }

    render() {
        console.log(this.state.message); //within this render methos we now have access to the state
        return (
            <form 
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    //set the value of the input field--we are programatically controlling the value in the input field so that the value can only be whatever data the user has entered at any given time 
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm

//NOTES:
// form elements keep their own internal state based on user input and this element needs to keep track of
// the data the user has entered
//  we want to keep the internal state in this.state
// when we control the content in the component's state we get the single source of truth and less bugs will occur
// -->so we will grab the user input and shove it into the state of the SendMessageForm and to do that use onChange={}
//line 17 alone will throw an error:  TypeError: Cannot read property 'setState' of undefined --> root cause: 'this' keyword inside handleChange(e) method is not defined and not bound to the component's instance (via the constructor)
//-->fix:  line 11 this.handleChange = this.handleChange.bind(this); ..binding the 'this' that we do have access to (in the constructor) to the handleChange method

//LOGIC OVERVIEW:
//when the onChage event listener is triggered we invoke the handleChange method of which this method updates the state, and then react triggers a re-rendering in which the value that is passed into the input field (line 29) has been changed and thus, updated in the UI
//the logic is going through the state before before the user keystrokes appears to change in the UI