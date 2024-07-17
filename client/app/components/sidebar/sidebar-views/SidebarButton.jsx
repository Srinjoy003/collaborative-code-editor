
import { useViews } from "@/app/contexts/ViewContext"
import { VIEWS } from "@/app/lib/constants/views"
import { useChat } from "@/app/contexts/ChatContext"



const ViewButton = ({ viewName, icon }) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen, } =
        useViews()
    const { isNewMessage } = useChat()
   

    const handleViewClick = (viewName) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    return (
        <button
            onClick={() => handleViewClick(viewName)}
            className={`relative flex items-center justify-center transition-all duration-300 text-white hover:text-opacity-100 ${viewName === activeView ? 'text-opacity-100': 'text-opacity-40'}`}
        >
            {icon}
            {/* Show dot for new message in chat View Button */}
            {viewName === VIEWS.CHATS && isNewMessage && (
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
            )}
        </button>
    )
}

export default ViewButton
