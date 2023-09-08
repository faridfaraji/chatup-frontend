import { sessionKey } from "../../constants";
import { retrieveMetadata } from "../retreiveMetadata";
import { socket } from "./establishSocket";

function setConversationUniqueId(uniqueId) {

}

const initPayload = async () => {
    return {
        shop_id: window.shopId,
        conversation_id: getConversationUniqueId(),
        metadata: retrieveMetadata()
    }
}

export const initSocket = () => {
    // Setup a one-time event listener for the "init_response"
    socket.once("init_response", data => {
        localStorage.setItem(sessionKey.conversation_id, data);
        localStorage.setItem(sessionKey.conversation_id_timestamp, new Date());
    });

    initPayload().then(data => socket.emit("init", data));
};

