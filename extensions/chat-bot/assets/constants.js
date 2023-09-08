
export const locations = {
    validation_endpoint: `https://gateway.dev.awesoon.tech/v1/shopify/chatup/plans/validate-shop`,
    // socket_endpoint: "https://chat.dev.awesoon.tech/customer",
    socket_endpoint: "https://39fb-104-142-118-153.ngrok-free.app/customer",
}

export const class_selector = {
    // Class selectors
    custom_loader_class: ".custom-loader",
    message_div_class: ".chatbubble-message",
    timestamp_div_class: ".chatbubble-message-time",
    customer_message_div_class: "chatbubble-customer-message",
    gpt_message_div_class: "chatbubble-gpt-message",
    admin_message_div_class: "chatbubble-admin-message",
}

export const id_selector = {
    // ID selectors
    chat_div_id: "#chatbubble-window",
    open_chat_button_id: "#chatbubble-button",
    header_msg_container_div_id: "#message-container",
    header_msg_div_id: "#message",
    close_chat_button_id: "#chatbubble-close",
    messages_div_id: "#chatbubble-messages",
    input_div_id: "#chatbubble-input",
    input_textarea_id: "#chatbubble-input-field",
    send_button_id: "#chatbubble-send",
}

export const sessionKey = {
    chat_history: "chatHistory",
    conversation_id: "conversationUniqueId",
    conversation_id_timestamp: "conversationUniqueIdTimestamp",
}
