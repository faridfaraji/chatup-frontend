import { getConversationUniqueId } from "../../caching/getConversationUniqueId"
import { socket } from "./establishSocket"

export const emitMessage = (message) => {
    getConversationUniqueId().then((conversation_id) => {
        socket.emit("message", {
            message: message,
            conversation_id: conversation_id
        })
    })
}

