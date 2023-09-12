import { handleAdminPart, handleAdminMessage, handleAiMessage } from "./events.js";
import { hideLoader } from "./ui.js";

let admin_managed = false;

export const listenForMessages = (socket) => {
    socket.on("ai_response", (data) => {handleAiMessage(data);})
    socket.on("admin_response", (data) => {handleAdminMessage(data);})
    socket.on("admin_joined", () => {admin_managed = true; hideLoader(); handleAdminPart("Admin Connected")})
    socket.on("admin_forfeited", () => {admin_managed = false; handleAdminPart("Admin Disconnected")})
}

export { admin_managed }
