import {
    AlphaCard,
    Box,
    Divider,
    VerticalStack,
} from "@shopify/polaris"
import { LoremIpsum } from "./LoremIpsum"
import { CardTitle } from "./CardTitle"

export const WelcomeCard = (props) => {
    return (
        <AlphaCard>
            <Box minHeight={props.minHeight}>
                <VerticalStack gap="4">
                    <CardTitle title={props.title} alignment="center" />
                    <Divider />
                    <LoremIpsum content={props.content} />
                </VerticalStack>
            </Box>
            <VerticalStack gap="4">
                <Divider />
                {props.button}
            </VerticalStack>
        </AlphaCard>
    )
}
