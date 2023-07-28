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
        "[01]": "$19",
        "[02]": "$49",
        "[03]": "$99",
        "[04]": "$499"
    },
    messages: {
        "[01]": 50,
        "[02]": 200,
        "[03]": 500,
        "[04]": 0
    },
    plan_names: {
        "[01]": "paper",
        "[02]": "canvas",
        "[03]": "steel",
        "[04]": "mars"
    },
}
