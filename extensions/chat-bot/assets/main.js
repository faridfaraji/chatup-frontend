import { addEventListeners } from "./events.js";
import { establishSocket, initSocket, listenForMessages, validate } from "./io.js";

validate();
addEventListeners();
establishSocket();
initSocket();
listenForMessages();
