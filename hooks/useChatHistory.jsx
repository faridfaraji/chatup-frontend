import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useChatHistory = () => {
    const fetch = useAuthenticatedFetch();
    return async () => {
        try {
            const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations`
            const response = await fetch(fetch_url, {
                method: 'GET',
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                return data
            }
        } catch (error) {
            console.error('Chat History error:', error)
        }
    }
}