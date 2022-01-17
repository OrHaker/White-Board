import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { API_URL } from 'utility/utilFunctions';

import './style.scss';

let socket;

export default function Chat(props) {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState([]);
	const [user, setUser] = useState({ userName: 'Or Haker', userId: -1 });

	useEffect(() => {
		socket = socketIOClient(API_URL);
		socket.emit('connection', user);
		socket.on('messages:update', msgs => setMessages(msgs.messages));
		return () => socket.disconnect();
	}, []);

	const _sendMessages = () => {
		if (!socket) return;
		socket.emit('message', { message, user });
		setMessage('');
	};

	return (
		<div className="Chat">
			<div className="messages">
				{messages.map((msg, idx) => (
					<div className={`message ${msg.user.userId === user.userId ? 'sent' : 'receive'}`} key={idx}>
						{msg.message}
					</div>
				))}
			</div>
			<div className="input_wrapper">
				<input type="text" onChange={({ target }) => setMessage(target.value)} value={message} />
				<button onClick={_sendMessages}>SEND</button>
			</div>
		</div>
	);
}
