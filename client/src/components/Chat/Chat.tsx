import React from 'react';
import queryString from 'query-string';
import socket from "../../socket";
import './chat.css'
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";



export const Chat: React.FC = () => {

    const [name, setName] = React.useState<string>('');
    const [room, setRoom] = React.useState<string>('');
    const [users, setUsers] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState<object[]>([]);


    React.useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        setName(name);
        setRoom(room);

        socket.emit('CHAT:JOIN', { name, room }, (error) => {
            if(error) {
                alert(error);
                //window.location.href = '/'
            }
        });


    }, [window.location.search]);

    React.useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('CHAT:SEND_MESSAGE', message, () => setMessage(''));
        }
    }

    console.log(message)
    console.log(messages )

    return (
        <div className="chat-wrap">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <TextContainer users={users}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>

        </div>
    )
}