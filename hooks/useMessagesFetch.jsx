import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useMessagesFetch = () => {
    const fetch = useAuthenticatedFetch();

    return async (chatId) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations/${chatId}/messages`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}
