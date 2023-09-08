import { id_selector } from "../constants";
import { hideLoader } from "../ui";

const handleInputTimeout = (inputSelectors, timeout, onTimeout) => {
  const { textareaSelector, buttonSelector } = inputSelectors;

  const textarea = document.querySelector(textareaSelector);
  const button = document.querySelector(buttonSelector);

  textarea?.disabled = true;
  button?.disabled = true;

  clearTimeout(handleInputTimeout.timeout);

  handleInputTimeout.timeout = setTimeout(() => {
    textarea?.disabled = false;
    button?.disabled = false;

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
