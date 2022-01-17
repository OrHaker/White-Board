const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: '*' } });

const messages = [];
const users = [];
io.on('connection', socket => {
	socket.emit('messages:update', { messages, users });
	socket.on('message', ({ message, user }) => {
		if (!users.includes(user)) users.push(user);
		messages.push({ message, user });
		socket.emit('messages:update', { messages, users });
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
