'use client'

import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userDropdown, setUserDropdown] = useState('');

	return (
		<UserContext.Provider
			value={{
				userDropdown,
				setUserDropdown
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
