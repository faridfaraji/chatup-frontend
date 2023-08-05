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
import { AccessWrapper, Chat, ChatSummary, Robot, SkeletonCard, SkeletonChats } from "../components";
import { dateFromUTC, localizeDatestamp, localizeTime, zeroRange } from "../utils";
import { useChatHistory, useMessageHistory } from "../hooks";
import { ConversationMinor } from '@shopify/polaris-icons';


export default function ChatHistory() {
  //  broad imports for accessibility
  const { t } = useTranslation();
  const bp = useBreakpoints();
  const [navVis, setNavVis] = useState(bp.mdDown)

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
    setChatsLoading(true)
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
    setSelected(null)
    setNavVis(bp.mdDown)
    setChatView(false)
  }

  // chat info fetching
  const [chats, setChats] = useState([]);
  const [chatsByDate, setChatsByDate] = useState([]);
  const [chatsById, setChatsById] = useState([])
  const getChats = useChatHistory();
  const [chatsLoading, setChatsLoading] = useState(true);

  const refreshChats = () => {
    setChatsLoading(true)
    const since = dates.since ?? kyou
    const until = dates.until ?? ashita
    getChats(since, until)
      .then((data) => {
        setChats(data)
        setChatsByDate(data.reduce(reduceByDate, {}))
        setChatsById(data.reduce(reduceById, {}))
      })
      .then(() => setChatsLoading(false))
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

  const chatClass = (sentiment) => {
    return sentiment ? `chat ${sentiment.toLowerCase()}-chat` : "chat neutral-chat"
  }

  // const [chatLoading, setChatLoading] = useState(true)
  const handleSelect = (chatId) => {
    setChatView(false)
    resetChat()
    if (bp.mdDown) toggleNav()
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
              <div className={chatClass(currentChat.conversation_summary.satisfaction)}>
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

  const navLoading = <SkeletonChats />
  const noChats = <Navigation.Section key={"noChats"} title={t("ChatHistory.noChats")} items={[]} />
  const navMarkup = <Navigation key="nav" location="/">{chatsLoading ? navLoading : navSections?.length ? navSections : noChats}</Navigation>

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
        setChat(<Chat chat={data} callback={viewSummary} />)
      })
      .then(() => setChatView(true))
  }, [selected])

  const resetChat = useCallback(() => {
    setChat(<SkeletonCard lines={10} />)
  }, [selected])

  const summary = <ChatSummary summary={chatsById[selected]?.conversation_summary} callback={viewChat} />
  const content = selected ? chatView ? chat : summary : <Robot />
  const navButton = <Button icon={ConversationMinor} onClick={() => toggleNav()} size="slim">{t("ChatHistory.viewNav")}</Button>

  return (
    <AccessWrapper minimum={80} copy={t("ChatHistory.upgrade")} fullpage={true}>
      <Frame navigation={navMarkup} showMobileNavigation={navVis} onNavigationDismiss={() => toggleNav()}>
        <Page
          title={t("NavigationMenu.chatHistory")}
          divider
          primaryAction={
            <HorizontalStack gap="1">
              {bp.mdDown ? navButton : null}
              <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
            </HorizontalStack>
          }
        >
          <Layout>
            <Layout.Section fullWidth>
              {content}
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AccessWrapper>

  )
}
