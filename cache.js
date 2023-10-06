import constants from "./constants"

const url_params = new URLSearchParams(location.search)

export default {
    shop_url: url_params.get("shop"),
    https_shop_url: `https://${url_params.get("shop")}`,
    embed_url: `https://${url_params.get("shop")}/admin/themes/current/editor?context=apps&activateAppId=${constants.ext_id}/${constants.ext_name}`,
}
