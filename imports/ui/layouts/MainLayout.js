import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountsUIWrapper from "../AccountsUIWrapper.js";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withStyles } from "@material-ui/core/styles";
import { Chats } from "../../api/chats/collection";
import { Meteor } from "meteor/meteor";

import ChatJoinForm from "../components/ChatJoinForm";
import ListOfChats from "../components/ListOfChats";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MainLayout extends Component {
  state = {
    isDrawerOpen: false
  };

  toggleDrawer = open => () => {
    this.setState({
      isDrawerOpen: open
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {Meteor.userId() ? (
              <div>
                <SwipeableDrawer
                  open={this.state.isDrawerOpen}
                  onClose={this.toggleDrawer(false)}
                  onOpen={this.toggleDrawer(true)}
                >
                  <ChatJoinForm />
                  <ListOfChats chats={Chats.find({ users: Meteor.userId() })} />
                </SwipeableDrawer>

                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              ""
            )}

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Chat
            </Typography>
            <AccountsUIWrapper />
          </Toolbar>
        </AppBar>

        {this.props.children}
      </div>
    );
  }
}

// export default MainLayout;
export default withStyles(styles)(MainLayout);
