import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Chats, Messages } from '../api/chats.js';
import ChatList from './ChatList.js';
import ChatDetails from './ChatDetails.js';

import { BrowserRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// Routing
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <AccountsUIWrapper />
                    {
                        this.props.currentUser ?
                        <div>
                            <ChatList />
                            <ChatDetails />
                        </div>
                        : ''
                    }

                </div>
            </BrowserRouter>
        );
    }
}

export default withTracker(() => {
    return {
        chats       : Chats.find({}).fetch(),
        messages    : Messages.find({}).fetch(),
        currentUser : Meteor.user(),
    };
})(App);