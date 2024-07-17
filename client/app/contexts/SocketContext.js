'use client'

import React, { createContext, useState, useContext } from 'react';
import { io } from 'socket.io-client';

// Create the context
const SocketContext = createContext();

// Create a provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(io({ autoConnect: false }));

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Create a custom hook to use the context
export const useSocket = () => useContext(SocketContext);
