import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import MainLayout from "./layouts/MainLayout";
import NoChatRoom from "./NoChatRoom";
import ChatRoom from "./ChatRoom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <MainLayout>
            <div>
              {this.props.currentUser ? (
                <div>
                  <Switch>
                    <Route exact path="/chats" component={NoChatRoom} />
                    <Route path="/chats/:chatId" component={ChatRoom} />
                  </Switch>
                </div>
              ) : (
                <div>
                  <Typography>Please login.</Typography>
                </div>
              )}
            </div>
          </MainLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
