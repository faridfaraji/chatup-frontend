import { Text } from "@shopify/polaris"

export const CardTitle = (props) => {
    return (
        <div>
            <Text variant="headingLg" alignment={props.alignment}>
                {props.title}
            </Text>
            {(props.linebreak ? <br /> : null)}
        </div>
    )
}