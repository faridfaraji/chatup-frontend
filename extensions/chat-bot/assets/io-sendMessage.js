import { storeChatHistory } from "./caching";
import { addMessage, createCustomerMessage, showLoader } from "./ui";
import { scrollToLatestMessage } from "./utilities";
import { admin_managed, emitMessage } from "/socket";

export const sendMessage = () => {
    const { customerMessage, messageText} = createCustomerMessage()
    if (!customerMessage) return null
    
    if (!admin_managed) showLoader()
    emitMessage(messageText)
    addMessage(customerMessage)
    storeChatHistory();
    scrollToLatestMessage();
}
