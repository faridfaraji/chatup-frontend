import { storeChatHistory } from "./caching.js";
import { id_selector } from "./constants.js";
import { scrollToLatestMessage } from "./utilities.js";

export const addMessage = (message) => {
    var messagesContainer = document.querySelector(id_selector.messages_div_id);
    messagesContainer.appendChild(message);
    messagesContainer.style.display = 'flex';
    setTimeout(function () {
        message.style.opacity = '1'; // Set opacity to 1 for fade-in
    }, 100);
    storeChatHistory();
    scrollToLatestMessage();
}
