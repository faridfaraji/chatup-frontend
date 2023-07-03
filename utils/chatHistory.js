import constants from "../constants";
import cache from "../cache";

export async function getChatHistory(afetch = fetch) {
    try {
        const fetch_url = constants.gateway_url + "/database/conversations?shop_id=" + cache.shop_identifier
        const response = await afetch(fetch_url, {
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

export async function getChatMessages(chatId, afetch=fetch) {
    if (chatId in cache.messages) {
        return cache.messages[chatId]
    } else {
        try {
            const fetch_url = constants.gateway_url + "/database/conversations/" + chatId + "/messages"
            const response = await afetch(fetch_url, {
                method: "GET",
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                cache.messages[chatId] = data
                return data
            }
        } catch (error) {
            console.error("Error scanning shop:", error)
        }
    }
}