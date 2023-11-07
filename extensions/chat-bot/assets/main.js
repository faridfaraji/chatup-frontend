import { addEventListeners } from "./events.js";
import { validate } from "./io.js";
import { establishSocket, listenForMessages } from "./socket.js";

// validate();
const socket = establishSocket();
addEventListeners(socket);
listenForMessages(socket);
