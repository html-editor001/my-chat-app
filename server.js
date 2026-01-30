const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname)); 

let onlineUsers = 0;

io.on('connection', (socket) => {
    onlineUsers++;
    // Tell everyone the new user count
    io.emit('user count', onlineUsers);

    socket.on('chat message', (data) => {
        io.emit('chat message', data); 
    });

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('user count', onlineUsers);
    });
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server live on port ${PORT}`);
});