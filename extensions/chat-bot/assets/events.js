import { addButtonEvents } from "./events-addButtonEvents"
import { addTextareaEvents } from "./events-addTextareaEvents"

export const addEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addButtonEvents()
        addTextareaEvents()
    })
}

export { handleAiMessage } from "./events-handleAiMessage"
export { handleAdminMessage } from "./events-handleAdminMessage"
export { aiTimeout } from "./events-handleInputTimeout"
