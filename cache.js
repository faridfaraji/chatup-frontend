import constants from "./constants"

const url_params = new URLSearchParams(location.search)

export default {
    messages: {},
    chats: {},
    embed_url: `https://${url_params.get("shop")}/admin/themes/current/editor?context=apps&activateAppId=${constants.ext_id}/${constants.ext_name}`,
}
