const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/router');
const db = require('./config/db/connect');
const app = express();
const socket = require('socket.io');
const PORT = 5000;
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
db.connect();
router(app);
const server = app.listen(PORT, () => console.log(`App listen at port ${PORT}`));

//socket
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.msg);
        }
    });
});
