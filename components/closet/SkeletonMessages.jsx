import { SkeletonBodyText } from "@shopify/polaris"

export const SkeletonMessage = () => {
    const adminMessage = message.metadata && message.metadata[0] === "admin"
    const aiMessage = message.message_type === "AI"
    const time = message.timestamp ? localizeTime(dateFromUTC(message.timestamp)) : localizeTime(new Date())

    const containerClass = `message-container ${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message-container`
    const messageClass = `${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message`
    const message_digested = hyperlinkText(message.message)

    const messageDiv = adminMessage && message.message === "Admin Connected" ?
        <div className="admin-connected-message">
            <div className="admin-connected-divider" />
            <div className="admin-connected-text">{t("ChatHistory.adminConnected")}</div>
        </div> :
        <div className={containerClass}>
            {aiMessage || adminMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={messageClass}>
                <p>
                    {message_digested}
                </p>
            </div>
            {!(aiMessage || adminMessage) ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>

    return messageDiv
}

export const SkeletonMessages = (props) => {
    const skList = []
    for (var i = 0; i < props.messages; i++) {
        skList.push(<SkeletonMessage key={Math.random()} lines={Math.ceil(Math.random() * 3)} side={i} />)
    }
    // return skList

    // return <div className="chat-messages" ref={messagesRef} >
    //         {messages?.map((message, index) => <ChatMessage message={message} index={index} />)}
    //         {scrollButton}
    //     </div>
}
