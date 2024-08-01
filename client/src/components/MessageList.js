import React, { useEffect, useState } from 'react';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/loggedmessages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Logged Messages</h1>
            <ul className="list-group mt-3">
                {messages.map(message => (
                    <MessageItem key={message._id} message={message} />
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
