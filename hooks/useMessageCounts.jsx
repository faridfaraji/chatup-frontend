import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useMessageCounts = () => {
    const fetch = useAuthenticatedFetch();
    return (since, until) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/messages`
        const queryParams = new URLSearchParams();

        if (since && until) {
            queryParams.append("start_datetime", since.toISOString().slice(0, 19));
            queryParams.append("end_datetime", until.toISOString().slice(0, 19));
        }

        const urlWithParams = queryParams.toString() ? `${fetch_url}?${queryParams.toString()}` : fetch_url;

        return fetch(urlWithParams, {
            method: 'GET',
            credentials: constants.credentials,
            headers: {...constants.headers, ...{'X-Fields': "timestamp"}}
        }).then((response) => response.json())
    }
}