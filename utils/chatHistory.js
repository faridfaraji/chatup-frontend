import constants from "../constants";
import cache from "../cache";

export async function getChatHistory() {
    try {
        const fetch_url = constants.gateway_url + "/database/conversations?shop_id=" + cache.shop_identifier
        const response = await fetch(fetch_url, {
            method: "GET",
            credentials: constants.credentials,
            headers: constants.headers
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Error scanning shop:", error)
    }
}

export async function getChatMessages(conversationId) {
    try {
        const fetch_url = constants.gateway_url + "/database/conversations/" + conversationId + "/messages"
        const response = await fetch(fetch_url, {
            method: "GET",
            credentials: constants.credentials,
            headers: constants.headers
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Error scanning shop:", error)
    }
}