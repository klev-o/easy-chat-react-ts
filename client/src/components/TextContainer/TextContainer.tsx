import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './textContainer.css';

const TextContainer = ({ users }) => (
    <div style={{maxHeight: '70px', overflowY: 'scroll', background: '#e8e8e8'}}>
        {
            users
                ? (
                    <div>
                        <b>People currently chatting:</b>
                            {users.map(({name}) => (
                                <div key={name} className="activeItem">
                                    {name}
                                    <img alt="Online Icon" src={onlineIcon}/>
                                </div>
                            ))}
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;