import { initSocket } from "./io/socket/initSocket";
import { validate } from "./io/validate";
import { addEventListeners } from "./events";
import { establishSocket } from "./io/socket/establishSocket";
import { listenForMessages } from "./io/socket/listenForMessages";

validate()
addEventListeners()
establishSocket();
initSocket();
listenForMessages();
