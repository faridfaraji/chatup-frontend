import constants from "../constants";


export function showLoader() {
    var loader = document.querySelector(constants.custom_loader_class);
    var sendButton = document.querySelector(constants.send_button_id);
    sendButton.style.scale = '0';
    loader.style.scale = '.4';

}

export function hideLoader() {
    var loader = document.querySelector(constants.custom_loader_class);
    var sendButton = document.querySelector(constants.send_button_id);
    loader.style.scale = '0';
    sendButton.style.scale = '1';
}
