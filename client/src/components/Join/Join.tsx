import React from 'react';
import {NavLink} from 'react-router-dom'
import './join.css'
import socket from "../../socket";

export const Join: React.FC = () => {

    const [name, setName] = React.useState<string>('');
    const [room, setRoom] = React.useState<string>('');

    React.useEffect(() => {
        socket.emit('disconnect');
    }, []);

    return (
        <div className="join-wrap">
            <div className="inner">
                <h1 className="heading">Join to secret chat</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text"
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text"
                           onChange={(event) => setRoom(event.target.value)}/>
                </div>
                <NavLink onClick={e => (!name || !room) ? e.preventDefault() : null}
                      to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </NavLink>
            </div>
        </div>
    )
}