import constants from "../constants"
import { useAuthenticatedFetch } from "."
import cache from "../cache";

export const useShopValidator = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/plans/validate-shop?shop_url=${cache.shop_url}`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

export const useActivePlan = () => {
    const fetch = useAuthenticatedFetch();
    return () => {
        const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/plans/selected`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}

export const usePlanSetter = () => {
    const fetch = useAuthenticatedFetch();
    return (plan, name) => {
        const fetch_url = `${constants.gateway_url}/${constants.api_version}/shopify/${constants.app_name}/plans/select?plan=${plan}&name=${name}`
        return fetch(fetch_url, {
            method: 'GET',
            credentials: constants.credentials,
            headers: constants.headers
        }).then((response) => response.json())
    }
}