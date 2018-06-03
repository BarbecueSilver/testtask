import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Chats, Messages } from "../api/chats";
import React, { Component } from "react";
import Timestamp from "react-timestamp"; // Moment JS?

// https://material-ui.com/

export default class ChatRoom extends Component {
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
                {Messages.find({
                  chatId: id
                })
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
                onKeyPress={this.handleKeyPress.bind(this)}
                placeholder="Type your message here ..."
              />
              <button onClick={this.sendMessage.bind(this)}>Send</button>
            </div>
          </div>
        </main>
      );
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    // Arrange
    const chatId = this.getChatId();
    const message = ReactDOM.findDOMNode(this.refs.messageDraft).value.trim();
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

      ReactDOM.findDOMNode(this.refs.messageDraft).value = "";
    }
  }
}
