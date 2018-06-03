import { Chats, Messages } from "../api/chats";
import React, { Component } from "react";
import Chat from "./Chat.js";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";

export default class ChatList extends Component {
  render() {
    return (
      <header>
        <h1>Available Chats</h1>
        <div>
          <input
            name="chatName"
            type="text"
            ref="chatName"
            onKeyPress={this.handleKeyPress.bind(this)}
            placeholder="Chat name ..."
          />
          <button onClick={this.handleJoinChat.bind(this)}>Join</button>
        </div>
        <div>
          <ul>
            {Chats.find({})
              .fetch()
              .map(chat => <Chat key={chat._id} chat={chat} />)}
          </ul>
        </div>
      </header>
    );
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleJoinChat();
    }
  }

  handleJoinChat() {
    // Arrange
    const userId = Meteor.userId();
    const chatNameToJoin = ReactDOM.findDOMNode(
      this.refs.chatName
    ).value.trim();

    // Check if given name is valid
    if (!_.isEmpty(chatRoomNameToJoin)) {
      // Find chat with given name
      let chatToJoin = Chats.findOne({ title: chatNameToJoin }).fetch();

      // If chat exists, join
      if (chatToJoin) {
        chatToJoin.users;

        Chats.update(chatId, {
          $set: { users: !this.checked }
        });
        // Otherwise, create new chat
      } else {
      }

      // If empty -> create chat
      // Otherwise -> join chat
      const chatId = this.getChatId();
    }

    Chats.update(chatId, {
      $set: { checked: !this.checked }
    });

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
