import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage"
import { useTranslation } from "react-i18next";

export const ChatMessages = ({ messages, joined }) => {
    const { t } = useTranslation()
    const messagesRef = useRef(null);
    const buttonRef = useRef(null);
    const [flag, setFlag] = useState(false);
    const [justJoined, setJustJoined] = useState(joined)

    const scrollToLatest = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (messagesRef.current) {
            if (justJoined) {
                scrollToLatest()
                setJustJoined(false)
            } else if (2 * messagesRef.current.clientHeight + messagesRef.current.scrollTop < messagesRef.current.scrollHeight) {
                setFlag(true)
            } else {
                scrollToLatest()
            }
        }
    }, [messages]);

    const scrollButton = flag &&
        <button
            className="new-messages-btn"
            ref={buttonRef}
            onClick={() => { scrollToLatest(); setFlag(false) }}>
            {t("ChatHistory.newMessage")}
        </button>


    return (
        <div className="chat-messages" ref={messagesRef} >
            {messages?.map((message, index) => <ChatMessage message={message} index={index} />)}
            {scrollButton}
        </div>
    )
}
