import io from 'socket.io-client';
import constants from '../constants';

let socket;

export const useSocketInitializer = async (onLiveMessageReceived, onLiveChats, onOffChats, sessionTokenPromise) => {
  const sessionToken = await sessionTokenPromise;
  console.log('sessionToken', sessionToken);
  socket = io.connect(`${constants.chat_url}/admin`, {
    extraHeaders: {
        Authorization: `Bearer ${sessionToken}`
    }
  });
  // Set up the event listener for 'live_message' event
  socket.on('customer_response', (data) => {
    onLiveMessageReceived(data);
  });

  socket.on('live_conversations', (data) => {
    onLiveChats(data);
    console.log('live_conversations', data);
  });
  socket.on('off_conversations', (data) => {
    onOffChats(data);
    console.log('off_conversations', data);
  });

  return socket;
}

export const useDisconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
}