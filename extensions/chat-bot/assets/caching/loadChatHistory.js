import { class_selector, id_selector, sessionKey } from "../constants";

export const loadChatHistory = () => {
  var chatHistory = JSON.localStorage.getItem(sessionKey.chat_history);
  var currentTime = Date.now();

  // Clear existing messages
  var messagesContainer = document.querySelector(id_selector.messages_div_id);
  while (messagesContainer.firstChild) {
    messagesContainer.firstChild.remove();
  }

  // Load chat history if it's not null
  if (chatHistory) {
    for (var i = 0; i < chatHistory.length; i++) {
      var message = chatHistory[i];
      // Skip this message if it's older than one hour
      if (currentTime - message.timestamp > 60 * 60 * 1000) {
        continue;
      }

      var chatbubbleMessage;
      messageClassList = message.className.split(" ")

      // GPT messages get hyperlinked, hence are treated differently
      if (messageClassList.includes(class_selector.gpt_message_div_class)) {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = message.className;
        const textNode = document.createTextNode(message.html);
        chatbubbleMessage.appendChild(textNode);
        chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);
        chatbubbleMessage.setAttribute('data-hyperlinked', true);
      } else {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = message.className;
        chatbubbleMessage.innerHTML = message.html;
        chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);
      }

      if (chatbubbleMessage) {
        messagesContainer.appendChild(chatbubbleMessage);
      }
    }

    // Scroll to the latest message after loading the chat history
    scrollToLatestMessage();
  }
}
