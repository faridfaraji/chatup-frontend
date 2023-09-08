import { id_selector } from "../constants";

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



export const scrollToLatestMessage = () => {
  var messagesContainer = document.querySelector(id_selector.messages_div_id);
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

