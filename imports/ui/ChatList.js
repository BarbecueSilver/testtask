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
    chatNameToJoin: ""
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
    const sideList = (
      <div>
        <div>
          <TextField
            id="chatNameToJoin"
            label="Chatname"
            value={this.state.name}
            onChange={this.handleChange("chatNameToJoin")}
            onKeyPress={this.handleKeyPress}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleJoinChat}
          >
            Join
          </Button>
        </div>
        <MenuList>
          {Chats.find({ users: Meteor.userId() })
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

  handleJoinChat = () => {
    // Arrange
    const userId = Meteor.userId();
    const chatNameToJoin = this.state.chatNameToJoin;

    console.log("chatNameToJoin is " + chatNameToJoin);

    // Act
    // If given name is valid
    if (!_.isEmpty(chatNameToJoin)) {
      this.joinChat(chatNameToJoin, userId);
    }
  };

  joinChat = (chatNameToJoin, userId) => {
    // Find chat with given name
    var chatToJoin = Chats.findOne({ title: chatNameToJoin });

    // If chat exists, join
    if (chatToJoin) {
      if (!chatToJoin.users.includes(userId)) {
        Chats.update(chatId, {
          $set: { users: chatToJoin.users.push(userId) }
        });
      }
      // Otherwise, create new chat
    } else {
      Chats.insert({
        title: chatNameToJoin,
        users: [userId]
      });
    }
  };
}
