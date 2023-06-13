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
  var inputField = document.getElementById('chatbubble-input-field');
  var chatbubble = document.getElementById('chatbubble-window');
  var chatbubble_button = document.getElementById('chatbubble-button');

  if (chatbubble.classList.contains('active')) {
    chatbubble.style.opacity = '0';
    chatbubble.style.transform = 'translateY(80px)';
    chatbubble.classList.remove('active');
    chatbubble_button.classList.remove('deactive');

    // Reset input field placeholder
    inputField.placeholder = '"Hi" starts the chat!';
  } else {
    chatbubble.style.opacity = '1';
    chatbubble.style.transform = 'translateY(0)';
    chatbubble.classList.add('active');
    chatbubble_button.classList.add('deactive');
    inputField.focus();

    if (isFirstTimeOpen) {
      typeMessage("Ask Anything!");
      isFirstTimeOpen = false;

      // Apply typeMessage effect to input field placeholder
      inputField.placeholder = '';
      var placeholderText = '"Hi" Starts the conversation';
      var index = 0;
      var placeholderInterval = setInterval(function () {
        if (index === placeholderText.length) {
          clearInterval(placeholderInterval);
          return;
        }
        inputField.placeholder += placeholderText.charAt(index);
        index++;
      }, 100);
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
    messagesContainer.appendChild(newMessage);

    adjustScrollPosition();
    sendMessageHelper(message);
  }

  // Clear the input field
  inputField.value = '';

  // Reset the height of the input field
  inputField.style.height = '2.4em';

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
    sendMessage();
  }
}

function sendMessageHelper(msg) {
  if (isSendingMessage || isSocketResponsePending) {
    return;
  }

  isSendingMessage = true;

  var socket = io('https://5af9-34-125-95-96.ngrok-free.app', { transports: ['websocket'], autoConnect: false });
  var user_message = {
    message: msg,
    shop_id: window.shopId
  };

  if (!socket.connected) socket.connect();
  socket.emit("user_message", user_message);

  isSocketResponsePending = true;

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

    // Enable the input field and send button
    var inputField = document.getElementById('chatbubble-input-field');
    inputField.disabled = false;
    var sendButton = document.getElementById('chatbubble-send');
    sendButton.disabled = false;

    isSendingMessage = false;
    isSocketResponsePending = false;
  });
}

// Helper function to decode HTML-encoded special characters
function decodeHTML(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}


document.addEventListener('DOMContentLoaded', startTypingWhenActive);