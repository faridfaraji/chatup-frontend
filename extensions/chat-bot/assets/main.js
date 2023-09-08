import { addEventListeners } from "./events";
import { establishSocket, initSocket, listenForMessages, validate } from "./io";

validate();
addEventListeners();
establishSocket();
initSocket();
listenForMessages();
