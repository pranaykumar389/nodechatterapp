const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    //socket.emit from: Admin, text: Welcome to the nodechatter app
    socket.emit('userConnect', {
        from: 'Admin',
        text: 'Welcome to the nodechatter app',
        createdAt: new Date().getTime()
    });
    //socket.broadcast.emit from: Admin, text: New User Joined
    socket.broadcast.emit('userConnect', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
});