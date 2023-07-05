import cache from "../cache";
import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useLatestScan = (id) => {
    const scan_id = cache.shop.latest_scan_id !== "" ? cache.shop.latest_scan_id : id
    const fetch = useAuthenticatedFetch();
    return async () => {
        try {
            const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/scans/${scan_id}`
            const response = await fetch(fetch_url, {
                method: 'GET',
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                cache.latest_scan = data
                return data
            }
        } catch (error) {
            console.error('Scan error:', error)
        }
    }
}

export const useScanner = () => {
    const fetch = useAuthenticatedFetch();
    return async () => {
        try {
            const fetch_url = `${constants.gateway_url}/shops/${constants.app_name}/compute`
            const response = await fetch(fetch_url, {
                method: "POST",
                credentials: constants.credentials,
                headers: constants.headers
            })
            if (response.ok) {
                const data = await response.json()
                cache.latest_scan_id = data
                return data
            }
        } catch (error) {
            console.error("Error scanning shop:", error)
        }
    }
}

