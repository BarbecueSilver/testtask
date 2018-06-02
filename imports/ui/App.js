import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import Chat from './Chat.js';

import { BrowserRouter } from 'react-router-dom'
import { Link, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';


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
                            <textarea name="chatHistory"
                                      value={chat.messages}
                                      readOnly={true}/>
                            <input name="messageDraft"
                                   type="text"
                                   ref="messageDraft"
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

    sendMessage() {
        // Arrange
        const messageToSend = ReactDOM.findDOMNode(this.refs.messageDraft).value.trim();
        let id = this.getChatId();

        // Act
        Chats.update(id, { $set: { messages: messageToSend }});
        ReactDOM.findDOMNode(this.refs.messageDraft).value = '';
    }
}

export default withTracker(() => {
    return {
        chats: Chats.find({}).fetch(),
    };
})(App);