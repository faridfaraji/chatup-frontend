import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useShop = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}