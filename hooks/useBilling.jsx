import constants from "../constants"
import { useAuthenticatedFetch } from "."

export const useBilling = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/confirm-billing`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}