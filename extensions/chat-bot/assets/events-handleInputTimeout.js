import { storeChatHistory } from "./caching.js";
import { id_selector } from "./constants.js";
import { hideLoader } from "./ui.js";

const handleInputTimeout = (inputSelectors, timeout, onTimeout) => {
  const { textareaSelector, buttonSelector } = inputSelectors;

  const textarea = document.querySelector(textareaSelector);
  const button = document.querySelector(buttonSelector);

  textarea?.setAttribute("disabled", "disabled")
  button?.setAttribute("disabled", "disabled")

  clearTimeout(handleInputTimeout.timeout);

  handleInputTimeout.timeout = setTimeout(() => {
    textarea?.removeAttribute("disabled")
    button?.removeAttribute("disabled")

    if (typeof onTimeout === "function") {
      onTimeout();
    }
  }, timeout);
};

export const aiTimeout = () => {
  handleInputTimeout(
    {
      textareaSelector: id_selector.input_textarea_id,
      buttonSelector: id_selector.send_button_id,
    },
    1000,
    () => {
      storeChatHistory();
      hideLoader();
    }
  );
}
