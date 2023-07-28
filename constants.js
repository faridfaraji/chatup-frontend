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
        mars: "$499"
    },
    price_check: {
        paper: "19.00",
        canvas: "49.00",
        steel: "99.00",
        mars: "499.00"
    },
    messages: {
        paper: 50,
        canvas: 200,
        steel: 500,
        mars: 0
    },
    plan_names: {
        paper: "paper",
        canvas: "canvas",
        steel: "steel",
        mars: "mars"
    },
    price_to_messages: {
        "19.00": 50,
        "49.00": 200,
        "99.00": 500,
        "499.00": 0,
    }
}
