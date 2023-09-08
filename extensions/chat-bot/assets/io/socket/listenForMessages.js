import { handleAdminMessage, handleAiMessage } from "../../events";
import { hideLoader } from "../../ui";

let admin_managed = false;

export const listenForMessages = () => {
    socket.on("ai_response", (data) => {handleAiMessage(data);})
    socket.on("admin_response", (data) => {handleAdminMessage(data);})
    socket.on("admin_joined", (data) => {admin_managed = true; hideLoader();})
    socket.on("admin_forfeited", (data) => {admin_managed = false;})
}

export { admin_managed }
