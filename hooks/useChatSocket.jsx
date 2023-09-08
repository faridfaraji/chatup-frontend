import io from 'socket.io-client';
import constants from '../constants';

let socket;

export const useSocketInitializer = async (handleLiveChats, handleOffChats, sessionTokenPromise) => {
  const sessionToken = await sessionTokenPromise;

  socket = io.connect(`${constants.chat_url}/admin`, {
    extraHeaders: {
        Authorization: `Bearer ${sessionToken}`,
        "ngrok-skip-browser-warning": "true",
    }
  });

  socket.on('live_conversations', (data) => { handleLiveChats(data) });
  socket.on('off_conversations', (data) => { handleOffChats(data) });

  return socket;
}

export const useDisconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
}