const url_params = new URLSearchParams(location.search)

export default {
    shop_identifier: 0,
    shop: {},
    latest_scan_id: "",
    latest_scan: {},
    host: url_params.get("host"),
    shop_url: url_params.get("shop"),
    negative_keywords: [],
    messages: {},
    chats: {},
}
