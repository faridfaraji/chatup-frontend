import { id_selector } from "../constants";
import { autoResizeTextarea, sendMessageOnEnter } from "../utilities";

export const addTextareaEvents = () => {
  const textarea = document.querySelector(id_selector.input_textarea_id);

  // Typing/sending events
  textarea.addEventListener("input", () => autoResizeTextarea(id_selector.input_textarea_id))
  textarea.addEventListener("keydown", () => sendMessageOnEnter())

  // Touch events
  let touchMoved = false;

  textarea.addEventListener('touchstart', () => { touchMoved = false });
  textarea.addEventListener('touchmove', () => { touchMoved = true });
  textarea.addEventListener('click', (event) => {
    setTimeout(function () {
      if (touchMoved) {
        event.preventDefault();
        touchMoved = false;
      }
    }, 300);
  });
}
