import {
  Frame,
  Navigation,
  AlphaCard,
  Page,
  Button,
  Layout,
  HorizontalStack,
  TopBar,
  useBreakpoints,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { Chat, ChatSummary, Robot, SkeletonCard, SkeletonMessages } from "../components";
import { dateFromUTC, localizeDatestamp, localizeTime, zeroRange } from "../utils";
import { useChatHistory, useMessageHistory } from "../hooks";


export default function ChatHistory() {
  //  broad imports for accessibility
  const { t } = useTranslation();
  const { smDown } = useBreakpoints();
  const [navVis, setNavVis] = useState(smDown)

  const toggleNav = () => {
    setNavVis(!navVis)
  }


  // en: today
  const kyou = new Date();
  kyou.setHours(0, 0, 0, 0);

  // en: yesterday
  const kinou = new Date(kyou)
  kinou.setDate(kyou.getDate() - 1)

  // en: the day before yesterday
  const ototoi = new Date(kyou)
  ototoi.setDate(kyou.getDate() - 2)

  // en: tomorrow
  const ashita = new Date(kyou);
  ashita.setDate(kyou.getDate() + 1);


  // date picking
  const [dates, setDates] = useState({});
  const handleDateChange = (range) => {
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
  }

  // chat info fetching
  const [chats, setChats] = useState([]);
  const [chatsByDate, setChatsByDate] = useState([]);
  const [chatsById, setChatsById] = useState([])
  const getChats = useChatHistory();

  const refreshChats = () => {
    const since = dates.since ?? kyou
    const until = dates.until ?? ashita
    getChats(since, until)
      .then((data) => {
        setChats(data)
        setChatsByDate(data.reduce(reduceByDate, {}))
        setChatsById(data.reduce(reduceById, {}))
      })
  }

  useEffect(() => refreshChats(), [dates])

  const test = () => {
    console.log(chats)
    console.log(chatsByDate)
    console.log(chatsById)
  }

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

  const reduceById = (result, item) => {
    const { id, ...rest } = item
    result[id] = rest
    return result
  }

  // building nav from chat data
  const [selected, setSelected] = useState(null)

  const dot = (sentiment) => {
    const dotClass = sentiment ? `dot ${sentiment}-dot` : "dot null-dot"
    return <span className={dotClass} />
  }

  // const [chatLoading, setChatLoading] = useState(true)
  const handleSelect = (chatId) => {
    setChatView(false)
    resetChat()
    setSelected(chatId)
  }
  const navSections = []
  Object
    .entries(chatsByDate)
    .sort((x, y) => {
      return new Date(y[0]) - new Date(x[0])
    })
    .forEach(([date, list]) => {
      navSections.push(<Navigation.Section
        key={date}
        title={date}
        items={list
          .sort((x, y) => { return y.fulldate - x.fulldate })
          .map((currentChat) => ({
            key: currentChat.id,
            label:
              <div>
                {dot(currentChat.conversation_summary.satisfaction)}
                {` ${currentChat.time}: ` +
                  (
                    currentChat.conversation_summary.title ??
                    `${currentChat.user_message_count + currentChat.ai_message_count} ${t("Insights.messages")}`
                  )
                }
              </div>,

            selected: selected === currentChat.id,
            onClick: () => handleSelect(currentChat.id)
          }))}
      />)
    })

  const navMarkup = <Navigation key="nav" location="/">{navSections}</Navigation>

  // Building main panel content from nav data
  const [chatView, setChatView] = useState(false);
  const [chat, setChat] = useState(null)
  const getMessages = useMessageHistory();

  const viewSummary = () => {
    setChatView(false)
    resetChat()
  }

  const viewChat = useCallback(() => {
    resetChat()
    getMessages(selected)
      .then((data) => {
        console.log(data)
        setChat(<Chat chat={data} callback={viewSummary} />)
      })
      .then(() => setChatView(true))
  }, [selected])

  const resetChat = useCallback(() => {
    setChat(<SkeletonCard lines={10} />)
  }, [selected])

  const summary = <ChatSummary summary={chatsById[selected]?.conversation_summary} callback={viewChat} />
  const content = selected ? chatView ? chat : summary : <Robot />

  return (
    <Frame navigation={navMarkup} showMobileNavigation={navVis}>
      <Page
        title={t("NavigationMenu.chatHistory")}
        divider
        primaryAction={
          <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
        }
        secondaryActions={[
          {
            content: t("ChatHistory.viewNav"),
            onAction: () => toggleNav()
          },
          {
            content: "TEST",
            onAction: () => test()
          },
          {
            content: "REFRESH",
            onAction: () => refreshChats()
          }
        ]}
      >


        <Layout>
          <Layout.Section fullWidth>
            {content}
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  )
}
