import { AlphaCard, Button, Divider, HorizontalStack, Page, Tag, Text } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import { CardTitle } from "./CardTitle";
import { useEffect } from "react";
import { ConversationMinor } from '@shopify/polaris-icons';

export const ChatSummary = ({ summary, metadata, callback }) => {
    const { t } = useTranslation();
    const tags = summary?.classifications ? summary.classifications.split(', ') : []
    const tagMarkup = tags.map((tag) => <Tag key={tag}>{tag}</Tag>)

    useEffect(() => console.log(metadata))

    return (
        <AlphaCard>
            <CardTitle linebreak title={summary?.title ?? t("ChatHistory.untitled")} />
            <Divider /><br />
            {
                tagMarkup.length ?
                    <div>
                        <Text variant="headingSm">{t("ChatHistory.topics")}</Text>
                        <HorizontalStack gap="1">{tagMarkup}</HorizontalStack>
                        <br />
                    </div>
                    : null
            }
            {
                summary?.summary ?
                    <div>
                        <Text variant="headingSm">{t("ChatHistory.summary")}</Text>
                        <Text>{summary.summary}</Text>
                        <br />
                    </div>
                    : null
            }
            {
                metadata &&
                    <div>
                        <Text variant="headingSm">{t("MetaData.location")}</Text>
                        <Text>
                            <div style={{ display: "inline-flex" }}>
                                <div className="live-chat-meta">
                                    {`${metadata.city}, ${metadata.region}, ${metadata.country}`}
                                </div>
                                <span className={`fi fi-${metadata.country.toLowerCase()} fis`}></span>
                            </div>
                        </Text>
                        <br />
                        <Text variant="headingSm">{t("MetaData.ip")}</Text>
                        <Text>
                            <div className="live-chat-meta">
                                {`${metadata.ip}`}
                            </div>
                        </Text>
                        <br />
                    </div>
            }
            <Divider />
            <br />
            <HorizontalStack align="end">
                <Button onClick={() => callback()}>
                    {t("ChatHistory.viewChat")}
                </Button>
            </HorizontalStack>
        </AlphaCard>
    )
}