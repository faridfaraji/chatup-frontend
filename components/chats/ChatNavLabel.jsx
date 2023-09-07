import { VerticalStack } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import { ChatMetadata } from "./ChatMetadata";

export const ChatNavLabel = ({ chat, isLive }) => {
    const { t } = useTranslation();

    const satisfaction = chat?.conversation_summary?.satisfaction
    const sentiment = typeof satisfaction === 'string' ? satisfaction.toLowerCase() : "neutral"
    const chatClass = `chat ${isLive ? "live" : sentiment}-chat`

    const message_count = (chat?.user_message_count ?? 0) + (chat?.ai_message_count ?? 0)
    const chatTitle = chat?.conversation_summary?.title ?? `${message_count} ${t("Insights.messages")}`

    const chatMetadata = <ChatMetadata metadata={chat?.metadata} />

    return (
        <div className={chatClass}>
            <VerticalStack gap="1">
                {chatTitle}
                {isLive && chatMetadata}
            </VerticalStack>
            <div className="nav-timestamp">
                {chat.time}
            </div>
        </div>
    )
}
