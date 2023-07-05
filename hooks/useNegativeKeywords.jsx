import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useNegativeKeywordGetter = () => {
    const fetch = useAuthenticatedFetch();
    const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/negative-keywords`

    return async () => {
        try {
            const response = await fetch(fetch_url, {
                method: "GET",
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                return data
            }
        } catch (error) {
            console.error('Get Negative Keyword error :', error)
        }
    }
}

export const useNegativeKeywordSetter = (method) => {
    const fetch = useAuthenticatedFetch();

    return async (tag) => {
        const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/negative-keywords/${tag}`
        try {
            return await fetch(fetch_url, {
                method: method,
                credentials: constants.credentials,
                headers: constants.headers
            })
        } catch (error) {
            console.error('Set Negative Keyword error :', error)
        }
    }
}
