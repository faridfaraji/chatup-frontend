import { Box, VerticalStack, Spinner } from "@shopify/polaris"

export const CenteredSpinner = () => {
    return (
        <VerticalStack align="center" inlineAlign="center">
            <Box minWidth="100">
                <Spinner size="large" />
            </Box>
        </VerticalStack>
    )
}
