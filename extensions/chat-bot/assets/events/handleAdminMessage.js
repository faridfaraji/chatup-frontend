import { addMessage } from "../ui/addMessage"
import { createAdminMessage } from "../ui/createMessage"

export const handleAdminMessage = (message) => {
    if(!message || message.message === "") return null
    const adminMessage = createAdminMessage(message.message)
    addMessage(adminMessage)
    storeChatHistory();
    scrollToLatestMessage();
}