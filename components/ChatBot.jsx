import { AlphaCard, Form, Layout, Text, TextField, VerticalStack, Button } from "@shopify/polaris"
import { useState } from "react";

export const ChatBot = () => {
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
        <AlphaCard>
            <Layout.Section>
                <Text variant="headingXl">
                    Chat Bot Preview
                </Text>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <VerticalStack align="end">
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
                </AlphaCard>
            </Layout.Section>
        </AlphaCard>
    )
}