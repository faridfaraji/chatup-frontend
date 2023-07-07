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
        <Box
            paddingBlockStart={props.padding && props.padding[0] ? props.padding[0] : "0"} //top
            paddingInlineEnd={props.padding && props.padding[1] ? props.padding[1] : "0"} //right
            paddingBlockEnd={props.padding && props.padding[2] ? props.padding[2] : "0"} //bottom
            paddingInlineStart={props.padding && props.padding[3] ? props.padding[3] : "0"} //left
        >
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
        </Box>
    )
}
