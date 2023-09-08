import { loadChatHistory } from "./caching";
import { id_selector } from "./constants";
import { scrollToLatestMessage } from "./utilities";

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
  