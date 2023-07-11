import constants from "../constants"
import { useAuthenticatedFetch } from "."

export const useActivePlan = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/plans/selected`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}