const {
    VITE_APP_NAME,
    VITE_BACKEND_URL,
    VITE_SHOPIFY_CHAT_BOT_ID,
    VITE_CHAT_BOT_EXT_NAME
} = import.meta.env

export default {
    gateway_url: VITE_BACKEND_URL,
    api_version: "v1",
    app_name: VITE_APP_NAME,
    headers: {
        "ngrok-skip-browser-warning": "true",
        "content-type": "application/json"
    },
    credentials: "same-origin",
    ext_id: VITE_SHOPIFY_CHAT_BOT_ID,
    ext_name: VITE_CHAT_BOT_EXT_NAME,
    prices: {
        paper: "$19",
        canvas: "$49",
        steel: "$99",
        mars: "5¢"
    },
    messages: {
        paper: 50,
        canvas: 200,
        steel: 500,
        mars: 0
    },
    plan_names: {
        paper: "pay",
        canvas: "pay_plus",
        steel: "pay_plus_plus",
        mars: "free"
    }
}
