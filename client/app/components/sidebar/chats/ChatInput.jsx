// import { useAppContext } from "@/context/AppContext"
// import { useChatRoom } from "@/context/ChatContext"
// import { useSocket } from "@/context/SocketContext"
// import { ChatMessage } from "@/types/chat"
// import { SocketEvent } from "@/types/socket"
import { formatDate } from "@/app/lib/utils/formateDate"
import { FormEvent, useRef } from "react"
import { LuSendHorizonal } from "react-icons/lu"
import { v4 as uuidV4 } from "uuid"
import SocketEvent from "@/app/lib/constants/sockets"
import { useChat } from "@/app/contexts/ChatContext"


function ChatInput({currentUser, socket}) {
    // const { currentUser } = useAppContext()
    // const { socket } = useSocket()
    const { setMessages } = useChat()
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current?.value.trim()

        if (inputVal && inputVal.length > 0) {
            const message = {
                id: uuidV4(),
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            }
            socket.emit(SocketEvent.SEND_MESSAGE, { message })
            setMessages((messages) => [...messages, message])

            if (inputRef.current) inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between rounded-md border border-[#2263fe]"
        >
            <input
                type="text"
                className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none text-white"
                placeholder="Enter a message..."
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center rounded-r-md  bg-[#2263fe] p-2 text-white"
                type="submit"
            >
                <LuSendHorizonal size={24} />
            </button>
        </form>
    )
}

export default ChatInput
