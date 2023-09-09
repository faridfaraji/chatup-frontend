import { addMessage, createCustomerMessage, showLoader } from "./ui.js";
import { admin_managed, emitMessage } from "./socket.js";

export const sendMessage = (socket) => {
    const { customerMessage, messageText} = createCustomerMessage()
    if (!customerMessage) return null
    
    if (!admin_managed) showLoader()
    emitMessage(messageText, socket)
    addMessage(customerMessage)
}
