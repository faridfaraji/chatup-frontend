import { HorizontalStack, Navigation, SkeletonBodyText, SkeletonDisplayText, SkeletonThumbnail } from "@shopify/polaris"

export const SkeletonChatNavigation = () => {
    const title = <span className="dot loading nav-date" />
    const label =
        <HorizontalStack gap="1">
            <span className="dot loading" /><span className="dot loading nav-text" />
        </HorizontalStack>
    const chats = [5, 3, 8, 2, 4].map((i) => {
        const sectionKey = `sekelton${i}`
        const items = []
        for (let j = 1; j <= i; j++) {
            items.push({
                key: j * Math.random(),
                label: label
            })
        }
        return <Navigation.Section key={sectionKey} title={title} items={items} />
    })
    return <Navigation key="skeletonNav" location="/" >{chats}</Navigation>
}