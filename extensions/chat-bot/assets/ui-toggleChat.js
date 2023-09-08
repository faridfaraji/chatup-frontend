import { loadChatHistory } from "./caching.js";
import { id_selector } from "./constants.js";
import { scrollToLatestMessage } from "./utilities.js";

export const toggleChat = () => {
    const chatbubbleWindow = document.querySelector(id_selector.chat_div_id);
    const chatbubbleButton = document.querySelector(id_selector.open_chat_button_id);
  
    if (chatbubbleWindow.classList.contains('active')) {
      chatbubbleWindow.classList.add('deactive');
      setTimeout(function () {
        chatbubbleWindow.classList.remove('deactive');
        chatbubbleWindow.classList.remove('active');
        chatbubbleButton.classList.remove('deactive');
      }, 300);
    } else {
      chatbubbleWindow.classList.add('active');
      chatbubbleButton.classList.add('deactive');
      loadChatHistory();
      scrollToLatestMessage();
    }
  }
  