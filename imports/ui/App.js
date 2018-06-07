import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Chats } from "../api/chats/collection.js";
import { Messages } from "../api/messages/collection.js";
import ChatList from "./ChatList.js";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import NoChatRoom from "./NoChatRoom";
import ChatRoom from "./ChatRoom";

// Routing
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AccountsUIWrapper />
          {this.props.currentUser ? (
            <div>
              <ChatList />
              <Switch>
                <Route exact path="/chats" component={NoChatRoom} />
                <Route path="/chats/:chatId" component={ChatRoom} />
              </Switch>
            </div>
          ) : (
            ""
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("chats.all");
  Meteor.subscribe("messages.all");

  return {
    chats: Chats.find({}).fetch(),
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);
