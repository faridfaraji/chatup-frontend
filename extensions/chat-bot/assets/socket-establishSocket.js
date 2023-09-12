import { locations } from "./constants.js"

let socket;

export const establishSocket = () => {
  socket = io(locations.socket_endpoint, {
    transports: ['websocket', 'polling', 'xhr-polling'],
    autoConnect: false,
    "ngrok-skip-browser-warning": "true",
  });
  
  return socket;
};
