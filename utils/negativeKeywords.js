import constants from "../constants"
import cache from "../cache"

export async function getNegativeKeywords(fetchFun=fetch) {
    try {
        const fetch_url = constants.gateway_url + "/database/shops/" +
            cache.shop_identifier + "/negative-keywords"
        const response = await fetchFun(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        })
        if(response.ok) {
            const data = await response.json()
            return data
        } else {
            return []
        }
    } catch (error) {
        console.error('Error fetching negative keywords:', error)
    }
}

export async function changeNegativeKeywords(method, tag, fetchFun=fetch) {
    try {
        const fetch_url = constants.gateway_url + "/database/shops/" +
            cache.shop_identifier + `/negative-keywords/${tag}`
        const response = await fetchFun(fetch_url, {
            method: method,
            credentials: constants.credentials,
            headers: constants.headers
        })
        return response
    } catch (error) {
        // We'll handle the error back home
        return error
    }
}
