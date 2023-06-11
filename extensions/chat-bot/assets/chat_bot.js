function adjustScrollPosition() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function adjustInputHeight(element) {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}

var isFirstTimeOpen = true;

function toggleChat() {
  var chatbubble = document.getElementById('chatbubble-window');
  var chatbubble_button = document.getElementById('chatbubble-button');

  if (chatbubble.classList.contains('active')) {
    chatbubble.classList.remove('active');
    chatbubble_button.classList.remove('deactive');
  } else {
    chatbubble.classList.add('active');
    chatbubble_button.classList.add('deactive');

    if (isFirstTimeOpen) {
      typeMessage("Ask Anything!");
      isFirstTimeOpen = false;
    }
  }
}

document.addEventListener('click', function (event) {
  var chatbubble = document.getElementById('chatbubble');
  var chatbubble_window = document.getElementById('chatbubble-window');

  if (!chatbubble.contains(event.target) && chatbubble_window.classList.contains('active')) {
    chatbubble_window.classList.remove('active');
    var chatbubble_button = document.getElementById('chatbubble-button');
    chatbubble_button.classList.remove('deactive');
  }
});

function sendMessage() {
  var inputField = document.getElementById('chatbubble-input-field');
  var message = inputField.value;

  // Check if the message is not empty
  if (message.trim() !== '') {
    // Send the message to your chatbot API or handle it as desired

    // Add the message to the chat window
    var messagesContainer = document.getElementById('chatbubble-messages');
    var newMessage = document.createElement('div');
    newMessage.classList.add('chatbubble-message');
    newMessage.textContent = message;
    messagesContainer.appendChild(newMessage);

    adjustScrollPosition();
    sendMessageHelper(message.trim());
  }

  // Clear the input field
  inputField.value = '';

  // Set focus back to the input field
  inputField.focus();
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
    var sendButton = document.getElementById('chatbubble-send');
    sendButton.click();
  }
}

function sendMessageHelper(msg) {
  var socket = io('http://34.125.95.96:8003', { transports: ['websocket'], autoConnect: false });
  var user_message = {
    message: msg,
    shop_id: window.shopId
  };

  if (!socket.connected) socket.connect();
  socket.emit("user_message", user_message);

  socket.on('ai_response', function (data) {
    console.log('Received data:', data);

    var decodedData = decodeHTML(data); // Decode the HTML-encoded special characters

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

    adjustScrollPosition();
  });
}

// Helper function to decode HTML-encoded special characters
function decodeHTML(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}


document.addEventListener('DOMContentLoaded', startTypingWhenActive);
