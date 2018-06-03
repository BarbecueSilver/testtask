import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import ChatRoom from './ChatRoom.js';
import NoChatRoom from './NoChatRoom.js';

export default class ChatDetails extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/chats' component={NoChatRoom}/>
                <Route path='/chats/:chatId' component={ChatRoom}/>
            </Switch>
        );
    }
}