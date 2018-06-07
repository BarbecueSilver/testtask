import { Meteor } from "meteor/meteor";
import { Chats } from "/imports/api/chats/collection";
import { Messages } from "/imports/api/messages/collection";
import React, { Component } from "react";
import Timestamp from "react-timestamp";

export default class ChatRoom extends Component {
  state = {
    messageDraft: ""
  };

  getChatId() {
    return this.props.match.params.chatId;
  }

  render() {
    // Arrange
    const id = this.getChatId();
    const chat = Chats.findOne({
      _id: id
    });

    // Act
    if (!chat) {
      return <div>Sorry, but the chat room was not found!</div>;
    } else {
      return (
        <main>
          <div>
            <h1>{chat.title}</h1>
            <div>
              <ul>
                {Messages.find({ chatId: id })
                  .fetch()
                  .map(message => (
                    <li key={message._id}>
                      <Timestamp time={message.createdAt} autoUpdate />
                      &nbsp;|&nbsp;
                      <b>{message.username}</b>
                      :&nbsp;
                      {message.content}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <input
                name="messageDraft"
                type="text"
                ref="messageDraft"
                value={this.state.messageDraft}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange("messageDraft")}
                placeholder="Type your message here ..."
              />
              <button onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        </main>
      );
    }
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendMessage = () => {
    // Arrange
    const chatId = this.getChatId();
    const message = this.state.messageDraft;
    const timestamp = new Date();

    // Act
    if (!_.isEmpty(message)) {
      Messages.insert({
        content: message,
        chatId: chatId,
        createdAt: timestamp,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

      this.clearMessageDraft();
    }
  };

  clearMessageDraft = () => {
    this.setState({ messageDraft: "" });
  };
}
