import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useChatsFetch = () => {
    const fetch = useAuthenticatedFetch();
    return (since, until) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/conversations`
        const queryParams = new URLSearchParams();

        if (since && until) {
            queryParams.append("start_datetime", since.toISOString().slice(0, 19));
            queryParams.append("end_datetime", until.toISOString().slice(0, 19));
        }

        const urlWithParams = queryParams.toString() ? `${fetch_url}?${queryParams.toString()}` : fetch_url;

        return fetch(urlWithParams, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}
