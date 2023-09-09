import { sessionKey } from "./constants.js";

export const checkConversationHealth = () => {
  const timestamp = localStorage.getItem(sessionKey.conversation_id_timestamp);
  return timestamp && new Date() - new Date(timestamp) < 3 * 60 * 60 * 1000
}
