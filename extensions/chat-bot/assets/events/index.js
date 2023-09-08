import { addButtonEvents } from "./addButtonEvents"
import { addTextareaEvents } from "./addTextareaEvents"

export const addEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addButtonEvents()
        addTextareaEvents()
    })
}

export { handleAiMessage } from "./handleAiMessage"
export { handleAdminMessage } from "./handleAdminMessage"
