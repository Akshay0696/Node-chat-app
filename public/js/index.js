var socket = io();

socket.on('connect', function(){
    console.log('Connected to the server');

    socket.emit('createMessage',{
        from:'bogo@example.com',
        text:'yup, that worked for me'
    })
});


socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
})