import constants from "../constants"
import cache from "../cache"

export async function getShopInfo() {
    try {
        const fetch_url = constants.gateway_url + "/" +
            constants.api_version + "/shopify/" +
            constants.app_name + "/shop-info?shop=" +
            cache.shop_url
        const response = await fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            cache.shop = data
            cache.shop_identifier = data.shop_identifier
            cache.latest_scan_id = data.latest_scan_id
        }
    } catch (error) {
        console.error('Error fetching shop id:', error)
    }
}
