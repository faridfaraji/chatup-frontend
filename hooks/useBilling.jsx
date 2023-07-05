import constants from "../constants"
import { useAuthenticatedFetch } from "."

export const useBilling = () => {
    const fetch = useAuthenticatedFetch();
    return async () => {
        try {
            const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/confirm-billing`
            const response = await fetch(fetch_url, {
                method: 'GET',
                credentials: constants.credentials,
                headers: constants.headers
            })

            if (response.ok) {
                const data = await response.json()
                if (data.redirect_url) {
                    return data
                }
            }
        } catch (error) {
            console.error("Error fetching billing:", error)
        }
    }
}