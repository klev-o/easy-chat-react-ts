const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.get('/', (req, res) => {
    res.send("Server is up and running.");
});

io.on('connection', (socket) => {

    console.log('Socket connection!')

    socket.on('CHAT:JOIN', ({ name, room }, callback) => {
        console.log(name)
        console.log(room)
        const { error, user } = addUser({ id: socket.id, name, room });
        if(error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', { user: '<bot>', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: '<bot>', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('CHAT:SEND_MESSAGE', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnect')
    })
});

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Server has started.');
});