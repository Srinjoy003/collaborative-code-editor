"use client";

import Sidebar from "@/app/components/sidebar/Sidebar";
import SplitterComponent from "@/app/components/Ui/SplitterComponent";
import Editor from "@/app/components/Project/Editor";
import { useEffect } from "react";
import { useSocket } from "@/app/contexts/SocketContext";
import { io } from "socket.io-client";


function Home() {
	const { setSocket } = useSocket();

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
			reconnection: false,
		});

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, []);
	
	return (
		<div className="w-screen h-screen">
			<SplitterComponent>
				<Sidebar />
				<Editor />
			</SplitterComponent>
		</div>
	);
}

export default Home;
