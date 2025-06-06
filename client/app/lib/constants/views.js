export const VIEWS = {
	FILES: "FILES",
	CHATS: "CHATS",
	CLIENTS: "CLIENTS",
	RUN: "RUN",
	SETTINGS: "SETTINGS",
	CODE: "CODE",
	ACCOUNT: "ACCOUNT"
};

export const USER_CONNECTION_STATUS = {
	OFFLINE: "offline",
	ONLINE: "online",
};

export const dummyRemoteUsers = [
	{
		id: "user1",
		name: "User One",
		email: "user1@example.com",
		status: USER_CONNECTION_STATUS.ONLINE,
		cursorPosition: 23,
		typing: true,
		currentFile: "file1.txt",
		socketId: "socket1",
		roomId: "room1",
		username: "user1name",
	},
	{
		id: "user2",
		name: "User Two",
		email: "user2@example.com",
		status: USER_CONNECTION_STATUS.OFFLINE,
		cursorPosition: 45,
		typing: false,
		currentFile: "file2.txt",
		socketId: "socket2",
		roomId: "room2",
		username: "user2name",
	},
	{
		id: "user3",
		name: "User Three",
		email: "user3@example.com",
		status: USER_CONNECTION_STATUS.ONLINE,
		cursorPosition: 67,
		typing: true,
		currentFile: "file3.txt",
		socketId: "socket3",
		roomId: "room3",
		username: "user3name",
	},
	{
		id: "user4",
		name: "User Four",
		email: "user4@example.com",
		status: USER_CONNECTION_STATUS.OFFLINE,
		cursorPosition: 89,
		typing: false,
		currentFile: "file4.txt",
		socketId: "socket4",
		roomId: "room4",
		username: "user4name",
	},
	{
		id: "user5",
		name: "User Five",
		email: "user5@example.com",
		status: USER_CONNECTION_STATUS.ONLINE,
		cursorPosition: 10,
		typing: true,
		currentFile: "file5.txt",
		socketId: "socket5",
		roomId: "room5",
		username: "user5name",
	},
];
