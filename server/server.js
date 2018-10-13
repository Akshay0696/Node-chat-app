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
        from:'Admin',
        text:'Welcome to chat app'
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createAt: new Date().getTime()
    })

    socket.on('createMessage',(message) =>{
        console.log('createMessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
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