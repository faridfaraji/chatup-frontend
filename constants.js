const {
    VITE_APP_NAME,
    VITE_BACKEND_URL,
    VITE_CHAT_URL,
    VITE_SHOPIFY_CHAT_BOT_ID,
    VITE_CHAT_BOT_EXT_NAME
} = import.meta.env

export default {
    gateway_url: VITE_BACKEND_URL,
    chat_url: VITE_CHAT_URL,
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
    base_plan_copy_id: "[2",
    robot_src: "https://cdn.shopify.com/s/files/1/0789/8870/6084/files/robot.svg",
    "emerging_src": "https://cdn.shopify.com/s/files/1/0789/8870/6084/files/2-paper.svg",
    "established_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/4-canvas.svg",
    "expanding_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/6-steel.svg",
    "enterprise_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/8-moon.svg",
    "2-paper_src": "https://cdn.shopify.com/s/files/1/0789/8870/6084/files/2-paper.svg",
    "4-canvas_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/4-canvas.svg",
    "6-steel_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/6-steel.svg",
    "8-moon_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/8-moon.svg",
    "onboard-step1_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/2-paper.svg",
    "onboard-step2_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/4-canvas.svg",
    // "onboard-step3_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/6-steel.svg",
    "onboard-step3_src":"https://cdn.shopify.com/s/files/1/0789/8870/6084/files/8-moon.svg",
}



