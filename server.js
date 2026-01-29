const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('A user connected via hotspot');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Sends message to everyone
    });
});

// Use the port the cloud provider gives us, or default to 8000
const PORT = process.env.PORT || 8000;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`);
});