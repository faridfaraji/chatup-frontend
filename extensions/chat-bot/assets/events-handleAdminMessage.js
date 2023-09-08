import { storeChatHistory } from "./caching.js"
import { addMessage, createAdminMessage } from "./ui.js"
import { scrollToLatestMessage } from "./utilities.js"

export const handleAdminMessage = (message) => {
    if(!message || message.message === "") return null
    const adminMessage = createAdminMessage(message.message)
    addMessage(adminMessage)
    storeChatHistory();
    scrollToLatestMessage();
}
