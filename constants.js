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
        "[25]": {price: "$190", duration: "Year"},
        "[40]": {price: "$49", duration: "Month"},
        "[45]": {price: "$490", duration: "Year"},
        "[60]": {price: "$99", duration: "Month"},
        "[65]": {price: "$990", duration: "Year"},
        "[80]": {price: "$499", duration: "Month"},
        "[85]": {price: "$4900", duration: "Year"}
    },
    messages: {
        "[20]": 50,
        "[25]": 50,
        "[40]": 200,
        "[45]": 200,
        "[60]": 500,
        "[65]": 500,
        "[80]": 0,
        "[85]": 0
    },
    plan_images: {
        "[20]": "2-paper",
        "[25]": "2-paper",
        "[40]": "4-canvas",
        "[45]": "4-canvas",
        "[60]": "6-steel",
        "[65]": "6-steel",
        "[80]": "8-moon",
        "[85]": "8-moon"
    }
}



