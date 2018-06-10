import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { Chats } from "../api/chats/collection.js";
import { Messages } from "../api/messages/collection.js";

import NoChatRoom from "./NoChatRoom";
import ChatRoom from "./ChatRoom";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import MainLayout from "./layouts/MainLayout";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <MainLayout>
            <div>
              {this.props.currentUser ? (
                <div>
                  <Switch>
                    <Route exact path="/chats" component={NoChatRoom} />
                    <Route path="/chats/:chatId" component={ChatRoom} />
                  </Switch>
                </div>
              ) : (
                ""
              )}
            </div>
          </MainLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

// TODO: move this into each file and reduce the subscriptions of each collection
export default withTracker(() => {
  Meteor.subscribe("chats.all");
  Meteor.subscribe("messages.all");

  return {
    chats: Chats.find({}).fetch(),
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);
