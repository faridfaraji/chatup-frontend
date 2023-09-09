import { checkConversationHealth } from "./caching.js"
import { sessionKey } from "./constants.js"
import { initSocket, connInitiated } from "./socket.js"

export const emitMessage = (message, socket) => {
    socket.connected || socket.connect()

    const uuid = localStorage.getItem(sessionKey.conversation_id)
    const health = checkConversationHealth()

    if (!(uuid && health && connInitiated)) {
        initSocket(socket).then(conversation_id => {
            socket.emit("message", {
                message: message,
                conversation_id: conversation_id
            })
        })
    } else {
        socket.emit("message", {
            message: message,
            conversation_id: uuid
        })
    }
}
