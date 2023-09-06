import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useChatFetch = () => {
    const fetch = useAuthenticatedFetch();
    return (id) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations/${id}`

        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}