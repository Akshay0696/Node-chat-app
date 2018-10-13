const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..' , '/public');

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'bogo@example.com',
        text:'Hey! this is new message',
        createAt: 23
    })

    socket.on('createMessage',(newMessage) =>{
        console.log('createMessage', newMessage);
    })
    socket.on('disconnect', () =>{
        console.log('User was disconnected');
    });
});

server.listen(port, ()=>{
    console.log(`server is up on ${port}`);
});