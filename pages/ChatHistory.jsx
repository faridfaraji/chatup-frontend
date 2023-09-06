import {
  Frame,
  Navigation,
  Page,
  Button,
  Layout,
  HorizontalStack,
  useBreakpoints,
  VerticalStack,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, useTransition } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { AccessWrapper, Chat, ChatSummary, Robot, SkeletonCard, SkeletonChats, SkeletonMessages } from "../components";
import { dateFromUTC, localizeDatestamp, localizeTime, zeroRange } from "../utils";
import { useChatHistory, useMessageHistory, useSocketInitializer, useDisconnectSocket, useChatFetch } from "../hooks";
import { ConversationMinor } from '@shopify/polaris-icons';
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { ChatNavLabel, LiveChat } from "../components/chats";


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

const reduceById = (result, item) => {
  const { id, ...rest } = item
  result[id] = rest
  return result
}

// Helper that determines nav class
const chatClass = (sentiment, isLive) => {
  return `chat ${isLive ? "live" : sentiment ? sentiment.toLowerCase() : "neutral"}-chat`
}

export default function ChatHistory() {
  //===========================================================================
  // Initialization of state variables
  //===========================================================================

  // Dates constants for date picking
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

  // Dates for requesting chats
  const [dates, setDates] = useState({since: kyou, until: ashita});

  // Lists of chats currently in view indexed by flavor
  const [chats, setChats] = useState([]);
  const [chatsByDate, setChatsByDate] = useState([]);
  const [chatsById, setChatsById] = useState([])
  const [chatsLoading, setChatsLoading] = useState(true);
  const getChats = useChatHistory();
  const getChat = useChatFetch();

  // Navigation sections
  const [navSections, setNavSections] = useState([]);

  // Socket and live chat information
  const [liveChats, setLiveChats] = useState([]);
  const [firstLiveCheck, setFirstLiveCheck] = useState(true);
  const [socket, setSocket] = useState(false)
  const app = useAppBridge();
  const sessionToken = getSessionToken(app);

  // Flags to determine what the main content is
  const [selected, setSelected] = useState(false)
  const [chatView, setChatView] = useState(false);
  const [liveView, setLiveView] = useState(false);

  // Messages that build the chat content
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState(false)
  const getMessages = useMessageHistory();

  //===========================================================================
  // Initialization of dangling hooks
  //===========================================================================

  // Translation function to include copy
  const { t } = useTranslation();

  // Current screen size info
  const bp = useBreakpoints();
  const [navVis, setNavVis] = useState(bp.mdDown)

  //===========================================================================
  // Nav builder
  //===========================================================================

  // Is the nav currently visible? only for small screens
  const toggleNav = () => {
    setNavVis(!navVis)
  }
  const toggleNavButton = <Button icon={ConversationMinor} onClick={() => toggleNav()} size={"slim"}>{t("ChatHistory.viewNav")}</Button>


  // date picking
  const handleDateChange = (range) => {
    setChatsLoading(true)
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
    setSelected(null)
    setNavVis(bp.mdDown)
    setChatView(false)
  }

  // Basic chat list getter and setter
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

  // Live chat refresher
  const refreshLiveChats = useCallback(() => {
    console.log(dates.until, ashita, dates.until >= ashita)
    if (dates.until >= ashita) {
      // Filter out chat IDs that are not already in chatsById
      const newChatIds = liveChats.filter((chatId) => !chatsById[chatId]);
      console.log("liv:", liveChats)
      console.log("ids:", chatsById)
      console.log("new:", newChatIds)

      // Fetch chat information for new chat IDs and update chatsById
      const fetchAndAddNewChats = async () => {
        for (const chatId of newChatIds) {
          const chatInfo = await getChat(chatId);
          console.log("fetching id:", chatId)
          console.log("result:", chatInfo)
          setChatsByDate(() => ([chatInfo, ...chats,].reduce(reduceByDate, {})));
          setChatsById(() => ([chatInfo, ...chats,].reduce(reduceById, {})));
          setChats((prevChats) => ([chatInfo, ...prevChats,]));
        }
      };

      fetchAndAddNewChats()
      // .then(() => {
      //   console.log(chats)
      //   setChatsByDate(chats.reduce(reduceByDate, {}))
      //   setChatsById(chats.reduce(reduceById, {}))
      // });

    }
  }, [liveChats, chatsById])

  useEffect(() => {
    if (firstLiveCheck) {
      setFirstLiveCheck(false);
      return;
    }

    refreshLiveChats()
  }, [liveChats])



  const handleSelect = (chatId) => {
    setChatView(false)
    setLiveView(false)
    if (bp.mdDown) toggleNav()
    setSelected(chatId)
  }

  // Build the nav out of the chats in our selection
  useEffect(() => {
    console.log(chatsByDate)
    const tempSections = []
    Object
      .entries(chatsByDate)
      .sort((x, y) => {
        return new Date(y[0]) - new Date(x[0])
      })
      .forEach(([date, list]) => {
        tempSections.push(<Navigation.Section
          key={date}
          title={date}
          items={list
            .sort((x, y) => { return y.fulldate - x.fulldate })
            .map((currentChat) => ({
              key: currentChat.id,
              label: <ChatNavLabel chat={chat} isLive={liveChats.includes(currentChat.id)} />,
              selected: selected === currentChat.id,
              onClick: () => handleSelect(currentChat.id)
            }))}
        />)
      })
    setNavSections(tempSections)
  }, [liveChats, chatsByDate, selected])

  const navLoading = <SkeletonChats />
  const noChats = <Navigation.Section key={"noChats"} title={t("ChatHistory.noChats")} items={[]} />
  const navMarkup = <Navigation key="nav" location="/">{chatsLoading ? navLoading : navSections?.length ? navSections : noChats}</Navigation>

  //===========================================================================
  // Live socket connection for live chats
  //===========================================================================

  useEffect(() => {
    useSocketInitializer(
      handleLiveMessage,
      handleLiveChats,
      handleOffChats,
      sessionToken).then((data) => setSocket(data))
    return () => {
      // Disconnect socket when component unmounts
      useDisconnectSocket();
    }
  }, [])

  const handleLiveMessage = (data) => {
    // Handle the incoming live message data here
    console.log("Live Message Handler invoked with data:", data)
    setNewMessage(data)
  }

  const handleLiveChats = (data) => {
    setLiveChats(data)
    // Handle the incoming live message data here
    console.log('New live message received:', data);
  }

  const handleOffChats = (data) => {
    console.log('New live message received:', data);
    setLiveChats(prevLiveChats => prevLiveChats.filter(chatId => chatId !== data));
    // Handle the incoming live message data here
  }

  //===========================================================================
  // Build summary page
  //===========================================================================

  // View chat button
  const viewChat = () => {
    setChatView(true)
    setLiveView(false)
  }

  const summary = <ChatSummary summary={chatsById[selected]?.conversation_summary} metadata={chatsById[selected]?.metadata} callback={viewChat} />

  //===========================================================================
  // Populate messages that chat views build from
  //===========================================================================

  // Single chat fetching
  const refreshMessages = () => {
    console.log("refreshing messages...")
    if (selected) {
      if (newMessage) {
        if (selected === newMessage.conversation_id) {
          addMessage({
            message: newMessage.message,
            message_type: "USER",
            metadata: ["customer"],
            timestamp: new Date()
          })
          setNewMessage(false)
        }
      } else {
        getMessages(selected).then((data) => setMessages(data.reverse()))
      }
    }
  }

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg])
  }

  useEffect(() => refreshMessages(), [selected, newMessage])

  //===========================================================================
  // Build basic chat view
  //===========================================================================

  // View Summary button
  const viewSummary = () => {
    setChatView(false)
    setLiveView(false)
  }

  // Callback that takes over the chat from the AI if the chat is live
  const takeOver = useCallback(() => {
    const data = {
      conversation_id: selected,
      message: "Admin Connected"
    }
    socket.emit("message", data)
    setLiveView(true)
  }, [selected])

  const chat = messages.length ?
    <Chat
      chat={messages}
      summary={chatsById[selected]?.conversation_summary}
      viewSummary={viewSummary}
      takeOver={takeOver}
    /> :
    <SkeletonCard lines={10} />

  //===========================================================================
  // Build live chat view
  //===========================================================================

  const forfeitChat = useCallback(() => {
    const data = {
      conversation_id: selected,
      message: ""
    }
    socket.emit("forfeit", data)
    setChatView(true)
    setLiveView(false)
  }, [selected])

  // Callback that sends the admin's message through the socket
  const sendAdminMessage = useCallback((message) => {
    const data = {
      conversation_id: selected,
      message: message
    }
    console.log("emitting data: ", data)
    socket.emit("message", data)
  }, [selected])

  const liveChat = messages.length ?
    <LiveChat chat={messages} summary={chatsById[selected]?.conversation_summary} sendAdminMessage={sendAdminMessage} forfeit={forfeitChat} /> :
    <SkeletonCard lines={10} />

  //===========================================================================
  // Content logic
  //===========================================================================
  const content = selected ? chatView ? liveView ? liveChat : chat : summary : <Robot />


  //===========================================================================
  // Test button function
  //===========================================================================
  const test = () => {
    setLiveChats((previousChats) => ["5d5ba14b-bd6e-4fc6-aa61-b4fb24c38884", ...previousChats])
    // refreshLiveChats()
    // console.log(socket)
    // socket.emit("message", { conversation_id: selected, message: "hello socket" })
    // console.log(selected)
    console.log(chats)
    console.log(chatsByDate)
    console.log(chatsById)
    console.log(liveChats)
  }

  //===========================================================================
  // Build the page out of the above created components
  //===========================================================================
  return (
    <AccessWrapper minimum={40} copyDomain={"ChatHistory"} fullpage={true}>
      <Frame navigation={navMarkup} showMobileNavigation={navVis} onNavigationDismiss={() => toggleNav()}>
        <Page
          title={t("NavigationMenu.chatHistory")}
          divider
          primaryAction={
            <HorizontalStack gap="1">
              <Button size="slim" onClick={() => test()}>TEST</Button>
              {bp.mdDown ? toggleNavButton : null}
              <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
            </HorizontalStack>
          }
        >
          <Layout>
            <Layout.Section fullWidth>
              {content}
              <br />
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AccessWrapper>
  )
}
