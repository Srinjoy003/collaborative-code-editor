'use client'

import ChatsView from "../components/sidebar/sidebar-views/ChatsView"
// import FilesView from "../components/sidebar/sidebar-views/FilesView"
// import RunView from "../components/sidebar/sidebar-views/RunView"
import SettingsView from "../components/sidebar/sidebar-views/SettingsView"
import UsersView from "../components/sidebar/sidebar-views/UsersView"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { createContext, useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { LuFiles } from "react-icons/lu"
import { PiChats, PiPlay, PiUsers } from "react-icons/pi"
import { VIEWS } from "../lib/constants/views"
import { MdOutlineAccountCircle } from "react-icons/md";
import RunView from "../components/sidebar/sidebar-views/RunView"

const ViewContext = createContext()

export const useViews = () => {
    const context = useContext(ViewContext)
    if (!context) {
        throw new Error("useViews must be used within a ViewContextProvider")
    }
    return context
}

export function ViewContextProvider({ children }) {
    const { isMobile } = useWindowDimensions()
    const [activeView, setActiveView] = useState(VIEWS.RUN)
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)
    const [viewComponents] = useState({
    
        [VIEWS.FILES]: <div></div>,
        [VIEWS.CLIENTS]: <UsersView />,
        [VIEWS.SETTINGS]: <SettingsView />,
        [VIEWS.CHATS]: <ChatsView />,
        [VIEWS.RUN]: <RunView />,
    })
    const [viewIcons] = useState({
        [VIEWS.FILES]: <LuFiles size={28} />,
        [VIEWS.CLIENTS]: <PiUsers size={30} />,
        [VIEWS.SETTINGS]: <IoSettingsOutline size={28} />,
        [VIEWS.CHATS]: <PiChats size={30} />,
        [VIEWS.RUN]: <PiPlay size={28} />,
        [VIEWS.ACCOUNT]: <MdOutlineAccountCircle size={30} />
    })

    return (
        <ViewContext.Provider
            value={{
                activeView,
                setActiveView,
                isSidebarOpen,
                setIsSidebarOpen,
                viewComponents,
                viewIcons,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}


