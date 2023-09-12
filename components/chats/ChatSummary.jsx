import { HorizontalStack, Tag, Text } from "@shopify/polaris"
import { useTranslation } from "react-i18next"

export const ChatSummary = ({ chat }) => {
    const { t } = useTranslation();

    const tags = chat?.conversation_summary?.classifications ? chat.conversation_summary.classifications.split(', ') : []
    const tagMarkup = tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
    const tagDiv = tagMarkup.length > 0 &&
        <div>
            <Text variant="headingSm">{t("ChatHistory.topics")}</Text>
            <HorizontalStack gap="1">{tagMarkup}</HorizontalStack>
            <br />
        </div>

    const summary = chat?.conversation_summary?.summary
    const summaryDiv = summary &&
        <div>
            <Text variant="headingSm">{t("ChatHistory.summary")}</Text>
            <Text>{summary}</Text>
            <br />
        </div>

    const metadata = chat?.metadata
    const metadataDiv = metadata &&
        <div>
            {
                (metadata?.city || metadata?.region || metadata?.country) &&
                <div>
                    <Text variant="headingSm">{t("MetaData.location")}</Text>
                    <div style={{ display: "inline-flex" }}>
                        <div className="live-chat-meta">
                            {metadata?.city && <span>{metadata.city}, </span>}
                            {metadata?.region && <span>{metadata.region}, </span>}
                            {metadata?.country && <span>{metadata.country} </span>}
                            {metadata?.country && <span className={`fi fi-${metadata.country?.toLowerCase()}`} />}
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            }
            {
                metadata?.ip &&
                <div>
                    <Text variant="headingSm">{t("MetaData.ip")}</Text>
                    <div className="live-chat-meta">
                        {`${metadata.ip}`}
                    </div>
                    <br />
                </div>
            }
        </div>

    return (
        <div>
            {tagDiv}
            {summaryDiv}
            {metadataDiv}
        </div>
    )
}
