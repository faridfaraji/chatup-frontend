import { sendMessage } from "./io.js";

export const sendMessageOnEnter = (event, socket) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    sendMessage(socket);
  }
}
