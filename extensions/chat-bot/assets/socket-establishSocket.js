
let socket;

export const establishSocket = () => {
  socket = io(constants.socket_endpoint, {
    transports: ['websocket', 'polling', 'xhr-polling'],
    autoConnect: false,
    "ngrok-skip-browser-warning": "true",
  });
  
  return socket;
};

export { socket }
