import React from 'react';
import queryString from 'query-string';
import io from "socket.io-client";
import './chat.css'
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

let socket;

export const Chat: React.FC = () => {

    const [name, setName] = React.useState<string>('');
    const [room, setRoom] = React.useState<string>('');
    const [users, setUsers] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState<object[]>([]);
    const ENDPOINT: string = 'localhost:9999'

    React.useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('CHAT:JOIN', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });


    }, [ENDPOINT, window.location.search]);

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
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}