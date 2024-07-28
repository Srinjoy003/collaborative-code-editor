// import Users from "@/components/common/Users"
// import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/app/contexts/SocketContext";
import useResponsive from "@/app/hooks/useResponsive";
// import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast";
import { GoSignOut } from "react-icons/go";
import { IoShareOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Users from "../helpers/Users";

function UsersView() {
	const { viewHeight } = useResponsive();
	// const { setStatus } = useAppContext()
	const { socket } = useSocket();
	const router = useRouter();

	const copyURL = async () => {
		const url = window.location.href;
		try {
			await navigator.clipboard.writeText(url);
			toast.success("URL copied to clipboard");
		} catch (error) {
			toast.error("Unable to copy URL to clipboard");
			console.log(error);
		}
	};

	const shareURL = async () => {
		const url = window.location.href;
		try {
			await navigator.share({ url });
		} catch (error) {
			// toast.error("Unable to share URL")
			console.log(error);
		}
	};

	const leaveRoom = () => {
		socket.disconnect();
		// setStatus(USER_STATUS.DISCONNECTED)
		// navigate("/", {
		//     replace: true,
		// })
		router.push("/");
	};

	return (
		<div
			className="flex flex-col p-4 text-white"
			style={{ height: viewHeight }}
		>
			<h1 className="view-title">Users</h1>
			{/* List of connected users */}
			<div className="h-full flex flex-col justify-between">
				<Users />
				<div className="flex flex-col items-center gap-4 pt-4">
					<div className="flex w-full gap-4">
						{/* Share URL button */}
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-white p-3 text-black"
							onClick={shareURL}
							title="Share Link"
						>
							<IoShareOutline size={26} />
						</button>
						{/* Copy URL button */}
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-white p-3 text-black"
							onClick={copyURL}
							title="Copy Link"
						>
							<LuCopy size={22} />
						</button>
						{/* Leave room button */}
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-[#2263fe] p-3 text-white"
							onClick={leaveRoom}
							title="Leave room"
						>
							<GoSignOut size={22} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UsersView;
