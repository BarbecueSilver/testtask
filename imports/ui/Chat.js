import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Chat extends Component {
  render() {
    // Arrange
    const chat = this.props.chat;

    // Act
    return (
      <li key={chat._id}>
        <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
      </li>
    );
  }
}
