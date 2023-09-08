
export const handleAiMessage = (message) => {
  var messagesContainer = document.querySelector(id_selector.messages_div_id);
  var observer = newMutationObserver(() => {
    
  })


}


import { class_selector, id_selector } from "../constants";





export const displayAiResponse = (data, details) => {
    var observer = new MutationObserver(function () {
      scrollToLatestMessage();
      storeChatHistory(); // Store chat history whenever a new message is added
    });
    var config = { childList: true };
    observer.observe(details.messageContainer, config);
    var decodedData = decodeHTML(data);
    details.currentMessage += decodedData;
  
    var lastMessageElement = details.messageContainer.lastElementChild;
  
    if (lastMessageElement && lastMessageElement.classList.contains('chatbubble-gpt-message')) {
      details.messageElement = lastMessageElement;
    } else {
      details.messageElement = document.createElement('div');
      details.messageElement.classList.add('chatbubble-gpt-message');
  
      var timestamp = document.createElement('div');
      timestamp.classList.add('chatbubble-gpt-message-time');
      timestamp.innerText = createTimestamp();
      details.messageElement.setAttribute('data-timestamp', Date.now()); // set the timestamp attribute
      details.messageContainer.appendChild(details.messageElement);
      details.messageElement.appendChild(timestamp); // Append timestamp here before manipulating innerHTML
    }
  
    // Create a temporary element to apply hyperlinking
    var tempElement = document.createElement('div');
    tempElement.textContent = details.currentMessage;
    hyperlinkText(tempElement);
  
    // Create a pre element
    var preElement = document.createElement('pre');
    preElement.innerHTML = tempElement.innerHTML;
  
    // Replace the HTML of the messageElement with the pre element
    details.messageElement.innerHTML = '';
    details.messageElement.appendChild(preElement);
  
    clearTimeout(details.chunkTimeout);
    details.chunkTimeout = setTimeout(function () {
      var inputField = document.getElementById('chatbubble-input-field');
      inputField.disabled = false;
      var sendButton = document.getElementById('chatbubble-send');
      sendButton.disabled = false;
  
      storeChatHistory();
      scrollToLatestMessage();
  
      observer.disconnect();
      hideLoader(); // Hide the loader
    }, 1000); // Increased delay to 1 second
  
    // Scroll to the latest message after the incoming message is complete
    clearTimeout(details.scrollTimeout);
    details.scrollTimeout = setTimeout(function () {
      scrollToLatestMessage();
    }, 500); // Delay scrolling to give time for the message to render
  }

export const displayResponse = () => {

}
