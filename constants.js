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
    ext_name: VITE_CHAT_BOT_EXT_NAME
}
