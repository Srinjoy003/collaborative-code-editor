import express from "express";
import http from "http";
import { Server } from "socket.io";
import SocketEvent from "./sockets.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

const generateRandomHexColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

// io.on("connection", (socket) => {
// 	console.log("connected with ", socket.id);
// 	socket.broadcast.emit('sync-code', socket.id)
// 	socket.cursorColour = generateRandomHexColor()

// 	socket.on("disconnect", () => {
// 		console.log("disconnected: ", socket.id);
// 	});

// 	socket.on("update-code", (code) => {
// 		console.log("Received code");
// 		socket.broadcast.emit("update-code", code, socket.id);
// 	});

// 	socket.on("sync-code", (code, socketId) => {
// 		io.to(socketId).emit("update-code", code);
// 		console.log('sync code', socketId, code)

// 	});

// 	socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
// 		const roomId = getRoomId(socket.id)
// 		if (!roomId) return
// 		socket.broadcast
// 			.to(roomId)
// 			.emit(SocketEvent.RECEIVE_MESSAGE, { message })
// 	})

// });

io.on(SocketEvent.CONNECTION, (socket) => {
	console.log("connected with ", socket.id);
	socket.broadcast.emit(SocketEvent.SYNC_CODE, socket.id);
	socket.cursorColour = generateRandomHexColor();

	socket.on(SocketEvent.DISCONNECT, () => {
		console.log("disconnected: ", socket.id);
	});

	socket.on(SocketEvent.UPDATE_CODE, (code) => {
		console.log("Received code");
		socket.broadcast.emit(SocketEvent.UPDATE_CODE, code, socket.id);
	});

	socket.on(SocketEvent.SYNC_CODE, (code, socketId) => {
		io.to(socketId).emit(SocketEvent.UPDATE_CODE, code);
		console.log("sync code", socketId, code);
	});

	socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
		socket.broadcast.emit(SocketEvent.RECEIVE_MESSAGE, { message });
	});
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log(`Server Listening on port ${port}`);
});
