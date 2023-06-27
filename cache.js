const url_params = new URLSearchParams(location.search)

export default {
    shop_id: -1,
    latest_scan_id: "",
    host: url_params.get("host"),
    shop_url: url_params.get("shop"),
    negative_keywords: []
}
