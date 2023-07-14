import { AlphaCard, Button, Divider, HorizontalStack, Tag, Text } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import { CardTitle } from "./CardTitle";

export const ChatSummary = ({ summary, callback }) => {
    const { t } = useTranslation();
    const tags = summary?.classifications ? summary.classifications.split(', ') : []
    const tagMarkup = tags.map((tag) => <Tag key={tag}>{tag}</Tag>)

    console.log(summary)
    console.log(tags)
    console.log(tagMarkup)

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
            <Divider />
            <br />
            <HorizontalStack align="end">
                <Button primary onClick={() => callback()}>
                    {t("ChatHistory.viewChat")}
                </Button>
            </HorizontalStack>
        </AlphaCard>
    )
}