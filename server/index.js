const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.send("Server is up and running.");
});

io.on('connection', (socket) => {

    console.log('Socket connection!')

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