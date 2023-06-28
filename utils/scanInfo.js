import constants from "../constants"
import cache from "../cache"

export async function getScanInfo() {
    try {
        const fetch_url = constants.gateway_url + "/database/scans/" + cache.latest_scan_id
        const response = await fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            cache.latest_scan = data
        }
    } catch (error) {
        console.error('Error fetching shop id:', error)
    }
}
