import constants from "./constants"

const url_params = new URLSearchParams(location.search)

export default {
    shop: {},
    latest_scan_id: "",
    latest_scan: {},
    host: url_params.get("host"),
    shop_url: url_params.get("shop"),
    negative_keywords: [],
    messages: {},
    chats: {},
    embed_url: `https://${url_params.get("shop")}/admin/themes/current/editor?context=apps&activateAppId=${constants.ext_id}/${constants.ext_name}`,
    tester: 1
}
