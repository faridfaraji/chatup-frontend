import { addButtonEvents } from "./events-addButtonEvents.js"
import { addTextareaEvents } from "./events-addTextareaEvents.js"

export const addEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addButtonEvents()
        addTextareaEvents()
    })
}

export { handleAiMessage } from "./events-handleAiMessage.js"
export { handleAdminMessage } from "./events-handleAdminMessage.js"
export { aiTimeout } from "./events-handleInputTimeout.js"
