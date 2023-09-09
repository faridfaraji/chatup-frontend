import { id_selector, sessionKey } from "./constants.js";
import { scrollToLatestMessage } from "./utilities.js";

export const loadChatHistory = () => {
  var chatHistory = JSON.parse(localStorage.getItem(sessionKey.chat_history))
  var currentTime = Date.now();

  var messagesContainer = document.querySelector(id_selector.messages_div_id);
  while (messagesContainer.firstChild) {
    messagesContainer.firstChild.remove();
  }

  if (chatHistory) {
    for (var i = 0; i < chatHistory.length; i++) {
      var message = chatHistory[i];
      if (currentTime - message.timestamp > 60 * 60 * 1000) {
        continue;
      }

      var chatbubbleMessage;
      const messageClassList = message.className.split(" ")

      chatbubbleMessage = document.createElement('div');
      chatbubbleMessage.className = message.className;
      chatbubbleMessage.innerHTML = message.html;
      chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);

      if (chatbubbleMessage) {
        messagesContainer.appendChild(chatbubbleMessage);
      }
    }

    scrollToLatestMessage();
  }
}
