import { Navigation } from "@shopify/polaris"
import { dateFromUTC, localizeDatestamp, localizeTime } from "../../utils";
import { useEffect, useState } from "react";
import { ChatNavLabel } from "./ChatNavLabel";
import { useTranslation } from "react-i18next";


// reduction functions
const reduceByDate = (result, item) => {
    const { timestamp, ...rest } = item;
    if (rest.user_message_count) {
        const fulldate = dateFromUTC(timestamp)
        const datestamp = localizeDatestamp(fulldate)
        const time = localizeTime(fulldate)
        rest.fulldate = fulldate
        rest.time = time

        if (datestamp in result) {
            result[datestamp].push(rest);
        } else {
            result[datestamp] = [rest];
        }
    }
    return result;
}

export const ChatNavigation = ({ chats, selected, liveChats, handleSelect }) => {
    const { t } = useTranslation();
    const [navSections, setNavSections] = useState([])

    // Build the nav out of the chats in our selection
    useEffect(() => {
        const tempSections = []
        const chatsByDate = chats.reduce(reduceByDate, {})
        Object
            .entries(chatsByDate)
            .sort((x, y) => {
                return new Date(y[0]) - new Date(x[0])
            })
            .forEach(([date, list]) => {
                tempSections.push(
                    <Navigation.Section
                        key={date}
                        title={date}
                        items={
                            list.sort((x, y) => { return y.fulldate - x.fulldate })
                                .map((chat) => ({
                                    key: chat.id,
                                    label: <ChatNavLabel chat={chat} isLive={liveChats.includes(chat.id)} />,
                                    selected: selected === chat.id,
                                    onClick: () => handleSelect(chat.id)
                                }))
                        }
                    />)
            })
        setNavSections(tempSections)
    }, [chats, liveChats, selected])

    const noChats =
        <Navigation.Section
            key={"noChats"}
            title={t("ChatHistory.noChats")}
            items={[]} />

    const chatNavigation =
        <Navigation
            key="chatNavigation"
            location="/">
            {navSections}
        </Navigation>


    return chats.length ? chatNavigation : noChats
}