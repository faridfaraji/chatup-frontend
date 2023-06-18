var socket = io('https://5af9-34-125-95-96.ngrok-free.app', { transports: ['websocket'], autoConnect: false });
// how come nothing is being hyperlinked as my messages arrive? here is my full js for reference. 
function adjustScrollPosition() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
// Scroll to the latest message
function scrollToLatestMessage() {
  // Add a small delay to allow the DOM update to complete
  setTimeout(() => {
    var messagesContainer = document.getElementById('chatbubble-messages');
    var latestMessage = messagesContainer.lastElementChild;

    if (latestMessage) {
      latestMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // Adjust the delay time (in milliseconds) as needed
}

// Retrieving a value
var cachedOpen = sessionStorage.getItem('opened');
if (cachedOpen === null) {
  var isFirstTimeOpen = true
} else {
  var isFirstTimeOpen = cachedOpen
}

console.log(cachedOpen)
console.log(isFirstTimeOpen)

function toggleChat() {
  const chatbubbleWindow = document.getElementById('chatbubble-window');
  const messageContainer = document.getElementById('message-container');
  const inputField = document.getElementById('chatbubble-input-field');
  const chatbubbleButton = document.getElementById('chatbubble-button');

  let isFirstTimeOpen = sessionStorage.getItem('opened') !== 'true';

  if (isFirstTimeOpen) {
    sessionStorage.setItem('opened', 'true');
    sessionStorage.removeItem('placeholderShown');
    sessionStorage.removeItem('messageShown');
  }

  if (chatbubbleWindow.classList.contains('active')) {
    // Reset input field placeholder
    inputField.placeholder = '';
    chatbubbleWindow.classList.remove('active');
    chatbubbleButton.classList.remove('deactive');
  } else {
    chatbubbleWindow.classList.add('active');
    // Set focus back to the input field
    inputField.focus();
    chatbubbleButton.classList.add('deactive');

    if (!sessionStorage.getItem('placeholderShown')) {
      inputField.placeholder = 'Type here';
      sessionStorage.setItem('placeholderShown', 'true');
    }

    if (!messageContainer.classList.contains('visible') && !sessionStorage.getItem('messageShown')) {
      typeMessage("Ask Anything!");
      sessionStorage.setItem('messageShown', 'true');
    }

    loadChatHistory();
    scrollToLatestMessage();
  }
}









document.addEventListener('click', function (event) {
  var chatbubble = document.getElementById('chatbubble');
  var chatbubble_window = document.getElementById('chatbubble-window');
  var chatbubble_closeButton = doocument.getElementByClassName('close_button');

  if (!chatbubble.contains(event.target) && chatbubble_window.classList.contains('active')) {
    chatbubble_window.classList.remove('active');
    var chatbubble_button = document.getElementById('chatbubble-button');
    chatbubble.style.transition = '.7s ease-in';
    chatbubble.style.opacity = '0';
    // chatbubble.style.transform = 'translateY (80px)';
    chatbubble_button.classList.remove('deactive');
  }
});

// var isSendingMessage = false;
// var isSocketResponsePending = false;

function sendMessage() {
  // if (isSendingMessage || isSocketResponsePending) {
  //   return;
  // }

  var inputField = document.getElementById('chatbubble-input-field');
  var message = inputField.value.trim();

  // Check if the message is not empty
  if (message !== '') {
    var messagesContainer = document.getElementById('chatbubble-messages');
    var newMessage = document.createElement('div');
    newMessage.classList.add('chatbubble-message');
    newMessage.textContent = message;

    // Set initial opacity to 0 for fade-in effect
    newMessage.style.opacity = '0';

    messagesContainer.appendChild(newMessage);

    // Use setTimeout to trigger the fade-in effect after a short delay
    setTimeout(function () {
      newMessage.style.opacity = '1'; // Set opacity to 1 for fade-in
    }, 100);
    // Reset input field placeholder
    inputField.placeholder = '';
    // adjustScrollPosition();
    scrollToLatestMessage();
    sendMessageHelper(message);
  }
  // After message is added
  storeChatHistory();
  scrollToLatestMessage();
  // Clear the input field

  inputField.value = '';

  // Reset the height of the input field
  inputField.style.height = 'auto';

  // Set focus back to the input field
  inputField.focus();
}

var messageQueue = []; // Array to store incoming messages

function handleIncomingMessage(message) {
  var chatbubbleGptMessage = document.createElement('div');
  chatbubbleGptMessage.className = 'chatbubble-gpt-message';
  chatbubbleGptMessage.style.opacity = '0'; // Set initial opacity to 0

  var messageText = document.createElement('p');
  messageText.innerHTML = hyperlinkUrlsInData(message); // Apply hyperlinking to the message

  // Create a timestamp element
  var timestamp = document.createElement('span');
  timestamp.className = 'message-timestamp';
  timestamp.innerText = getCurrentTimestamp();

  // Append the message and timestamp to the message container
  chatbubbleGptMessage.appendChild(messageText);
  chatbubbleGptMessage.appendChild(timestamp);

  var chatbubbleWindow = document.getElementById('chatbubble-window');
  chatbubbleWindow.appendChild(chatbubbleGptMessage);

  // Use setTimeout to trigger the fade-in effect after a short delay
  setTimeout(function () {
    chatbubbleGptMessage.style.opacity = '1'; // Set opacity to 1 for fade-in
  }, 100);
  // After message is added
  storeChatHistory();
  scrollToLatestMessage();
}

// Function to get the current timestamp
function getCurrentTimestamp() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
}

function processMessageQueue() {
  if (messageQueue.length === 0) {
    return; // No more messages in the queue
  }

  var message = messageQueue.shift(); // Retrieve the next message from the queue

  var chatbubbleGptMessage = document.createElement('div');
  chatbubbleGptMessage.className = 'chatbubble-gpt-message';
  chatbubbleGptMessage.style.opacity = '0'; // Set initial opacity to 0

  var messageText = document.createElement('p');
  messageText.innerText = message;

  chatbubbleGptMessage.appendChild(messageText);
  var chatbubbleWindow = document.getElementById('chatbubble-window');
  chatbubbleWindow.appendChild(chatbubbleGptMessage);

  // Use setTimeout to trigger the fade-in effect after a short delay
  setTimeout(function () {
    chatbubbleGptMessage.style.opacity = '1'; // Set opacity to 1 for fade-in

    // Continue processing the message queue after the fade-in effect is complete
    setTimeout(function () {
      processMessageQueue();
      scrollToLatestMessage();
    }, 500); // Delay between each message (500 milliseconds in this example)
  }, 100); // Delay before the fade-in effect starts (100 milliseconds in this example)
}

function typeMessage(message) {
  const messageContainer = document.getElementById('message');
  const container = document.getElementById('message-container');
  container.classList.add('visible');

  let index = 0;
  const typeInterval = setInterval(function () {
    if (index === message.length) {
      clearInterval(typeInterval);
      return;
    }
    messageContainer.textContent += message.charAt(index);
    index++;
  }, 100);
}

// function startTypingWhenActive() {
//   const chatbubbleWindow = document.getElementById('chatbubble-window');
//   const messageContainer = document.getElementById('message-container');

//   const observer = new MutationObserver(function (mutationsList) {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//         var isFirstTimeOpen = sessionStorage.getItem('opened') !== 'true';
//         if (chatbubbleWindow.classList.contains('active') && !messageContainer.classList.contains('visible') && isFirstTimeOpen) {
//           typeMessage("Ask Anything!");
//           sessionStorage.setItem('opened', 'true');
//         }
//       }
//     }
//   });

//   observer.observe(chatbubbleWindow, { attributes: true });
// }

function sendMessageOnEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();

  }
}

function sendMessageHelper(msg) {
  // if (isSendingMessage || isSocketResponsePending) {
  //   return;
  // }

  // isSendingMessage = true;

  var user_message = {
    message: msg,
    shop_id: window.shopId
  };

  if (!socket.connected) socket.connect();
  socket.emit("user_message", user_message);

  // isSocketResponsePending = true;

  var currentMessage = '';
  var chunkTimeout;
  var messageElement;

  var messageContainer = document.getElementById('chatbubble-messages');

  // Initialize the MutationObserver
  var observer = new MutationObserver(scrollToLatestMessage);
  var config = { childList: true }; // Configuration of the observer: in this case, looking for the addition of new child nodes
  observer.observe(messageContainer, config);

  // Remove any existing 'ai_response' listeners
  socket.off('ai_response');

  // Now we can add the listener again
  socket.on('ai_response', function (data) {
    console.log('Received data:', data);

    var decodedData = decodeHTML(data);
    currentMessage += decodedData;

    var lastMessageElement = messageContainer.lastElementChild;

    if (lastMessageElement && lastMessageElement.classList.contains('chatbubble-gpt-message')) {
      lastMessageElement.innerHTML += decodedData;
      messageElement = lastMessageElement;
    } else {
      messageElement = document.createElement('div');
      messageElement.classList.add('chatbubble-gpt-message');
      messageElement.innerHTML = decodedData;
      messageContainer.appendChild(messageElement);
    }

    clearTimeout(chunkTimeout);
    chunkTimeout = setTimeout(function () {
      // Enable the input field and send button
      var inputField = document.getElementById('chatbubble-input-field');
      inputField.disabled = false;
      var sendButton = document.getElementById('chatbubble-send');
      sendButton.disabled = false;
      // isSendingMessage = false;
      // isSocketResponsePending = false;
      // Store the updated chat history after a new chatbot message has been appended
      storeChatHistory();
      scrollToLatestMessage();
      // Stop observing after message has fully arrived
      observer.disconnect();
    }, 300); // Here 300ms is the delay, adjust it according to your network conditions
  });
}






// Helper function to decode HTML-encoded special characters
function decodeHTML(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

document.addEventListener('DOMContentLoaded', startTypingWhenActive);

// Store chat history
function storeChatHistory() {
  var chatHistory = [];
  var messages = document.querySelectorAll('.chatbubble-message, .chatbubble-gpt-message');

  messages.forEach(function (messageElement) {
    var message = {
      text: messageElement.textContent,
      className: messageElement.className,

    };
    chatHistory.push(message);
  });

  var chatHistoryData = {
    timestamp: Date.now(),
    messages: chatHistory
  };

  localStorage.setItem('chatHistory', JSON.stringify(chatHistoryData));
}


// Load chat history
// Load chat history
function loadChatHistory() {
  var chatHistory = JSON.parse(localStorage.getItem('chatHistory'));
  var currentTime = new Date().getTime();

  // Clear existing messages
  var messagesContainer = document.getElementById('chatbubble-messages');
  while (messagesContainer.firstChild) {
    messagesContainer.firstChild.remove();
  }

  // Load chat history if it's not null and not expired
  if (chatHistory && currentTime - chatHistory.timestamp <= 24 * 60 * 60 * 1000) {
    var chatbubbleMessage;
    for (var i = 0; i < chatHistory.messages.length; i++) {
      var message = chatHistory.messages[i];
      var chatbubbleMessage;

      if (message.className === 'chatbubble-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-message';
        chatbubbleMessage.textContent = message.text;
      } else if (message.className === 'chatbubble-gpt-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-gpt-message';
        chatbubbleMessage.textContent = message.text; // Added this line
      }

      if (chatbubbleMessage) {
        messagesContainer.appendChild(chatbubbleMessage);
      }
    }
    // Scroll to the latest message after loading the chat history
    scrollToLatestMessage();
  }
}

// Get the textarea element
const textarea = document.getElementById('chatbubble-input-field');

// Flag to keep track of touch events
let touchMoved = false;

// Add an event listener to the textarea for the touchstart event
textarea.addEventListener('touchstart', function () {
  touchMoved = false;
});

// Add an event listener to the textarea for the touchmove event
textarea.addEventListener('touchmove', function () {
  touchMoved = true;
});

// Add an event listener to the textarea for the click event
textarea.addEventListener('click', function (event) {
  // Delay execution to allow slight zooming to occur
  setTimeout(function () {
    // Prevent zooming if touch events were detected
    if (touchMoved) {
      event.preventDefault();
      touchMoved = false; // Reset the touchMoved flag
    }
  }, 300); // Adjust the delay time (in milliseconds) as needed
});

window.addEventListener('touchend', function (e) {
  var inputField = document.getElementById('chatbubble-input-field');
  if (e.target === inputField) {
    e.preventDefault();
  }
}, false);

let textArea = document.getElementById("input-round-box");

textArea.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}


var message = {
  text: messageElement.textContent,
  className: messageElement.className,

};

chatHistory.push(message);


