import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useNegativeKeywordGetter = () => {
    const fetch = useAuthenticatedFetch();
    const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/negative-keywords`
    return () => {
        return fetch(fetch_url, {
            method: "GET",
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

export const useNegativeKeywordSetter = (method) => {
    const fetch = useAuthenticatedFetch();

    return (tag) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/negative-keywords/${tag}`
        return fetch(fetch_url, {
            method: method,
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}
