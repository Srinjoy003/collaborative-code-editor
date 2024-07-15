import ChatInput from "@/app/components/sidebar/chats/ChatInput";
import ChatList from "@/app/components/sidebar/chats/ChatList";
import useResponsive from "@/app/hooks/useResponsive";
import { useState, useEffect } from "react";
import SocketEvent from "@/app/lib/constants/sockets";
import { io } from "socket.io-client";
import { v4 } from "uuid";


const ChatsView = () => {
	const { viewHeight } = useResponsive();
	const [ messages, setMessages ] = useState([]);
	const [ isNewMessage, setIsNewMessage ] = useState(false);
	const [ lastScrollHeight, setLastScrollHeight ] = useState(0);
	const [currentUser, setCurrentUser] = useState({ username: v4(), roomId: "002" });
	const [socket, setSocket] = useState(io({ autoConnect: false }));
    

    useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
			reconnection: false,
		});

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, []);



    useEffect(() => {

        socket.on(
            SocketEvent.RECEIVE_MESSAGE,
            ({ message }) => {
                setMessages((messages) => [...messages, message])
                setIsNewMessage(true)
				console.log(message)
            },
        )
        return () => {
            socket.off(SocketEvent.RECEIVE_MESSAGE)
        }
    }, [socket])

	return (
		<div
			className="flex max-h-full min-h-[400px] w-full flex-col gap-2 p-4 text-white"
			style={{ height: viewHeight }}
		>
			<h1 className="view-title">Group Chat</h1>
			<ChatList
				currentUser={currentUser}
				isNewMessage={isNewMessage}
				messages={messages}
				lastScrollHeight={lastScrollHeight}
				setIsNewMessage={setIsNewMessage}
				setLastScrollHeight={setLastScrollHeight}
			/>
		
			<ChatInput setMessages={setMessages} currentUser={currentUser} socket={socket}/>
		</div>
	);
};

export default ChatsView;
