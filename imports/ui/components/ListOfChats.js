import React, { Component } from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Chats } from "../../api/chats/collection";

class ListOfChats extends Component {
  handleLeaveChat = title => {
    Meteor.call("chats.leave", {
      title: title
    });
  };

  render() {
    const { chats } = this.props;

    return (
      <List>
        {chats.map(chat => (
          <ListItem key={chat._id} component={Link} to={`/chats/${chat._id}`}>
            <ListItemText primary={chat.title} />
            <ListItemSecondaryAction
              onClick={() => this.handleLeaveChat(chat.title)}
            >
              <IconButton aria-label="Comments">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

ListOfChats.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string
    })
  )
};

export default withTracker(() => {
  Meteor.subscribe("chats.userHasJoined");

  return {
    chats: Chats.find({}).fetch()
  };
})(ListOfChats);
