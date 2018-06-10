import { Chats } from "/imports/api/chats/collection";
import { Messages } from "/imports/api/messages/collection";
import React, { Component } from "react";
import Timestamp from "react-timestamp";
import MessageSendForm from "./components/MessageSendForm";

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
              <MessageSendForm chatId={id} />
            </div>
          </div>
        </main>
      );
    }
  }
}
