import { Box } from "@shopify/polaris"

export const PaddedCell = ({ children, padding }) => {
    return (
        <Box
            paddingBlockStart={padding && padding[0] ? padding[0] : "0"} //top
            paddingInlineEnd={padding && padding[1] ? padding[1] : "0"} //right
            paddingBlockEnd={padding && padding[2] ? padding[2] : "0"} //bottom
            paddingInlineStart={padding && padding[3] ? padding[3] : "0"} //left
        >
            {children}
        </Box>
    )
}