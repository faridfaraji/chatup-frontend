import { storeChatHistory } from "./caching"
import { addMessage, createAdminMessage } from "./ui"
import { scrollToLatestMessage } from "./utilities"

export const handleAdminMessage = (message) => {
    if(!message || message.message === "") return null
    const adminMessage = createAdminMessage(message.message)
    addMessage(adminMessage)
    storeChatHistory();
    scrollToLatestMessage();
}
