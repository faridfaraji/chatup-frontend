import constants from "../constants"
import cache from "../cache"

export async function getShopId() {
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
            cache.shop_identifier = await response.json()
        }
    } catch (error) {
        console.error('Error fetching shop id:', error)
    }
}

export async function getShopInfo() {
    try {
        const fetch_url = constants.gateway_url + "/database/shops/" + cache.shop_identifier
        const response = await fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            cache.shop = await response.json()
        }
    } catch (error) {
        console.error('Error fetching shop info:', error)
    }
}

export async function getScanInfo() {
    try {
        const fetch_url = constants.gateway_url + "/database/scans/" + cache.latest_scan_id
        const response = await fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            cache.latest_scan = await response.json()
        }
    } catch (error) {
        console.error('Error fetching scan info:', error)
    }
}
