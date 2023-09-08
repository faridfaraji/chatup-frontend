import { sessionKey } from "../constants";
import { initSocket } from "../io";

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
  
  
