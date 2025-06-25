"use client";

import Sidebar from "@/app/components/sidebar/Sidebar";
import SplitterComponent from "@/app/components/Ui/SplitterComponent";
import Editor from "@/app/components/Project/Editor";
import { useEffect } from "react";
import { useSocket } from "@/app/contexts/SocketContext";
import { io } from "socket.io-client";
import { Suspense } from "react";

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
			<Suspense fallback={<div>Loading editor...</div>}>
				<SplitterComponent>
					<Sidebar />
					<Editor />
				</SplitterComponent>
			</Suspense>
		</div>
	);
}

export default Home;


