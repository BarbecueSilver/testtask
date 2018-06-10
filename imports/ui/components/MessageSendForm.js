import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import TextFieldButtonForm from "./TextFieldButtonForm";

class MessageSendForm extends Component {
  handleMessageSend = messageDraft => {
    check(messageDraft, String);

    // Arrange
    const { chatId } = this.props;

    // Act
    // If draft has at least one character
    if (!_.isEmpty(messageDraft)) {
      Meteor.call("messages.send", {
        chatId: chatId,
        draft: messageDraft
      });
    }
  };

  render() {
    return (
      <TextFieldButtonForm
        inputLabel="Message"
        buttonLabel="Send"
        action={this.handleMessageSend}
      />
    );
  }
}

export default MessageSendForm;
