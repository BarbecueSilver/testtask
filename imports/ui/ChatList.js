import { Chats, Messages } from "../api/chats";
import React, { Component } from "react";
import Chat from "./Chat.js";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { NavLink } from "react-router-dom";

export default class ChatList extends Component {
  state = {
    isOpen: false,
    chatToJoin: ""
  };

  toggleDrawer = open => () => {
    this.setState({
      isOpen: open
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div>
        <div>
          <TextField
            id="chatToJoin"
            label="Chatname"
            value={this.state.name}
            onChange={this.handleChange("chatToJoin")}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleJoinChat.bind(this)}
          >
            Join
          </Button>
        </div>
        <MenuList>
          {Chats.find({})
            .fetch()
            .map(chat => (
              <MenuItem key={chat._id}>
                <NavLink to={`/chats/${chat._id}`}>{chat.title}</NavLink>
              </MenuItem>
            ))}
        </MenuList>
      </div>
    );

    return (
      <header>
        <Button onClick={this.toggleDrawer(true)}>Open Left</Button>

        <SwipeableDrawer
          open={this.state.isOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div tabIndex={0} role="button">
            {sideList}
          </div>
        </SwipeableDrawer>
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
