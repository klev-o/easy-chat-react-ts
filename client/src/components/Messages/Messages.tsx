import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './messages.css';
import Message from "./message/Message";

const Messages: React.FC = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
);

export default Messages;