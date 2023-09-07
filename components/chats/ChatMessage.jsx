import { dateFromUTC, localizeTime } from "../../utils"
import { Link } from "@shopify/polaris";

const hyperlinkText = (messageText) => {
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/;
    const phoneRegex = /\+?(\d{1,4}[-.\s]?)?(\(\d+\)[-.\s]?)?\d+(?:[-.\s]?\d+)+/;

    if (messageText !== null) {
        const components = [];
        let remainingText = messageText;

        while (remainingText) {
            const markdownLinkMatch = markdownLinkRegex.exec(remainingText);
            const emailMatch = emailRegex.exec(remainingText);
            const phoneMatch = phoneRegex.exec(remainingText);
            console.log(phoneMatch)

            const match = [markdownLinkMatch, emailMatch, phoneMatch].filter(match => match !== null).reduce((minMatch, currentMatch) => {
                if (minMatch === null || (currentMatch.index !== null && currentMatch.index < minMatch.index)) {
                  return currentMatch;
                }
                return minMatch;
              }, null);

            // Add the remaining text as text
            if (!match) {
                components.push(remainingText);
                break;
            }

            // Add the text before the match as text
            if (match.index > 0) {
                components.push(remainingText.substring(0, match.index));
            }


            const protocol = match === markdownLinkMatch ? "https://" : match === emailMatch ? "mailto:" : "tel:"
            const urlIndex = match === phoneMatch ? 0 : match === emailMatch ? 1 : 2
            const textIndex = match === phoneMatch ? 0 : 1
            // Add the matched content as a Link component
            components.push(
                <Link url={`${protocol}${match[urlIndex]}`} external>
                    {match[textIndex]}
                </Link>
            );

            // Update the remaining text
            remainingText = remainingText.substring(match.index + match[0].length);
        }

        return components;
    }
    return messageText
}

export const ChatMessage = ({ message }) => {
    const adminMessage = message.metadata && message.metadata[0] === "admin"
    const aiMessage = message.message_type === "AI"
    const time = localizeTime(dateFromUTC(message.timestamp))

    const containerClass = `message-container ${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message-container`
    const messageClass = `${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message`

    const message_digested = hyperlinkText(message.message)

    return (
        <div className={containerClass}>
            {aiMessage || adminMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={messageClass}>
                <p>
                    {message_digested}
                </p>
            </div>
            {!(aiMessage || adminMessage) ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>
    )
}
