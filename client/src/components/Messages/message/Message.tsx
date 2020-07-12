import React from 'react';

import './message.css';

import ReactEmoji from 'react-emoji';

const Message: React.FC = ({ message: { text, user, isBot }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundGreen">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className={`messageBox backgroundLight ${isBot ? 'isBot' : null}`}>
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10 ">{user}</p>
                </div>
            )
    );
}

export default Message;