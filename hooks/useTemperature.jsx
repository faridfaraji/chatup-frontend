import constants from "../constants"
import { useAuthenticatedFetch } from ".";

export const useTemperature = () => {
    const fetch = useAuthenticatedFetch();
    const fetch_url = `${constants.gateway_url}/database/${constants.app_name}/bot-temperature`
    return (bot_temperature) => {
        const payload = {bot_temperature: parseFloat(bot_temperature)}
        return fetch(fetch_url, {
            method: "PUT",
            credentials: constants.credentials,
            headers: constants.headers,
            body: JSON.stringify(payload)
        }).then((response) => response.json())
    }
}
