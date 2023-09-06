import { AlphaCard, Button, Divider, HorizontalStack } from "@shopify/polaris"
import { t } from "i18next"
import { useState } from "react";
import { CardTitle } from "./CardTitle";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const Chat = ({ chat, summary, viewSummary, handleJoin, sendAdminMessage, handleLeave, isLive }) => {
    const [joined, setJoined] = useState(false)

    const joinChat = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
        setJoined(true)
        handleJoin()
    }

    const handleSend = (messageText) => {
        sendAdminMessage(messageText)
        chat.push({
            message_type: "USER",
            metadata: ["admin"],
            message: messageText,
            timestamp: new Date()
        })
    }

    const leaveChat = () => {
        setJoined(false)
        handleLeave()
    }

    return (
        <AlphaCard>
            <CardTitle linebreak title={summary?.title ?? t("ChatHistory.untitled")} />
            <Divider /><br />
            <ChatMessages chat={chat} />
            <br />
            <Divider />
            <br />
            {
                joined &&
                <div>
                    <ChatInput id="chatbubble-input-field" chat={chat} handleSend={handleSend} />
                    <Divider />
                    <br />
                </div>
            }
            <HorizontalStack align="end" gap="5">
                {isLive && joined &&
                    <Button primary onClick={() => leaveChat()}>{t("ChatHistory.leaveChat")}</Button>}
                {isLive && !joined &&
                    <Button primary onClick={() => joinChat()}>{t("ChatHistory.joinChat")}</Button>}
                {!joined &&
                    <Button onClick={() => viewSummary()}>{t("ChatHistory.viewSummary")}</Button>}
            </HorizontalStack>
        </AlphaCard>
    )
}
