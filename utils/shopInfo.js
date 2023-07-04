import constants from "../constants"
import cache from "../cache"

export async function getShopId(fetchFun=fetch) {
    try {
        const fetch_url = constants.gateway_url + "/" +
            constants.api_version + "/shopify/" +
            constants.app_name + "/shop-info?shop=" +
            cache.shop_url
        const response = await fetchFun(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            cache.shop_identifier = data
            return data
        }
    } catch (error) {
        console.error('Error fetching shop id:', error)
    }
}

export async function getShopInfo(id, fetchFun=fetch) {
    const shop_id = cache.shop_identifier ? cache.shop_identifier : id
    try {
        const fetch_url = constants.gateway_url + "/database/shops/" + shop_id
        const response = await fetchFun(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            cache.shop = data
            return data
        }
    } catch (error) {
        console.error('Error fetching shop info:', error)
    }
}

export async function getScanInfo(id, fetchFun=fetch) {
    const scan_id = cache.shop.latest_scan_id !== "" ? cache.shop.latest_scan_id : id 
    try {
        const fetch_url = constants.gateway_url + "/database/scans/" + scan_id
        const response = await fetchFun(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            cache.latest_scan = data
            return data
        }
    } catch (error) {
        console.error('Error fetching scan info:', error)
    }
}
