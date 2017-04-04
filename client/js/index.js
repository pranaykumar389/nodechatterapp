var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Chinni',
        text: 'Hi Chinni'
    });

});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function (newMessage) {
    console.log('New Message', newMessage);
});