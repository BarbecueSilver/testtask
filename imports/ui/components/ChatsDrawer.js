import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

class ChatsDrawer extends Component {
  render() {
    const { chats } = this.props;

    return (
      <BrowserRouter>
        <List>
          {chats.map(chat => (
            <ListItem key={chat._id} component={Link} to={`/chats/${chat._id}`}>
              <ListItemText primary={chat.title} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </BrowserRouter>
    );
  }
}

ChatsDrawer.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string
    })
  )
};

export default ChatsDrawer;
