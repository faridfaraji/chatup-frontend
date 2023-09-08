import { sessionKey } from "./constants.js";
import { initSocket } from "./socket.js";

export const getConversationUniqueId = async () => {
    var timestamp = localStorage.getItem(sessionKey.conversation_id_timestamp);
  
    if (timestamp) {
      var currentTime = new Date();
      var hrsDifference = (currentTime - timestamp) / (1000 * 60 * 60);
      if (hrsDifference > 3) {
        initSocket()
      }
    }

    return localStorage.getItem(sessionKey.conversation_id)
  }
  
  
