function adjustScrollPosition() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Scroll to the latest message
function scrollToLatestMessage() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  var latestMessage = messagesContainer.lastElementChild;

  if (latestMessage) {
    latestMessage.scrollIntoView({ behavior: 'smooth' });
  }
}

function adjustInputHeight(element) {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}

// Storing a value

var socket = io('https://5af9-34-125-95-96.ngrok-free.app', { transports: ['websocket'], autoConnect: false });

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
  var inputField = document.getElementById('chatbubble-input-field');
  var chatbubble = document.getElementById('chatbubble-window');
  var chatbubble_button = document.getElementById('chatbubble-button');

  var isFirstTimeOpen = sessionStorage.getItem('opened') !== 'true';

  if (chatbubble.classList.contains('active')) {
    chatbubble.style.transition = '1s ease-in';
    chatbubble.style.opacity = '0';
    // Reset input field placeholder
    inputField.placeholder = '"Hi" starts the chat!';
    chatbubble.classList.remove('active');
    chatbubble_button.classList.remove('deactive');
  } else {
    chatbubble.classList.add('active');
    chatbubble.style.transition = '1s ease-in';
    chatbubble.style.opacity = '1';
    chatbubble.style.transform = 'translateY(0)';
    chatbubble_button.classList.add('deactive');
    inputField.focus();

    if (isFirstTimeOpen) {
      typeMessage("Ask Anything!");
      sessionStorage.setItem('opened', 'true');

      // Apply typeMessage effect to input field placeholder
      inputField.placeholder = '';

      var index = 0;
      var placeholderText = '"Hi" Starts it all!';
      var placeholderInterval = setInterval(function () {
        if (index === placeholderText.length) {
          clearInterval(placeholderInterval);
          return;
        }
        inputField.placeholder += placeholderText.charAt(index);
        index++;
      }, 100);
    }

    // After chat is opened, load the chat history and scroll to the latest message
    if (chatbubble.classList.contains('active')) {
      loadChatHistory();
      scrollToLatestMessage();
    }
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
    chatbubble.style.transform = 'translateY (80px)';
    chatbubble_button.classList.remove('deactive');
  }
});

var isSendingMessage = false;
var isSocketResponsePending = false;

function sendMessage() {
  if (isSendingMessage || isSocketResponsePending) {
    return;
  }

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

    // adjustScrollPosition();
    scrollToLatestMessage();
    sendMessageHelper(message);
  }
  // After message is added
  storeChatHistory();
  // Clear the input field
  inputField.value = '';

  // Reset the height of the input field
  inputField.style.height = '2.4em';

  // Set focus back to the input field
  inputField.focus();
}



var messageQueue = []; // Array to store incoming messages

function handleIncomingMessage(message) {
  var chatbubbleGptMessage = document.createElement('div');
  chatbubbleGptMessage.className = 'chatbubble-gpt-message';
  chatbubbleGptMessage.style.opacity = '0'; // Set initial opacity to 0

  var messageText = document.createElement('p');
  messageText.innerText = message;

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

function startTypingWhenActive() {
  const chatbubbleWindow = document.getElementById('chatbubble-window');
  const messageContainer = document.getElementById('message-container');

  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (chatbubbleWindow.classList.contains('active') && !messageContainer.classList.contains('visible')) {
          typeMessage("Ask Anything!");
        }
      }
    }
  });

  observer.observe(chatbubbleWindow, { attributes: true });
}

function sendMessageOnEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
}

function sendMessageHelper(msg) {
  if (isSendingMessage || isSocketResponsePending) {
    return;
  }

  isSendingMessage = true;

  var user_message = {
    message: msg,
    shop_id: window.shopId
  };

  if (!socket.connected) socket.connect();
  socket.emit("user_message", user_message);

  isSocketResponsePending = true;

  socket.on('ai_response', function (data) {
    console.log('Received data:', data);

    var decodedData = decodeHTML(data);

    var messageContainer = document.getElementById('chatbubble-messages');
    var lastMessageElement = messageContainer.lastElementChild;

    if (lastMessageElement && lastMessageElement.classList.contains('chatbubble-gpt-message')) {
      lastMessageElement.innerHTML += decodedData;
    } else {
      var messageElement = document.createElement('div');
      messageElement.classList.add('chatbubble-gpt-message');
      messageElement.innerHTML = decodedData;
      messageContainer.appendChild(messageElement);
    }

    // adjustScrollPosition();
    scrollToLatestMessage();

    // Enable the input field and send button
    var inputField = document.getElementById('chatbubble-input-field');
    inputField.disabled = false;
    var sendButton = document.getElementById('chatbubble-send');
    sendButton.disabled = false;

    isSendingMessage = false;
    isSocketResponsePending = false;

    // Store the updated chat history after a new chatbot message has been appended
    storeChatHistory();
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
      className: messageElement.className
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
      if (chatHistory.messages[i].className === 'chatbubble-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-message';
        chatbubbleMessage.textContent = chatHistory.messages[i].text;
      } else if (chatHistory.messages[i].className === 'chatbubble-gpt-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-gpt-message';
        chatbubbleMessage.textContent = chatHistory.messages[i].text;
      }

      if (chatbubbleMessage) {
        messagesContainer.appendChild(chatbubbleMessage);
      }
    }

    // Scroll to the latest message after loading the chat history
    scrollToLatestMessage();
  }
}
