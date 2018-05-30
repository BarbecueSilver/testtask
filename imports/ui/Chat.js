import React, { Component } from 'react';


export default class Chat extends Component {
    render() {
        return (
            <li>{this.props.chat.title}</li>
        );
    }
}