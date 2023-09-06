import { Navigation } from "@shopify/polaris"

export const ChatNavigation = () => {
    return(
        <Navigation key="nav" location="/">{chatsLoading ? navLoading : navSections?.length ? navSections : noChats}</Navigation>
    )
}