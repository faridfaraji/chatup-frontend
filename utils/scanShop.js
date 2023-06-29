import constants from "../constants";
import cache from "../cache";
export async function scanShop() {
    try {
        const fetch_url = constants.gateway_url + "/shops/shops/" + cache.shop_identifier + "/compute"
            const response = await fetch(fetch_url, {
                method: "POST",
                credentials: constants.credentials,
                headers: constants.headers
            })
            if(response.ok) {
                cache.latest_scan_id = await response.json()
            }
    } catch (error) {
        console.error("Error scanning shop:", error)
    }
}