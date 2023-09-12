import { checkConversationHealth } from "./caching.js"
import { initSocket, connInitiated } from "./socket.js"

export const emitMessage = (message, socket) => {
    socket.connected || socket.connect()
    const uuid = checkConversationHealth()

    if (uuid && connInitiated) {
        socket.emit("message", {
            message: message,
            conversation_id: uuid
        })
    } else {
        initSocket(socket).then(conversation_id => {
            socket.emit("message", {
                message: message,
                conversation_id: conversation_id
            })
        })
    }
}
