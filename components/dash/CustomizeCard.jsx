import { useNavigate } from "@shopify/app-bridge-react"
import { AlphaCard, Link, List, Text, VerticalStack } from "@shopify/polaris"
import { Trans, useTranslation } from "react-i18next"
import cache from "../../cache";
import { CardTitle } from "../misc";

export const CustomizeCard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const embedCall1 = <Trans i18nKey={"Dashboard.embedCall1"} />
    const embedCall2 = <Trans i18nKey={"Dashboard.embedCall2"} components={[<strong />]} />
    const embedCall3 = <Trans i18nKey={"Dashboard.embedCall3"} components={[<strong />]} />
    const embedCall4 = <Trans i18nKey={"Dashboard.embedCall4"} components={[<strong />]} />
    const embedCall5 = <Text as="p">
        <Trans i18nKey={"Dashboard.embedCall5"} components={[<Link onClick={() => navigate(cache.embed_url, { target: "new" })} />]} />
    </Text>

    const customizeCard = <AlphaCard>
        <CardTitle title={t("Dashboard.customizeTitle")} linebreak />
        <VerticalStack gap="4" >
            {embedCall1}
            <List type="number">
                <List.Item>{embedCall2}</List.Item>
                <List.Item>{embedCall3}</List.Item>
                <List.Item>{embedCall4}</List.Item>
            </List>
            {embedCall5}
        </VerticalStack>
    </AlphaCard>

    return customizeCard
}