import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("connected with ", socket.id);
	socket.broadcast.emit('sync-code', socket.id)

	socket.on("disconnect", () => {
		console.log("disconnected: ", socket.id);
	});

	socket.on("update-code", (code) => {
		console.log("Received code");
		socket.broadcast.emit("update-code", code, socket.id);
	});

	// still working
	socket.on("sync-code", (code, socketId) => {
		io.to(socketId).emit("update-code", code);
		console.log('sync code', socketId, code)

	});

	
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log(`Server Listening on port ${port}`);
});
