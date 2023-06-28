import { AlphaCard, Form, Layout, Text, TextField, VerticalStack, Button, Box } from "@shopify/polaris"
import { useState } from "react";

export const ChatBot = (props) => {
    const [value, setValue] = useState('');

    // As user types, update value accordingly
    const handleChange = (newValue) => {
        setValue(newValue)
    };

    // We only want to execute a server request if the tag to be added is valid
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box padding={props.padding}>
            <VerticalStack>
                <AlphaCard>
                    <Box minHeight={props.minHeight}>
                        <VerticalStack>
                            <Form onSubmit={handleSubmit}>
                                <TextField
                                    value={value}
                                    onChange={handleChange}
                                    label=""
                                    helpText=""
                                    connectedRight={<Button>Submit</Button>}
                                />
                            </Form>
                        </VerticalStack>
                    </Box>
                </AlphaCard>
            </VerticalStack>
        </Box>
    )
}