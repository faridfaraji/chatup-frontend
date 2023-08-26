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
        "[20]": {price: "$19", duration: "Month"},
        "[25]": {price: "$205", duration: "Year"},
        "[40]": {price: "$49", duration: "Month"},
        "[45]": {price: "$500", duration: "Year"},
        "[60]": {price: "$99", duration: "Month"},
        "[65]": {price: "$950", duration: "Year"},
        "[80]": {price: "$499", duration: "Month"},
        "[85]": {price: "$4490", duration: "Year"}
    },
    messages: {
        "[2": 50,
        "[4": 200,
        "[6": 500,
        "[8": 0
    },
    plan_images: {
        "[2": "2-paper",
        "[4": "4-canvas",
        "[6": "6-steel",
        "[8": "8-moon"
    },
    base_plan: "[20]",
    base_plan_copy_id: "[2"
}



