import { ChatMessage } from "./ChatMessage"

export const ChatMessages = ({ chat }) => {
    
    return (
        <div>
            {chat.map((message, index) => <ChatMessage message={message} index={index} />)}
        </div>
    )
}