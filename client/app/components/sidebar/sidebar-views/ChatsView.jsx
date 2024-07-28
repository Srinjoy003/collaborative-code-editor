import ChatInput from "@/app/components/sidebar/helpers/ChatInput";
import ChatList from "@/app/components/sidebar/helpers/ChatList";
import useResponsive from "@/app/hooks/useResponsive";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useChat } from "@/app/contexts/ChatContext";
import { useSocket } from "@/app/contexts/SocketContext";


const ChatsView = () => {
	const { viewHeight } = useResponsive();
	const [currentUser, setCurrentUser] = useState({ username: v4(), roomId: "002" });
	// const [socket, setSocket] = useState(io({ autoConnect: false }));
	const {socket} = useSocket()



	return (
		<div
			className="flex max-h-full min-h-[400px] w-full flex-col gap-2 p-4 text-white"
			style={{ height: viewHeight }}
		>
			<h1 className="view-title">Group Chat</h1>
			<ChatList
				currentUser={currentUser}
			/>
		
			<ChatInput currentUser={currentUser} socket={socket}/>
		</div>
	);
};

export default ChatsView;
