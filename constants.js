const {
    VITE_APP_NAME,
    VITE_BACKEND_URL
} = import.meta.env

export default {
    gateway_url: VITE_BACKEND_URL,
    api_version: "v1",
    app_name: VITE_APP_NAME,
    headers: {
        "ngrok-skip-browser-warning": "true"
    },
    credentials: "same-origin",
    shop_id: -1
}
