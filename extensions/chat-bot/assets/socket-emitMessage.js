import { getConversationUniqueId } from "./caching"
import { socket } from "./socket"

export const emitMessage = (message) => {
    getConversationUniqueId().then((conversation_id) => {
        socket.emit("message", {
            message: message,
            conversation_id: conversation_id
        })
    })
}
