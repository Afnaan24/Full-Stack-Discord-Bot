import React from 'react';

const MessageItem = ({ message }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{message.author}: {message.content} <small>(at {new Date(message.timestamp).toLocaleString()})</small></span>
        </li>
    );
};

export default MessageItem;
