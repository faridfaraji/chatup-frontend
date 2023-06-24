const {
    VITE_APP_NAME,
    VITE_BACKEND_URL,
    VITE_SHOPIFY_API_KEY
} = import.meta.env

const url_params = new URLSearchParams(location.search)

export default {
    gateway_url: VITE_BACKEND_URL,
    api_version: "v1",
    app_name: VITE_APP_NAME,
    headers: {
        "ngrok-skip-browser-warning": "true"
    },
    credentials: "same-origin",
    api_key: VITE_SHOPIFY_API_KEY,
 }
