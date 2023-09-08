import { class_selector, id_selector } from "../constants"
import { addMessage } from "../ui/addMessage"
import { createAiMessage } from "../ui/createMessage"

let accumulatedText = ""

export const handleAiMessage = (message) => {
    var messagesContainer = document.querySelector(id_selector.messages_div_id)
    var latestMessage = messagesContainer.lastElementChild;

    // Append a new message container and reset the accumulated text if AI is not
    // the latest message
    if (!latestMessage.classList.includes(class_selector.ai_message_div_class)) {
        const aiMessage = createAiMessage()
        addMessage(aiMessage)
        accumulatedText = ""
    }
    // If spittin', keep spittin'
    if (latestMessage.classList.includes(class_selector.ai_message_div_class)) {
        accumulatedText += message
        latestMessage.innerHTML = processMessage(accumulatedText)
    }



}






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



// Function to process a single element and its descendants
function processElement(element) {
    if (element.nodeType === 1 && element.classList.contains('chatbubble-gpt-message')) {
      hyperlinkText(element)
      element.dataset.hyperlinked = true;
    }
    element.childNodes.forEach(childNode => processElement(childNode));
  }
  
  // Initialize a mutation observer
  const observer = new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          processElement(node);
        });
      }
    }
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
  
  
  



// Define regular expressions to match URLs, emails, and phone numbers
const partialLinkRegex =  /\[([^\]]+)\]\([^)]*/
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;


function hyperlinkText(element) {
  const messageText = element.textContent;
  if (messageText !== null) {
    let modifiedText = messageText;
    if (!element.dataset?.hyperlinked) {
      modifiedText = modifiedText.replace(markdownLinkRegex, '<a href="https://$2">$1</a>');
      modifiedText = modifiedText.replace(emailRegex, '<a href="mailto:$1">$1</a>');
      modifiedText = modifiedText.replace(phoneRegex, '<a href="tel:$1">$1</a>');
    }

    // Replace only the message content, excluding the timestamp div
    element.childNodes.forEach(childNode => {
      if (!childNode.classList || !childNode.classList.contains('chatbubble-message-time')) {
        element.removeChild(childNode);
      }
    });
    element.innerHTML = modifiedText;
  }
}


