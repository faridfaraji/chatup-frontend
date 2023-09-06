import { AlphaCard, Button, Divider, Form, FormLayout, HorizontalStack, Icon, Link, Page, Text, TextField } from "@shopify/polaris"
import { dateFromUTC, localizeTime } from "../utils"
import { t } from "i18next"
import { useEffect, useState } from "react";
import { CardTitle } from "./CardTitle";
import {
    MobileBackArrowMajor
  } from '@shopify/polaris-icons';


// Define regular expressions to match URLs, emails, and phone numbers
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;

// This function hyperlinks URLs, emails, and phone numbers and removes dots after hyperlinks
function hyperlinkText(messageText) {
  if (messageText !== null) {
    const components = [];
    let remainingText = messageText;

    while (remainingText) {
      // Check for a match with one of the regex patterns
      const markdownLinkMatch = markdownLinkRegex.exec(remainingText);
    //   const emailMatch = emailRegex.exec(remainingText);
    //   const phoneMatch = phoneRegex.exec(remainingText);

        console.log(markdownLinkMatch)
      // Find the earliest match
    //   const earliestMatch = [
    //     markdownLinkMatch,
    //     // emailMatch,
    //     // phoneMatch
    //   ].filter(match => match)
    //     .reduce((a, b) => (a.index < b.index ? a : b), null);

      if (!markdownLinkMatch) {
        // No more matches found, add the remaining text as a Text component
        components.push(<Text key={components.length}>{remainingText}</Text>);
        break;
      }

      // Add the text before the match as a Text component
      if (markdownLinkMatch.index > 0) {
        components.push(<Text key={components.length}>{remainingText.substring(0, markdownLinkMatch.index)}</Text>);
      }

      // Add the matched content as a Link component
      components.push(
        <Link url={`https://${markdownLinkMatch[2]}`} external>
            {markdownLinkMatch[1]}
        </Link>
      );

      // Update the remaining text
      remainingText = remainingText.substring(markdownLinkMatch.index + markdownLinkMatch[0].length);
    }

    return components;
  }
  return messageText
}

const msgMarkup = (message, index) => {
    const adminMessage = message.metadata && message.metadata[0] === "admin"
    const aiMessage = message.message_type === "AI"
    const time = localizeTime(dateFromUTC(message.timestamp))

    const message_digested = hyperlinkText(message.message)

    return (
        <div key={index} className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message-container`}>
            {aiMessage || adminMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message`}>
                {message_digested}
            </div>
            {!(aiMessage || adminMessage) ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>
    )
}

export const LiveChat = ({ chat, summary, sendAdminMessage, forfeit }) => {
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
