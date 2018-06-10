import { Chats } from "/imports/api/chats/collection";
import { Messages } from "/imports/api/messages/collection";
import React, { Component } from "react";
import Timestamp from "react-timestamp";
import MessageSendForm from "./components/MessageSendForm";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class ChatRoom extends Component {
  render() {
    // Arrange
    const id = this.props.match.params.chatId;
    const { messages, chat } = this.props;
    /*const chat = Chats.findOne({
      _id: id
    });*/

    // Act
    if (!chat) {
      return (
        <Typography component="h3">No valid Chatroom selected.</Typography>
      );
    } else {
      return (
        <main>
          <div>
            <Grid
              container
              spacing={8}
              alignItems="stretch"
              direction="column"
              justify="flex-start"
            >
              {messages.map(message => (
                <Grid item key={message._id} xs={12}>
                  <Paper>
                    <Grid container wrap="nowrap" spacing={16}>
                      <Grid item>
                        <Typography>{message.username}</Typography>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography noWrap>{message.content}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <Timestamp time={message.createdAt} autoUpdate />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
          <AppBar position="h" color="default">
            <Toolbar>
              <MessageSendForm chatId={id} />
            </Toolbar>
          </AppBar>
        </main>
      );
    }
  }
}

export default withTracker(props => {
  Meteor.subscribe("messages.list", props.match.params.chatId);
  Meteor.subscribe("chats.chatById", props.match.params.chatId);

  return {
    chat: Chats.find({}).fetch(),
    messages: Messages.find({}).fetch()
  };
})(ChatRoom);
