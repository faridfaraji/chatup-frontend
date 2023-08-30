import { AlphaCard, Button, Divider, Form, FormLayout, HorizontalStack, Icon, Text, TextField } from "@shopify/polaris"
import { dateFromUTC, localizeTime } from "../utils"
import { t } from "i18next"
import { SendMajor } from '@shopify/polaris-icons';
import { useState } from "react";

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


export const LiveChat = ({ chat, socket, forfeit }) => {
    const [value, setValue] = useState('');
    const handleValueChange = (newValue) => { setValue(newValue) };

    const sendMessage = async (message) => {
        // send the admin message through the socket
        console.log(message)
        setValue('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(value)
    }

    return (
        <AlphaCard>
            {chat.map((msg, i) => msgMarkup(msg, i))}
            <br />
            <Divider />
            <br />
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <TextField
                        value={value}
                        onChange={handleValueChange}
                        label="label"
                        connectedRight={
                            <Button submit>
                                <Icon
                                    source={SendMajor}
                                    color="base"
                                />
                            </Button>
                        }
                    />
                </FormLayout>
            </Form>
            <Divider />
            <br />
            <HorizontalStack align="end">
                <Button primary onClick={() => forfeit()}>{t("ChatHistory.forfeit")}</Button>
            </HorizontalStack>
        </AlphaCard>
    )
}

export const Chat = ({ chat, viewSummary, takeOver }) => {
    return (
        <AlphaCard>
            {chat.map((msg, i) => msgMarkup(msg, i))}
            <br />
            <Divider />
            <br />
            <HorizontalStack align="end" gap="5">
                <Button primary onClick={() => takeOver()}>{t("ChatHistory.takeOver")}</Button>
                <Button primary onClick={() => viewSummary()}>{t("ChatHistory.viewSummary")}</Button>
            </HorizontalStack>
        </AlphaCard>
    )
}
