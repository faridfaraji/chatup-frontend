import { AlphaCard, Button, Divider, HorizontalStack, Text } from "@shopify/polaris"
import { dateFromUTC, localizeTime } from "../utils"
import { t } from "i18next"

const msgMarkup = (message, index) => {
    const aiMessage = message.message_type === "AI"
    const time = localizeTime(dateFromUTC(message.timestamp))

    return (
        <div key={index} className={`${aiMessage ? "ai" : "human"}-message-container`}>
            {aiMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={`${aiMessage ? "ai" : "human"}-message`}>
                {message.message}
            </div>
            {!aiMessage ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>
    )
}


export const Chat = ({ chat, callback }) => {
    return (
        <AlphaCard>
            {chat.reverse().map((msg, i) => msgMarkup(msg, i))}
            <br />
            <Divider />
            <br />
            <HorizontalStack align="end">
                <Button primary onClick={() => callback()}>{t("ChatHistory.viewSummary")}</Button>
            </HorizontalStack>
        </AlphaCard>
    )
}
