import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useTimezone = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/shops/${constants.app_name}/timezone`
        return fetch(fetch_url, {
            method: "GET",
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

