'use client'

import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [isNewMessage, setIsNewMessage] = useState(false);
	const [lastScrollHeight, setLastScrollHeight] = useState(0);

	return (
		<ChatContext.Provider
			value={{
				messages,
				setMessages,
				isNewMessage,
				setIsNewMessage,
				lastScrollHeight,
				setLastScrollHeight,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => useContext(ChatContext);
