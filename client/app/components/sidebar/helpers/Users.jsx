// import { useAppContext } from "@/context/AppContext"
"use client";

import {
	USER_CONNECTION_STATUS,
	dummyRemoteUsers,
} from "@/app/lib/constants/views";
import Avatar from "react-avatar";
import { DropDown } from "../../Ui/Dropdown";
import { useState, useEffect } from "react";

function Users() {
	const users = dummyRemoteUsers;

	return (
		<div className="flex min-h-[200px] justify-center py-2">
			<div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
				{users.map((user) => {
					return <User key={user.socketId} user={user} />;
				})}
			</div>
		</div>
	);
}

const User = ({ user }) => {
	const { username, status, id } = user;
	const title = `${username} - ${
		status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"
	}`;
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const closeMenu = () => {
			setMenuOpen(false);
		};

		document.addEventListener("click", closeMenu);

		return () => {
			document.removeEventListener("click", closeMenu);
		};
	}, []);

	const handleOpenDropDown = (e) => {
		e.preventDefault();
		setMenuOpen(true);
	};

	const handle1 = (e) => {
		setMenuOpen(false);
	};

    const closeAllDropDowns = () => {
        const dropdowns = document.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
        });
    };

	return (
		<div
			className="relative flex w-[100px] flex-col items-center gap-2"
			title={title}
			onContextMenu={handleOpenDropDown}
		>
			<Avatar name={username} size="50" round={"12px"} title={title} />
			<p className="line-clamp-2 max-w-full text-ellipsis break-words text-sm">
				{username}
			</p>
			<div
				className={`absolute right-5 top-0 h-3 w-3 rounded-full ${
					status === USER_CONNECTION_STATUS.ONLINE
						? "bg-green-500"
						: "bg-danger"
				}`}
			></div>

			{menuOpen && (
				<DropDown
					id={id}
					handleDeleteFile={handle1}
					handleRenameFile={handle1}
                    
				/>
			)}
		</div>
	);
};

export default Users;
