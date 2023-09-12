import { checkConversationHealth } from "./caching.js";
import { sessionKey } from "./constants.js";
import { retrieveMetadata } from "./io.js";

let connInitiated = false;

export const initSocket = (socket) => {
    return new Promise((resolve) => {
        socket.once("init_response", data => {
            localStorage.setItem(sessionKey.conversation_id, data);
            localStorage.setItem(sessionKey.conversation_id_timestamp, new Date());
            connInitiated = true;
            resolve(data)
        });

        retrieveMetadata()
            .then(metadata => {
                socket.emit("init", {
                    shop_id: window.shopId,
                    conversation_id: checkConversationHealth() ?? null,
                    metadata: metadata,
                })
            });
    })
};

export { connInitiated }
