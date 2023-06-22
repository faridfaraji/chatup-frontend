var uniqueId = localStorage.getItem('uniqueId');
if (!uniqueId) {
  uniqueId = generateUniqueId();
  localStorage.setItem('uniqueId', uniqueId);
  setCookie('uniqueId', uniqueId, 24 * 60 * 60);
  console.log("Unique Id =", uniqueId);
}

function generateUniqueId() {

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  return generateUUID();
}

function setCookie(name, value, expirationSeconds) {
  var expires = '';
  if (expirationSeconds) {
    var date = new Date();
    date.setTime(date.getTime() + expirationSeconds * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}


var storedSocket = sessionStorage.getItem('socketConnection');

if (!storedSocket) {
  var uniqueId = localStorage.getItem('uniqueId');
  if (!uniqueId) {
    uniqueId = generateUniqueId();
    localStorage.setItem('uniqueId', uniqueId);
    setCookie('uniqueId', uniqueId, 24 * 60 * 60);
  }

  var socket = io('https://5af9-34-125-95-96.ngrok-free.app', {
    transports: ['websocket', 'polling', 'xhr-polling'],
    autoConnect: false,
    query: {
      uniqueId: uniqueId
    }
  });

  sessionStorage.setItem('socketConnection', JSON.stringify(socket));
} else {

  var socket = JSON.parse(storedSocket);
}

if (!socket.connected) {
  socket.connect();
}




window.addEventListener('DOMContentLoaded', (event) => {

  if (sessionStorage.getItem('opacitySet') === 'true') {
    document.querySelector('#initial_prompts').style.opacity = '0';
    document.querySelector('#chatbubble-messages').style.display = 'flex';
  }

  if (sessionStorage.getItem('displaySet') === 'true') {
    document.querySelector('#initial_prompts').style.display = 'none';
    document.querySelector('#chatbubble-messages').style.display = 'flex';
  }

  document.querySelectorAll('.initial-message-boxes').forEach(item => {
    item.addEventListener('click', event => {
      setTimeout(() => {

        document.querySelector('#initial_prompts').style.opacity = '0';
      }, 600);

      setTimeout(() => {

        document.querySelector('#initial_prompts').style.display = 'none';
      }, 200);
      document.querySelector('#chatbubble-messages').style.display = 'flex';


      sessionStorage.setItem('opacitySet', 'true');
      sessionStorage.setItem('displaySet', 'true');

      // Get the text content of the clicked div
      const messageText = event.target.textContent.trim();

      // Emit the message text as if the user sent it via the text area
      sendMessage(messageText);
    });
  });
});

function adjustScrollPosition() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}
function scrollToLatestMessage() {
  var messagesContainer = document.getElementById('chatbubble-messages');
  var latestMessage = messagesContainer.lastElementChild;

  // Function to perform smooth scroll to the latest message
  var scrollSmoothly = function () {
    if (latestMessage) {
      latestMessage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Create a new MutationObserver instance
  var observer = new MutationObserver(
    throttle(debounce(scrollSmoothly, 50), 150)
  );

  // Start observing the container for configured mutations
  observer.observe(messagesContainer, { childList: true });

  // Initially call the function to scroll to the latest message
  scrollSmoothly();
}



// Retrieving a value
var cachedOpen = sessionStorage.getItem('opened');

console.log(cachedOpen);

function toggleChat() {
  const chatbubbleWindow = document.getElementById('chatbubble-window');
  const chatbubbleButton = document.getElementById('chatbubble-button');
  const inputField = document.getElementById('chatbubble-input-field');
  if (!cachedOpen) {
    sessionStorage.setItem('opened', 'true');
    cachedOpen = 'true';
  }
  if (chatbubbleWindow.classList.contains('active')) {
    chatbubbleWindow.classList.add('deactive');
    setTimeout(function () {
      chatbubbleWindow.classList.remove('active');
      chatbubbleWindow.classList.remove('deactive');
    }, 800);
    chatbubbleButton.classList.remove('deactive');
  } else {
    chatbubbleWindow.classList.add('active');
    // inputField.focus();
    chatbubbleButton.classList.add('deactive');
    loadChatHistory();
    scrollToLatestMessage();
  }
}


document.addEventListener('click', function (event) {
  var chatbubble = document.getElementById('chatbubble');
  var chatbubble_window = document.getElementById('chatbubble-window');
  var chatbubble_closeButton = document.getElementByClassName('close_button');

  if (!chatbubble.contains(event.target) && chatbubble_window.classList.contains('active')) {
    chatbubble_window.classList.remove('active');
    var chatbubble_button = document.getElementById('chatbubble-button');
    chatbubble.style.transition = '.7s ease-in';
    chatbubble.style.opacity = '0';
    // chatbubble.style.transform = 'translateY (80px)';
    chatbubble_button.classList.remove('deactive');
  }
});



function sendMessage(messageText) {
  var inputField = document.getElementById('chatbubble-input-field');

  if (!messageText) {
    messageText = inputField.value.trim();
  }

  if (messageText !== '') {
    var messagesContainer = document.getElementById('chatbubble-messages');
    var newMessage = document.createElement('div');
    newMessage.classList.add('chatbubble-message');
    newMessage.textContent = messageText;

    // Add timestamp to the message
    newMessage.setAttribute('data-timestamp', Date.now());

    // Set initial opacity to 0 for fade-in effect
    newMessage.style.opacity = '0';

    var timestamp = document.createElement('div');
    timestamp.classList.add('chatbubble-message-time');
    timestamp.innerText = getCurrentTimestamp();

    newMessage.appendChild(timestamp);
    messagesContainer.appendChild(newMessage);
    document.querySelector('#initial_prompts').style.display = 'none';
    messagesContainer.style.display = 'flex';
    // Use setTimeout to trigger the fade-in effect after a short delay
    setTimeout(function () {
      newMessage.style.opacity = '1'; // Set opacity to 1 for fade-in
    }, 100);

    // Reset input field placeholder
    inputField.placeholder = '';

    scrollToLatestMessage();
    sendMessageHelper(messageText);

    // Clear the input field
    inputField.value = '';
  }

  // After message is added
  storeChatHistory();
  removeOldMessages();
  scrollToLatestMessage();

  // Reset the height of the input field
  inputField.style.height = 'auto';

  // Set focus back to the input field
  inputField.focus();
}



function removeOldMessages() {
  var currentTime = Date.now();
  var messagesContainer = document.getElementById('chatbubble-messages');
  var messages = messagesContainer.querySelectorAll('.chatbubble-message, .chatbubble-gpt-message');

  messages.forEach(function (messageElement) {
    var messageTime = messageElement.getAttribute('data-timestamp');
    // Remove the message if it's older than one hour
    if (currentTime - messageTime > 60 * 60 * 1000) {
      messageElement.remove();
    }
  });
}

var messageQueue = []; // Array to store incoming messages

function handleIncomingMessage(message) {
  var chatbubbleGptMessage = document.createElement('div');
  chatbubbleGptMessage.className = 'chatbubble-gpt-message';
  chatbubbleGptMessage.style.opacity = '0'; // Set initial opacity to 0

  var messageText = document.createElement('p');
  messageText.innerHTML = hyperlinkUrlsInData(message); // Apply hyperlinking to the message



  var messagesContainer = document.getElementById('chatbubble-messages');
  messagesContainer.appendChild(chatbubbleGptMessage);

  // Use setTimeout to trigger the fade-in effect after a short delay
  setTimeout(function () {
    chatbubbleGptMessage.style.opacity = '1'; // Set opacity to 1 for fade-in
  }, 400);
  // Create a timestamp element
  var timestamp = document.createElement('div');
  timestamp.classList.add('chatbubble-gpt-message-time');
  timestamp.innerText = getCurrentTimestamp();

  chatbubbleGptMessage.appendChild(messageText);
  chatbubbleGptMessage.appendChild(timestamp);
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



function typeMessage(message) {
  const messageContainer = document.getElementById('message');
  const container = document.getElementById('message-container');
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



function sendMessageOnEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();

  }
}


function sendMessageHelper(msg) {
  var user_message = {
    message: msg,
    shop_id: window.shopId
  };

  if (!socket.connected) socket.connect();
  socket.emit("user_message", user_message);

  var currentMessage = '';
  var chunkTimeout;
  var messageElement;
  var scrollTimeout;

  var messageContainer = document.getElementById('chatbubble-messages');

  var observer = new MutationObserver(function () {
    scrollToLatestMessage();
    storeChatHistory(); // Store chat history whenever a new message is added
  });
  var config = { childList: true };
  observer.observe(messageContainer, config);

  socket.off('ai_response');

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

      var timestamp = document.createElement('div');
      timestamp.classList.add('chatbubble-gpt-message-time');
      timestamp.innerText = getCurrentTimestamp();

      messageElement.appendChild(timestamp);
      messageElement.setAttribute('data-timestamp', Date.now()); // set the timestamp attribute
      messageContainer.appendChild(messageElement);
    }

    clearTimeout(chunkTimeout);
    chunkTimeout = setTimeout(function () {
      var inputField = document.getElementById('chatbubble-input-field');
      inputField.disabled = false;
      var sendButton = document.getElementById('chatbubble-send');
      sendButton.disabled = false;

      storeChatHistory();
      scrollToLatestMessage();

      observer.disconnect();
    }, 1000); // Increased delay to 1 second

    // Scroll to the latest message after the incoming message is complete
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      scrollToLatestMessage();
    }, 500); // Delay scrolling to give time for the message to render
  });
}


function decodeHTML(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

document.addEventListener('DOMContentLoaded', startTypingWhenActive);


function storeChatHistory() {
  var chatHistory = [];
  var messages = document.querySelectorAll('.chatbubble-message, .chatbubble-gpt-message');

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






function loadChatHistory() {
  var chatHistory = JSON.parse(localStorage.getItem('chatHistory'));
  var currentTime = Date.now();

  // Clear existing messages
  var messagesContainer = document.getElementById('chatbubble-messages');
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

      if (message.className === 'chatbubble-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-message';
        chatbubbleMessage.innerHTML = message.html; // Use the stored HTML
        chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);
      } else if (message.className === 'chatbubble-gpt-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-gpt-message';
        chatbubbleMessage.innerHTML = message.html; // Use the stored HTML
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



const textarea = document.getElementById('chatbubble-input-field');

let touchMoved = false;

textarea.addEventListener('touchstart', function () {
  touchMoved = false;
});


textarea.addEventListener('touchmove', function () {
  touchMoved = true;
});


textarea.addEventListener('click', function (event) {
  setTimeout(function () {
    if (touchMoved) {
      event.preventDefault();
      touchMoved = false;
    }
  }, 300);
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


chatHistory.push(message);


function removeFocusAfterDelay() {
  var chatBubble = document.querySelector('#chatbubble-send');
  chatBubble.addEventListener('focus', function () {
    setTimeout(function () {
      chatBubble.classList.remove('focus');
    }, 400);
  });
}

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (

      e.code === 22 ||

      e.code === 1014 ||

      e.name === 'QuotaExceededError' ||

      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&

      (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // localStorage is available
} else {
  // localStorage is not available
}
