import { addMessage, createCustomerMessage, showLoader } from "./ui.js";
import { admin_managed, emitMessage } from "./socket.js";
import { autoResizeTextarea } from "./utilities.js";
import { id_selector } from "./constants.js";

export const sendMessage = (socket) => {
    const { customerMessage, messageText } = createCustomerMessage()
    if (!customerMessage) return null

    if (!admin_managed) showLoader()
    emitMessage(messageText, socket)
    autoResizeTextarea(id_selector.input_textarea_id)
    addMessage(customerMessage)
}
