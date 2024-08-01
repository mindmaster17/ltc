const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let text = '';

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send current text to new client
    socket.emit('textUpdate', text);

    // Listen for text updates
    socket.on('textUpdate', (data) => {
        text = data;
        socket.broadcast.emit('textUpdate', text);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));