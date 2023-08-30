
var connInitiated = false;

var metaData = null;

fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    metaData = data;
  })
  .catch(error => {
    console.error('Error fetching IP', error);
  });

  function validate() {
  const shop_url = window.Shopify.shop
  const validation_url = `https://gateway.dev.awesoon.tech/v1/shopify/chatup/plans/validate-shop?shop_url=${shop_url}`
  const validation = fetch(validation_url, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return (response.json())
      } else {
        setTimeout(validate, 30 * 1000)
        return false
      }
    })
    .then((data) => {
      if (data && !data.disable) {
        var validChatBubble = document.getElementById("chatbubble-button")
        validChatBubble.classList.remove('deactive');
      }
    })
}

validate()

function showLoader() {
  var loader = document.querySelector('.custom-loader');
  var sendButton = document.querySelector('#chatbubble-send');
  sendButton.style.scale = '0';
  loader.style.scale = '.4';

}
function hideLoader() {
  var loader = document.querySelector('.custom-loader');
  var sendButton = document.querySelector('#chatbubble-send');
  loader.style.scale = '0';
  sendButton.style.scale = '1';
}

// Define regular expressions to match URLs, emails, and phone numbers
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;


// This function hyperlinks URLs, emails, and phone numbers and removes dots after hyperlinks
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

// Function to check if an element has the .chatbubble-gpt-message class
function hasChatBubbleGptMessageClass(element) {
  return element.classList.contains('chatbubble-gpt-message');
}

// Function to process a single element and its descendants
function processElement(element) {
  if (element.nodeType === 1 && hasChatBubbleGptMessageClass(element)) {
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

// Function to generate a UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to check if uniqueId is expired
function isExpired(uniqueId) {
  // Get the expiration time from the cookie
  var cookieValue = getCookie('uniqueId');
  if (cookieValue) {
    var expirationTime = parseInt(cookieValue);
    var currentTime = new Date().getTime() / 1000;
    return expirationTime <= currentTime;
  }
  return true;
}

// Function to get the value of a cookie by name
function getCookie(name) {
  var cookieName = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Get the uniqueId from localStorage or generate a new one if expired or not found


var socket = io('https://chat.dev.awesoon.tech/customer', {
  transports: ['websocket', 'polling', 'xhr-polling'],
  autoConnect: false
});



window.addEventListener('DOMContentLoaded', (event) => {
  if (event.keyCode === 27) {
    toggleChat();
  }
  // Check if opacity was set to 0 in a previous session
  if (sessionStorage.getItem('opacitySet') === 'true') {
    // document.querySelector('#initial_prompts').style.opacity = '0';
    document.querySelector('#chatbubble-messages').style.display = 'flex';
  }
  // Check if display was set to none in a previous session
  if (sessionStorage.getItem('displaySet') === 'true') {
    // document.querySelector('#initial_prompts').style.display = 'none';
    document.querySelector('#chatbubble-messages').style.display = 'flex';
  }
  // Add event listeners to all .initial-message-boxes
  document.querySelectorAll('.initial-message-boxes').forEach(item => {
    item.addEventListener('click', event => {
      setTimeout(() => {
        // Set the opacity of #initial_prompts to 0
        // document.querySelector('#initial_prompts').style.opacity = '0';
      }, 600);

      setTimeout(() => {
        // Set the opacity of #initial_prompts to 0
        document.querySelector('#initial_prompts').style.display = 'none';
      }, 200);
      document.querySelector('#chatbubble-messages').style.display = 'flex';

      // Save in sessionStorage that opacity was set to 0
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
  var messagesContainer = document.querySelector('#chatbubble-messages');
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
      chatbubbleWindow.classList.remove('deactive');
      chatbubbleWindow.classList.remove('active');
      chatbubbleButton.classList.remove('deactive');
    }, 300);
  } else {
    chatbubbleWindow.classList.add('active');
    // inputField.focus();
    chatbubbleButton.classList.add('deactive');
    loadChatHistory();
    scrollToLatestMessage();
  }
}


document.addEventListener('touchstart', function (event) {
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
    showLoader(); // Show the loader
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
    // document.querySelector('#initial_prompts').style.display = 'none';
    messagesContainer.style.display = 'flex';
    // Use setTimeout to trigger the fade-in effect after a short delay
    setTimeout(function () {
      newMessage.style.opacity = '1'; // Set opacity to 1 for fade-in
    }, 100);

    // Reset input field placeholder
    inputField.placeholder = '';


    sendMessageHelper(messageText);

    // Clear the input field
    inputField.value = '';
  }

  // After message is added
  storeChatHistory();
  removeOldMessages();
  scrollToLatestMessage();



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
var chatbubbleGptMessage; // Declare the variable outside the function

function handleIncomingMessage(message) {
  var messagesContainer = document.querySelector('#chatbubble-messages');
  var lastMessageElement = messagesContainer.lastElementChild;

  var chatbubbleGptMessage;
  if (lastMessageElement && lastMessageElement.classList.contains('chatbubble-gpt-message')) {
    chatbubbleGptMessage = lastMessageElement;
  } else {
    chatbubbleGptMessage = document.createElement('div');
    chatbubbleGptMessage.className = 'chatbubble-gpt-message';
    messagesContainer.insertAdjacentElement('beforeend', chatbubbleGptMessage);
  }

  var messageText = document.createElement('p');
  messageText.textContent = message; // Add the plain message text
  chatbubbleGptMessage.appendChild(messageText); // Append messageText to chatbubbleGptMessage before hyperlinking

  hyperlinkText(messageText); // Apply hyperlinking to the message

  var timestamp = document.createElement('div');
  timestamp.classList.add('chatbubble-gpt-message-time');
  timestamp.innerText = getCurrentTimestamp();

  chatbubbleGptMessage.appendChild(timestamp);
  hideLoader(); // Hide the loader
  setTimeout(function () {
    chatbubbleGptMessage.style.opacity = '1'; // Set opacity to 1 for fade-in

  }, 400);

  // Scroll to the latest message after the incoming message is complete
  setTimeout(function () {
    scrollToLatestMessage();
  }, 200);
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
  var inputField = document.getElementById('chatbubble-input-field');
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
}

function getConversationUniqueId() {
  // Get the id from localStorage
  var conversationUniqueId = localStorage.getItem('conversationUniqueId');
  // Get the timestamp from localStorage
  var timestamp = localStorage.getItem('conversationUniqueIdTimestamp');

  if (conversationUniqueId && timestamp) {
    // Get the current time
    var currentTime = new Date().getTime();
    // Calculate the difference in hours
    var hrsDifference = (currentTime - timestamp) / (1000 * 60 * 60);
    if (hrsDifference > 3) {
      // If more than 3 hours, clear the unique ID
      localStorage.removeItem('conversationUniqueId');
      localStorage.removeItem('conversationUniqueIdTimestamp');
      return null;
    } else {
      return conversationUniqueId;
    }
  } else {
    return null;
  }
}

function setConversationUniqueId(uniqueId) {
  // Set the id to localStorage
  localStorage.setItem('conversationUniqueId', uniqueId);
  // Set the current timestamp to localStorage
  localStorage.setItem('conversationUniqueIdTimestamp', new Date().getTime());
}


function get_conversation_id() {
  var conversationUniqueId = getConversationUniqueId();
  return new Promise((resolve, reject) => {
    if (connInitiated == false || !conversationUniqueId) {
      init_payload = {
        shop_id: window.shopId,
        conversation_id: conversationUniqueId,
        metadata: metaData
      }
      socket.emit("init", init_payload);
      // Setup a one-time event listener for the "init_response"
      socket.once("init_response", function (data) {
        connInitiated = true;
        conversationUniqueId = data;
        setConversationUniqueId(conversationUniqueId);
        resolve(conversationUniqueId); // Resolve the promise with the new conversationUniqueId
      });
    } else {
      resolve(conversationUniqueId); // Resolve the promise with the existing conversationUniqueId
    }
  });
}


function send_user_message(user_message) {
  socket.emit("message", user_message);
}


function displayAiResponse(data, details) {
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
    timestamp.innerText = getCurrentTimestamp();
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




function listenForAiResponse(details) {
  socket.on("ai_response", function (data) {
    console.log(data);
    displayAiResponse(data, details);
  });
}


function sendMessageHelper(msg) {
  if (!socket.connected) socket.connect();

  var details = {
    currentMessage: '',
    chunkTimeout: null,
    messageElement: null,
    scrollTimeout: null,
    messageContainer: document.getElementById('chatbubble-messages')
  }
  get_conversation_id()
    .then(conversation_id => {
      var user_message = {
        message: msg,
        conversation_id: conversation_id
      };
      send_user_message(user_message)
      console.log(conversation_id);
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
  listenForAiResponse(details);
}





function decodeHTML(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}



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
        chatbubbleMessage.innerHTML = message.html; // Use the stored HTML as html. This is not a mistake.
        chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);
      } else if (message.className === 'chatbubble-gpt-message') {
        chatbubbleMessage = document.createElement('div');
        chatbubbleMessage.className = 'chatbubble-gpt-message';
        const textNode = document.createTextNode(message.html);
        chatbubbleMessage.appendChild(textNode);
        chatbubbleMessage.setAttribute('data-timestamp', message.timestamp);
        chatbubbleMessage.setAttribute('data-hyperlinked', true);
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


let textArea = document.getElementById("chatbubble-input");

textArea.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';

  // Reset the height to the default value after sending a message
  if (this.style.height === '54px') {
    this.style.height = '54px';
  }
}
