'use client'

import SidebarButton from "@/app/components/sidebar/sidebar-views/SidebarButton";
// import { useAppContext } from "@/context/AppContext";
// import { useSocket } from "@/context/SocketContext";
// import { useViews } from "@/context/ViewContext";
// import useResponsive from "@/hooks/useResponsive";
// import useWindowDimensions from "@/hooks/useWindowDimensions";
// import { ACTIVITY_STATE } from "@/types/app";
// import { SocketEvent } from "@/types/socket";
// import { VIEWS } from "@/types/view";
import { IoCodeSlash } from "react-icons/io5";
import { VIEWS } from "@/app/lib/constants/views";
import cn from "classnames";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5"
import { LuFiles } from "react-icons/lu"
import { PiChats, PiPlay, PiUsers } from "react-icons/pi"
import ChatsView from "./ChatsView";


function Sidebar() {
	// const {
	//     activeView,
	//     isSidebarOpen,
	//     viewComponents,
	//     viewIcons,
	//     setIsSidebarOpen,
	// } = useViews()
	// const { minHeightReached } = useResponsive();
	// const { activityState, setActivityState } = useAppContext()
	// const { activityState, setActivityState } = useState("");
	// const { socket } = useSocket();
	// const { isMobile } = useWindowDimensions();

	const [viewIcons] = useState({
		[VIEWS.FILES]: <LuFiles size={28} />,
		[VIEWS.CLIENTS]: <PiUsers size={30} />,
		[VIEWS.SETTINGS]: <IoSettingsOutline size={28} />,
		[VIEWS.CHATS]: <PiChats size={30} />,
		[VIEWS.RUN]: <PiPlay size={28} />,
	});

	// const changeState = () => {
	// 	if (activityState === ACTIVITY_STATE.CODING) {
	// 		setActivityState(ACTIVITY_STATE.DRAWING);
	// 		socket.emit(SocketEvent.REQUEST_DRAWING);
	// 	} else {
	// 		setActivityState(ACTIVITY_STATE.CODING);
	// 	}

	// 	if (isMobile) {
	// 		setIsSidebarOpen(false);
	// 	}
	// };

	return (
		<aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
			<div
				className={cn(
					"fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-6 self-end overflow-auto border-t border-darkHover bg-dark p-3 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4",
					// {
					// 	hidden: minHeightReached,
					// }
				)}
			>
				<SidebarButton viewName={VIEWS.FILES} icon={viewIcons[VIEWS.FILES]} />
				<SidebarButton viewName={VIEWS.CHATS} icon={viewIcons[VIEWS.CHATS]} />
				<SidebarButton viewName={VIEWS.RUN} icon={viewIcons[VIEWS.RUN]} />
				<SidebarButton
					viewName={VIEWS.CLIENTS}
					icon={viewIcons[VIEWS.CLIENTS]}
				/>
				<SidebarButton
					viewName={VIEWS.SETTINGS}
					icon={viewIcons[VIEWS.SETTINGS]}
				/>

				{/* Button to change activity state coding or drawing */}
				<button className="self-end text-white">
					<IoCodeSlash size={30} />
				</button>
			</div>
			<div
				className="absolute left-0 top-0 z-20 w-full flex-grow flex-col bg-dark md:static md:w-[300px]"
				// style={isSidebarOpen ? {} : { display: "none" }}
			>
				{/* Render the active view component */}
				{/* {viewComponents[activeView]} */}
				<ChatsView />
			</div>
		</aside>
	);
}

export default Sidebar;
