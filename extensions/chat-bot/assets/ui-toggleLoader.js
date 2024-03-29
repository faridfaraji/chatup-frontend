import { class_selector, id_selector } from "./constants.js";

export const hideLoader = () => {
    var loader = document.querySelector(class_selector.custom_loader_class);
    var sendButton = document.querySelector(id_selector.send_button_id);
    loader.style.scale = '0';
    sendButton.style.scale = '1';
}

export const showLoader = () => {
    var loader = document.querySelector(class_selector.custom_loader_class);
    var sendButton = document.querySelector(id_selector.send_button_id);
    sendButton.style.scale = '0';
    loader.style.scale = '.4';
}
