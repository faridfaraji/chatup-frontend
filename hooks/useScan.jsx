import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useLatestScan = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/scans/latest`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

export const useScanner = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/shops/${constants.app_name}/compute`
        return fetch(fetch_url, {
            method: "POST",
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

