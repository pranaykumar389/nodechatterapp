var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('userConnect', function (userConnect) {
    console.log('New User', userConnect);
});

socket.on('newMessage', function (newMessage) {
    console.log('New Message', newMessage);
});