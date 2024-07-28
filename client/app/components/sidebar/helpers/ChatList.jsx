// import { useAppContext } from "@/context/AppContext"
// import { useChatRoom } from "@/context/ChatContext"
import { useChat } from "@/app/contexts/ChatContext";
import { useEffect, useRef } from "react";

function ChatList({ currentUser }) {
	const {
		messages,
		isNewMessage,
		setIsNewMessage,
		lastScrollHeight,
		setLastScrollHeight,
	} = useChat();
	// const { currentUser } = useAppContext()
	const messagesContainerRef = useRef(null);

	const handleScroll = (e) => {
		const container = e.target;
		setLastScrollHeight(container.scrollTop);
	};

	// Scroll to bottom when messages change
	useEffect(() => {
		if (!messagesContainerRef.current) return;
		messagesContainerRef.current.scrollTop =
			messagesContainerRef.current.scrollHeight;
	}, [messages]);

	useEffect(() => {
		if (isNewMessage) {
			setIsNewMessage(false);
		}
		if (messagesContainerRef.current)
			messagesContainerRef.current.scrollTop = lastScrollHeight;
	}, [isNewMessage, setIsNewMessage, lastScrollHeight]);

	return (
		<div
			className="flex-grow overflow-auto rounded-md bg-[#252331] p-2"
			ref={messagesContainerRef}
			onScroll={handleScroll}
		>
			{/* Chat messages */}
			{messages.map((message, index) => {
				return (
					<div
						key={index}
						className={
							"mb-2 w-[80%] self-end break-words rounded-md px-3 py-2" +
							(message.username === currentUser.username
								? " ml-auto bg-[#2263fe]"
								: " bg-[#343144]")
						}
					>
						<div className="flex justify-between">
							<span
								className={
									"text-xs" +
									(message.username === currentUser.username
										? " text-[#47F744]"
										: " text-blue-500")
								}
							>
								{message.username}
							</span>
							<span
								className={
									"text-xs" +
									(message.username === currentUser.username
										? " text-[#47F744]"
										: " text-blue-500")
								}
							>
								{message.timestamp}
							</span>
						</div>
						<p className="py-1">{message.message}</p>
					</div>
				);
			})}
		</div>
	);
}

export default ChatList;
