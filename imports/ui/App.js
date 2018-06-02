import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats, Messages } from '../api/chats.js';
import Chat from './Chat.js';

import { BrowserRouter } from 'react-router-dom'
import { Link, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp';

// Routing
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <header>
                <h1>Available Chats</h1>
                <div>
                    <ul>
                        {
                            Chats.find({}).fetch().map(chat => (
                                <li key={chat._id}>
                                    <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </header>
        );
    }
}

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/chats' component={NoChatRoom}/>
                <Route path='/chats/:chatId' component={ChatRoom}/>
            </Switch>
        );
    }
}

// Components
class NoChatRoom extends Component {
    render() {
        return <div>Please select a chat.</div>
    }
}

class ChatRoom extends Component {
    getChatId()
    {
        return this.props.match.params.chatId;
    }

    render() {
        // Arrange
        let id = this.getChatId();
        const chat = Chats.findOne({
            _id: id
        });

        // Act
        if (!chat) {
            return <div>Sorry, but the chat room was not found</div>
        }
        else {
            return (
                <main>
                    <div>
                        <h1>{chat.title}</h1>
                        <div>
                            <ul>
                                {
                                    Messages.find({
                                        chatId : id
                                    }).fetch().map(message => (
                                        <li key={message._id}>
                                            <Timestamp time={message.createdAt} autoUpdate/>
                                             &nbsp;|&nbsp;
                                            {message.content}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <input name="messageDraft"
                                   type="text"
                                   ref="messageDraft"
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   placeholder="Type your message here ..."/>
                            <button onClick={this.sendMessage.bind(this)}>
                                Send
                            </button>
                        </div>
                    </div>
                </main>
            )
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        // Arrange
        const message = ReactDOM.findDOMNode(this.refs.messageDraft).value.trim();
        let chatId = this.getChatId();
        const timestamp = new Date();

        // Act
        if (!_.isEmpty(message))
        {
            Messages.insert({
                content   : message,
                chatId    : chatId,
                createdAt : timestamp
            });

            ReactDOM.findDOMNode(this.refs.messageDraft).value = '';
        }
    }
}

export default withTracker(() => {
    return {
        chats: Chats.find({}).fetch(),
        messages: Messages.find({}).fetch(),
    };
})(App);