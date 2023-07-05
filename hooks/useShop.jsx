import cache from "../cache";
import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useShop = () => {
    const fetch = useAuthenticatedFetch();
    return async () => {
        try {
            const fetch_url = `${constants.gateway_url}/database/${constants.app_name}`
            const response = await fetch(fetch_url, {
                method: 'GET',
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                cache.shop = data
                return data
            }
        } catch (error) {
            console.error('Error fetching shop:', error)
        }
    }
}