import { sessionKey } from "./constants.js";

export const checkConversationHealth = () => {
  const timestamp = localStorage.getItem(sessionKey.conversation_id_timestamp);
  const timestampHealthy = timestamp && new Date() - new Date(timestamp) < 3 * 60 * 60 * 1000
  if (!timestampHealthy) {
    localStorage.removeItem(sessionKey.conversation_id)
    localStorage.removeItem(sessionKey.conversation_id_timestamp)
  }
  return localStorage.getItem(sessionKey.conversation_id)
}
