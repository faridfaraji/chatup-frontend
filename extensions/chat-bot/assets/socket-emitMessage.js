import { getConversationUniqueId } from "./caching.js"
import { socket } from "./socket.js"

export const emitMessage = (message) => {
    getConversationUniqueId().then((conversation_id) => {
        socket.emit("message", {
            message: message,
            conversation_id: conversation_id
        })
    })
}
