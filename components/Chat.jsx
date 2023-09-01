import { AlphaCard, Button, Divider, Form, FormLayout, HorizontalStack, Icon, Page, Text, TextField } from "@shopify/polaris"
import { dateFromUTC, localizeTime } from "../utils"
import { t } from "i18next"
import { useEffect, useState } from "react";
import { CardTitle } from "./CardTitle";
import {
    MobileBackArrowMajor
  } from '@shopify/polaris-icons';

const msgMarkup = (message, index) => {
    const adminMessage = message.metadata && message.metadata[0] === "admin"
    const aiMessage = message.message_type === "AI"
    const time = localizeTime(dateFromUTC(message.timestamp))

    return (
        <div key={index} className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message-container`}>
            {aiMessage || adminMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message`}>
                {message.message}
            </div>
            {!(aiMessage || adminMessage) ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>
    )
}

export const LiveChat = ({ chat, sendAdminMessage, forfeit }) => {
    useEffect(() => window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    }), [])

    const [value, setValue] = useState('');

    const test = () => {
        console.log(chat)
    }

    const sendMessage = () => {
        var inputField = document.getElementById('chatbubble-input-field');
        const messageText = inputField.value;

        if (messageText !== "") {
            sendAdminMessage(messageText)
            chat.push({
                message_type: "USER",
                metadata: ["admin"],
                message: value,
                timestamp: new Date()
            })
            setValue("")
            inputField.placeholder = ""
            inputField.value = ""
            autoResizeTextArea()
        }
    }

    const autoResizeTextArea = () => {
        var textarea = document.getElementById('chatbubble-input-field');
        textarea.style.height = 'auto'; // Reset height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }

    const handleTextareaChange = (event) => {
        autoResizeTextArea()
        setValue(event.target.value);
    };

    return (
        <AlphaCard>
            <CardTitle linebreak title={summary?.title ?? t("ChatHistory.untitled")} />
            <Divider /><br />
            {chat.map((msg, i) => msgMarkup(msg, i))}
            <br />
            <Divider />
            <br />
            <div id="input-round-box">
                <div id="chatbubble-input">
                    <textarea
                        id="chatbubble-input-field"
                        placeholder="Reply to customer..."
                        onChange={handleTextareaChange}
                        rows="1"></textarea>
                    <button
                        id="chatbubble-send"
                        style={{ height: "90%", width: "10%" }}
                        onClick={() => sendMessage()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512">
                            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                        </svg>
                    </button>
                    <div className="custom-loader"> </div>
                </div>
            </div>
            <Divider />
            <br />
            <HorizontalStack align="end">
                <Button onClick={() => test()}>TEST</Button>
                <Button primary onClick={() => forfeit()}>{t("ChatHistory.forfeit")}</Button>
            </HorizontalStack>
        </AlphaCard>
    )
}

export const Chat = ({ chat, summary, viewSummary, takeOver }) => {
    return (
        <AlphaCard>
                <CardTitle linebreak title={summary?.title ?? t("ChatHistory.untitled")} />
                <Divider /><br />
                {chat.map((msg, i) => msgMarkup(msg, i))}
                <br />
                <Divider />
                <br />
                <HorizontalStack align="end" gap="5">
                    {takeOver && <Button primary onClick={() => takeOver()}>{t("ChatHistory.takeOver")}</Button>}
                    <Button onClick={() => viewSummary()}>{t("ChatHistory.viewSummary")}</Button>
                </HorizontalStack>
        </AlphaCard>
    )
}
