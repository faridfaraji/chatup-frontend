import constants from "../constants"

export async function getNegativeKeywords() {
    try {
        const fetch_url = constants.gateway_url + "/database/" +
            constants.api_version + "/shops/" +
            constants.shop_id + "/negative-keywords"
        const response = await fetch(fetch_url, {
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

export async function changeNegativeKeywords(method, tag) {
    try {
        const fetch_url = constants.gateway_url + "/database/" +
            constants.api_version + "/shops/" +
            constants.shop_id + `/negative-keywords/${tag}`
        const response = await fetch(fetch_url, {
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
