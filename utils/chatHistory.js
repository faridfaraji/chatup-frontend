import constants from "../constants";
import cache from "../cache";

export async function getChatHistory(fetchFun=fetch) {
    try {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations?shop_id=${cache.shop_identifier}`
        const response = await fetchFun(fetch_url, {
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

export async function getChatMessages(chatId, fetchFun=fetch) {
    if (chatId in cache.messages) {
        return cache.messages[chatId]
    } else {
        try {
            const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations/${chatId}/messages`
            const response = await fetchFun(fetch_url, {
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