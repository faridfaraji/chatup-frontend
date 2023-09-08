import { addHumanMessage } from "../ui/addMessage"
import { createAdminMessage } from "../ui/createMessage"

export const handleAdminMessage = (message) => {
    if(!message || message.message === "") return null
    const adminMessage = createAdminMessage(message.message)
    addHumanMessage(adminMessage)
    storeChatHistory();
    scrollToLatestMessage();
}