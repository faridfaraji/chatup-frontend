import {
    AlphaCard,
    Box,
    Divider,
    Text,
    VerticalStack,
} from "@shopify/polaris"
import { LoremIpsum } from "./LoremIpsum"

export const WelcomeCard = (props) => {
    const cardTitle = "headingLg"

    return (
        <AlphaCard>
            <Box minHeight={props.minHeight}>
                <VerticalStack gap="4">
                    <Text variant={cardTitle} alignment="center"> {props.title} </Text>
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
