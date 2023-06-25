import constants from "../constants";
import cache from "../cache";

export async function scanShop() {
    try {
        const fetch_url = constants.gateway_url + "/shops/shops/" + cache.shop_id + "/compute"
            const response = await fetch(fetch_url, {
                method: "POST",
                credentials: constants.credentials,
                headers: constants.headers
            })
            if(response.ok) {
                // Handle
            }
    } catch (error) {
        console.error("Error scanning shop:", error)
    }
}