import { id_selector, locations } from "./constants";

let validationInterval; // Store the interval ID

const fetchValidation = (validation_url) => {
  fetch(validation_url, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        clearInterval(validationInterval); // Stop the interval when validation succeeds
        return response.json();
      } else {
        return false;
      }
    })
    .then((data) => {
      if (data && !data.disable) {
        const validChatBubble = document.querySelector(id_selector.open_chat_button_id);
        validChatBubble.classList.remove('deactive');
      }
    })
    .catch((error) => {
      console.error('Error fetching validation:', error);
    });
};

const beginValidation = () => {
  const fetch_url = locations.validation_endpoint;
  const shop_url = window.Shopify.shop;
  const queryParams = new URLSearchParams();
  queryParams.append("shop_url", shop_url);
  const validation_url = queryParams.toString()
    ? `${fetch_url}?${queryParams.toString()}`
    : fetch_url;

  // Start the validation interval
  validationInterval = setInterval(() => {
    fetchValidation(validation_url);
  }, 30 * 1000);

  // Initial validation attempt
  fetchValidation(validation_url);
};

export const validate = () => {
  document.addEventListener("DOMContentLoaded", () => {
    beginValidation()
  })
}
