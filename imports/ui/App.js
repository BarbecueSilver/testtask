import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import Chat from './Chat.js';

class App extends Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>ircChat</h1>
                </header>

                <ul>
                    {this.renderChatList()}
                </ul>

                {this.renderChatDetails()}
            </div>
        );
    }

    renderChatList() {
        return this.props.chats.map((chat) => (
            <Chat key={chat._id} chat={chat} />
        ));
    }

    renderChatDetails() {
        return (
            <div>
                <textarea name="chatHistory"
                          readOnly={true}/>
                <input name="messageDraft"
                       type="text"
                       onChange={this.updateMessageDraft}/>
                <button onClick={this.sendMessage}>
                    Send
                </button>
            </div>
        )
    }

    updateMessageDraft(event) {
        this.state={currentMessageDraft: event.target.value};
    }

    sendMessage() {
        var messageToSend = this.state.currentMessageDraft;

        Chats.insert({
            title: messageToSend,

        })

        //Chats.update(this._id, { $set: { messages: messageToSend }});

        console.log('Sending message: '+ messageToSend);
    }
}

export default withTracker(() => {
    return {
        chats: Chats.find({}).fetch(),
    };
})(App);