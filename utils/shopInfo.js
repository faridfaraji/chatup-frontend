import constants from "../constants"

export async function getShopId() {
    try {
        const fetch_url = constants.gateway_url + "/" +
            constants.api_version + "/shopify/" +
            constants.app_name + "/shop-info?shop=" +
            constants.shop_url
        const response = await fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            constants.shop_id = data.shop_id
        }
    } catch (error) {
        console.error('Error fetching shop id:', error)
    }
}