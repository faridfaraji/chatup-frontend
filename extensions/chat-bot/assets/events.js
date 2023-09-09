import { addButtonEvents } from "./events-addButtonEvents.js"
import { addTextareaEvents } from "./events-addTextareaEvents.js"

export const addEventListeners = (socket) => {
    document.addEventListener("DOMContentLoaded", () => {
        addButtonEvents(socket)
        addTextareaEvents(socket)
    })
}

export { handleAiMessage } from "./events-handleAiMessage.js"
export { handleAdminMessage } from "./events-handleAdminMessage.js"
export { handleAdminPart } from "./events-handleAdminPart.js"
export { aiTimeout } from "./events-handleInputTimeout.js"
