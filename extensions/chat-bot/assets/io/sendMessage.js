import { addHumanMessage } from "../ui/addMessage";
import { createCustomerMessage } from "../ui/createMessage";
import { showLoader } from "../ui/toggleLoader";
import { emitMessage } from "./socket/emitMessage";
import { admin_managed } from "./socket/listenForMessages";

export const sendMessage = () => {
    const { customerMessage, messageText} = createCustomerMessage()
    if (!customerMessage) return null
    
    if (!admin_managed) showLoader()
    emitMessage(messageText)
    addHumanMessage(customerMessage)
    storeChatHistory();
    scrollToLatestMessage();
}
