import cache from "../cache";
import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useMessageHistory = async () => {
    const fetch = useAuthenticatedFetch();
    if (chatId in cache.messages) {
        return cache.messages[chatId]
    } else {
        try {
            const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations/${chatId}/messages`
            const response = await fetch(fetch_url, {
                method: 'GET',
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                cache.messages[chatId] = data
                return data
            }
        } catch (error) {
            console.error('Message History error:', error)
        }
    }
}
