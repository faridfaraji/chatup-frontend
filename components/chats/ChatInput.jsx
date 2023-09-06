import { useState } from "react";
import { useTranslation } from "react-i18next";

const svgPath = "M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"

export const autoResizeTextarea = (elementId) => {
    var textarea = document.getElementById(elementId);
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
}

export const ChatInput = ({ id, chat, handleSend }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const sendMessage = () => {
        var inputField = document.getElementById(id);
        const messageText = inputField.value;

        if (messageText !== "") {
            handleSend(messageText)
            setValue("")
            inputField.placeholder = ""
            inputField.value = ""
            autoResizeTextarea(id)
        }
    }

    const handleTextareaChange = (event) => {
        autoResizeTextarea(id)
        setValue(event.target.value);
    };

    return (
        <div className="input-round-box">
            <div className="chatbubble-input">
                <textarea
                    id={id}
                    placeholder={t("ChatHistory.reply")}
                    onChange={handleTextareaChange}
                    rows="1"></textarea>
                <button
                    id={`${id}-button`}
                    className="chatbubble-send"
                    style={{ height: "90%", width: "10%" }}
                    onClick={sendMessage}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512">
                        <path d={svgPath} />
                    </svg>
                </button>
                <div className="custom-loader"> </div>
            </div>
        </div>
    )
}