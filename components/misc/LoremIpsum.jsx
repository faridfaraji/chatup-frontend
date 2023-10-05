import { Box, Text } from "@shopify/polaris";

export const LoremIpsum = (props) => {
    const content = props.content ? props.content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    return (
        <Box
            paddingBlockStart={props.padding && props.padding[0] ? props.padding[0] : "0"} //top
            paddingInlineEnd={props.padding && props.padding[1] ? props.padding[1] : "0"} //right
            paddingBlockEnd={props.padding && props.padding[2] ? props.padding[2] : "0"} //bottom
            paddingInlineStart={props.padding && props.padding[3] ? props.padding[3] : "0"} //left
        >
            <Text>
                {content}
            </Text>
        </Box>
    )
}