import { storeChatHistory } from "./caching.js";
import { addMessage, createCustomerMessage, showLoader } from "./ui.js";
import { scrollToLatestMessage } from "./utilities.js";
import { admin_managed, emitMessage } from "/socket.js";

export const sendMessage = () => {
    const { customerMessage, messageText} = createCustomerMessage()
    if (!customerMessage) return null
    
    if (!admin_managed) showLoader()
    emitMessage(messageText)
    addMessage(customerMessage)
    storeChatHistory();
    scrollToLatestMessage();
}
