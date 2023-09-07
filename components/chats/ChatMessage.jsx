import { dateFromUTC, localizeTime } from "../../utils"
import { Link, Text } from "@shopify/polaris";


// This function hyperlinks URLs, emails, and phone numbers and removes dots after hyperlinks
const hyperlinkText = (messageText) => {
    // Define regular expressions to match URLs, emails, and phone numbers

    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
    const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;

    if (messageText !== null) {
        const components = [];
        let remainingText = messageText;

        while (remainingText) {
            // Check for a match with one of the regex patterns
            const markdownLinkMatch = markdownLinkRegex.exec(remainingText);
            //   const emailMatch = emailRegex.exec(remainingText);
            //   const phoneMatch = phoneRegex.exec(remainingText);

            // console.log(markdownLinkMatch)
            // Find the earliest match
            //   const earliestMatch = [
            //     markdownLinkMatch,
            //     // emailMatch,
            //     // phoneMatch
            //   ].filter(match => match)
            //     .reduce((a, b) => (a.index < b.index ? a : b), null);

            if (!markdownLinkMatch) {
                // No more matches found, add the remaining text as a Text component
                components.push(<p>{remainingText}</p>);
                break;
            }

            // Add the text before the match as a Text component
            if (markdownLinkMatch.index > 0) {
                components.push(<p>{remainingText.substring(0, markdownLinkMatch.index)}</p>);
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

export const ChatMessage = ({ message }) => {
    const adminMessage = message.metadata && message.metadata[0] === "admin"
    const aiMessage = message.message_type === "AI"
    const time = localizeTime(dateFromUTC(message.timestamp))

    const message_digested = hyperlinkText(message.message)

    return (
        <div className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message-container`}>
            {aiMessage || adminMessage ? <div className="timestamp timestamp-left">{time}</div> : null}
            <div className={`${aiMessage ? "ai" : adminMessage ? "admin" : "human"}-message`}>
                {message_digested}
            </div>
            {!(aiMessage || adminMessage) ? <div className="timestamp timestamp-right">{time}</div> : null}
        </div>
    )
}