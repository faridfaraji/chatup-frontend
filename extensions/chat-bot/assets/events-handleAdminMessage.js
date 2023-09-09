import { addMessage, createAdminMessage } from "./ui.js"

export const handleAdminMessage = (message) => {
    if(!message || message === "") return null
    const adminMessage = createAdminMessage(message)
    addMessage(adminMessage)
}
