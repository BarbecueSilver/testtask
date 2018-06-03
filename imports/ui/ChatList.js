import { Chats } from "../api/chats";
import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class ChatList extends Component {
    render() {
        return (
            <header>
                <h1>Available Chats</h1>
                <div>
                    <ul>
                        {
                            Chats.find({}).fetch().map(chat => (
                                <li key={chat._id}>
                                    <Link to={`/chats/${chat._id}`}>{chat.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </header>
        );
    }
}