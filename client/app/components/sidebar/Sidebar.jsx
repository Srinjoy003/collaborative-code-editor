"use client";

import SidebarButton from "@/app/components/sidebar/sidebar-views/SidebarButton";
import { useViews } from "@/app/contexts/ViewContext";
import { IoCodeSlash } from "react-icons/io5";
import { VIEWS } from "@/app/lib/constants/views";
import cn from "classnames";
import { useState, useEffect } from "react";
import useWindowDimensions from "@/app/hooks/useWindowDimensions";
import { useSocket } from "@/app/contexts/SocketContext";
import { io } from "socket.io-client";
import SocketEvent from "@/app/lib/constants/sockets";
import useResponsive from "@/app/hooks/useResponsive";
import { useChat } from "@/app/contexts/ChatContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";

function Sidebar() {
	const {
		activeView,
		setActiveView,
		isSidebarOpen,
		viewComponents,
		viewIcons,
		setIsSidebarOpen,
	} = useViews();

	const { minHeightReached } = useResponsive();
	const { socket, setSocket } = useSocket();
	const { isMobile } = useWindowDimensions();
	const { setIsNewMessage, setMessages } = useChat();

	const changeState = () => {
		setActiveView(VIEWS.CODE);
		if (isMobile) {
			setIsSidebarOpen(false);
		}
	};

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
		socket.on(SocketEvent.RECEIVE_MESSAGE, ({ message }) => {
			setMessages((messages) => [...messages, message]);
			setIsNewMessage(true);
			console.log(message);
		});
		return () => {
			socket.off(SocketEvent.RECEIVE_MESSAGE);
		};
	}, [socket]);

	return (
		<aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
			<div
				className={cn(
					"fixed bottom-0 left-0 z-50 flex justify-between h-[50px] w-full gap-6 self-end overflow-auto border-t border-darkHover bg-dark p-3 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4",
					{
						hidden: minHeightReached,
					}
				)}
			>
				<div className="flex md:flex-col gap-6">
					{/* <SidebarButton viewName={VIEWS.FILES} icon={viewIcons[VIEWS.FILES]} /> */}
					<SidebarButton viewName={VIEWS.RUN} icon={viewIcons[VIEWS.RUN]} />
					<SidebarButton viewName={VIEWS.CHATS} icon={viewIcons[VIEWS.CHATS]} />
					<SidebarButton
						viewName={VIEWS.CLIENTS}
						icon={viewIcons[VIEWS.CLIENTS]}
					/>
					<SidebarButton
						viewName={VIEWS.SETTINGS}
						icon={viewIcons[VIEWS.SETTINGS]}
					/>

					<button
						className={`self-end text-blue-300 ${
							isMobile ? "" : "hidden"
						} transition-all duration-300 hover:text-opacity-100 ${
							activeView === VIEWS.CODE ? "text-opacity-100" : "text-opacity-40"
						}`}
						onClick={changeState}
					>
						<IoCodeSlash size={30} />
					</button>
				</div>

				<Link
					href="/account"
					className={`self-end transition-all duration-300 text-blue-300 hover:text-opacity-100 ${
						activeView === VIEWS.CODE ? "text-opacity-100" : "text-opacity-40"
					}`}
					onClick={changeState}
					title="Account"
				>
					<MdOutlineAccountCircle size={30} />
				</Link>
			</div>
			<div
				className="absolute left-0 top-0 z-20 w-full flex-grow flex-col bg-dark md:static md:w-[300px]"
				style={isSidebarOpen ? {} : { display: "none" }}
			>
				{/* Render the active view component */}
				{viewComponents[activeView]}
			</div>
		</aside>
	);
}

export default Sidebar;
