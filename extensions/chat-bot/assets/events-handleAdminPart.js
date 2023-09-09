import { createAdminPartMessage, addMessage } from "./ui.js"

export const handleAdminPart = (message) => {
    const partMessage = createAdminPartMessage(message)
    addMessage(partMessage)
}