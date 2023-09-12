import { class_selector } from "./constants.js";

export const storeChatHistory = () => {
    var chatHistory = [];
    var messages = document.querySelectorAll(class_selector.message_div_class);
  
    messages.forEach(function (messageElement) {
      var message = {
        html: messageElement.innerHTML, // Store innerHTML instead of textContent
        className: messageElement.className,
        timestamp: messageElement.getAttribute('data-timestamp'),
      };
      chatHistory.push(message);
    });
  
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }