import { id_selector } from "./constants.js";
import { sendMessage } from "./io.js";
import { toggleChat } from "./ui.js";

export const addButtonEvents = () => {
    // open&close chat buttons
    const openChatButton = document.querySelector(id_selector.open_chat_button_id)
    openChatButton.addEventListener("click", () => toggleChat())

    const closeChatButton = document.querySelector(id_selector.close_chat_button_id)
    closeChatButton.addEventListener("click", () => toggleChat())

    // send message
    const sendButton = document.querySelector(id_selector.send_button_id)
    sendButton.addEventListener("click", () => sendMessage(socket))
}
