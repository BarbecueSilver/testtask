import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import TextFieldButtonForm from "./TextFieldButtonForm";

class ChatJoinForm extends Component {
  handleJoinChat = chatNameToJoin => {
    check(chatNameToJoin, String);

    // Act
    // If given name is valid
    if (chatNameToJoin.length !== 0) {
      Meteor.call("chats.join", {
        title: chatNameToJoin
      });
    }
  };

  render() {
    return (
      <TextFieldButtonForm
        inputLabel="Chatname"
        buttonLabel="Join"
        action={this.handleJoinChat}
      />
    );
  }
}

export default ChatJoinForm;
