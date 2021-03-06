const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage} =require('./utils/message');
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '..' , '/public');

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message, callback) =>{
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from,message.text));

        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    });
    
    socket.on('disconnect', () =>{
        console.log('User was disconnected');
    });
});

server.listen(port, ()=>{
    console.log(`server is up on ${port}`);
});