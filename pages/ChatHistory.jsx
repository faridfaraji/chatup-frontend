import { AlphaCard, Button, Divider, Frame, HorizontalStack, Layout, Page, useBreakpoints } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { AccessWrapper, CardTitle, ChatInput, ChatMessages, ChatNavigation, ChatSummary, DateRangePicker, Robot, SkeletonChatNavigation } from "../components";
import { useChatFetch, useChatsFetch, useDisconnectSocket, useMessagesFetch, useSocketInitializer } from "../hooks";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { scrollToBottom, zeroRange } from "../utils";
import { ConversationMinor } from "@shopify/polaris-icons"

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
  const [dates, setDates] = useState({ since: kyou, until: ashita });

  // Store chat and message data
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState([]);
  const [liveChats, setLiveChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageQueue, setMessageQueue] = useState([])

  // Get chat and message data
  const getChats = useChatsFetch();
  const getChat = useChatFetch();
  const getMessages = useMessagesFetch();

  // Socket and live chat information
  const [socket, setSocket] = useState(false)
  const app = useAppBridge();
  const sessionToken = getSessionToken(app);

  // ID of selected chat
  const [selected, setSelected] = useState(false);

  // Are we currently viewing chat messages?
  const [chatView, setChatView] = useState(false);

  // Is the selected chat live?
  const [liveView, setLiveView] = useState(false);

  // Have we joined the selected chat?
  const [joinView, setJoinView] = useState(false);

  //===========================================================================
  // Initialization of dangling hooks
  //===========================================================================

  // Translation function to include copy
  const { t } = useTranslation();

  // Current screen size info
  const bp = useBreakpoints();
  const [navVis, setNavVis] = useState(bp.mdDown)

  //===========================================================================
  // Derived values and state updaters
  //===========================================================================

  // Whenever new dates are selected, refresh the chat list
  const refreshChats = () => {
    setChatsLoading(true)
    getChats(dates.since ?? kyou, dates.until ?? ashita)
      .then(data => setChats(data))
      .then(() => setChatsLoading(false))
  }

  useEffect(() => refreshChats(), [dates])

  // Whenever we get new live chat info from the socket,
  // if we're looking at today's chats, update the chats list
  const newChatIds = liveChats.filter(chatId => !chats.find(item => item.id === chatId));

  const fetchAndAddNewChats = (newChatIds) => {
    for (const chatId of newChatIds) {
      getChat(chatId).then(newChat => setChats(prevChats => [newChat, ...prevChats]))
    }
  }

  useEffect(() => {
    if (liveChats.length && (dates.until >= ashita)) {
      fetchAndAddNewChats(newChatIds)
    }
  }, [liveChats])


  // Whenever a chat is selected, fetch the messages for that chat
  const [diff, setDiff] = useState(0);

  const refreshMessages = useCallback(() => {
    console.log("refreshing!")
    if (selected) {
      getMessages(selected)
        .then(data => {
          console.log(data)
          const sortedData = data.sort((a, b) => new Date(a?.timestamp) - new Date(b?.timestamp))
          const newDiff = new Date(sortedData[sortedData.length - 1]?.timestamp) - new Date(sortedData[0]?.timestamp);
          console.log(diff)
          console.log(newDiff)
          if(newDiff > diff) {
            setDiff(newDiff)
            setMessages(sortedData)
          }
        })
    }
  }, [selected, diff])

  useEffect(() => {
    let refreshInterval;
    if (liveView && chatView && !joinView) {
      // If viewing a live chat but not joined, check for new messages every 10 seconds
      refreshInterval = setInterval(refreshMessages, 10000); 
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [liveView, chatView, joinView, selected, diff]);

  useEffect(() => refreshMessages(), [selected])

  const addMessage = (newMsg) => { setMessages(prevMsgs => [...prevMsgs, newMsg]) }

  //===========================================================================
  // Navigation Event Handlers
  //===========================================================================

  const handleNavToggle = () => { setNavVis(!navVis) }

  const handleDateChange = (range) => {
    setChatsLoading(true)
    setDates(zeroRange(range))
    setNavVis(bp.mdDown)
    setSelected(false)
    setChatView(false)
    setLiveView(false)
    setJoinView(false)
  }

  const handleSelect = (chatId) => {
    if (bp.mdDown) setNavVis(false)
    setChatView(false)
    setLiveView(liveChats.includes(chatId))
    setJoinView(false)
    setSelected(chatId)
    refreshMessages()
  }

  //===========================================================================
  // Navigation Content
  //===========================================================================

  const chatNavigation = chatsLoading ?
    <SkeletonChatNavigation /> :
    <ChatNavigation
      chats={chats}
      selected={selected}
      liveChats={liveChats}
      handleSelect={handleSelect} />

  const primaryActions =
    <HorizontalStack gap="1">
      <Button size="slim" onClick={() => test()}>TEST</Button>
      {bp.mdDown &&
        <Button
          icon={ConversationMinor}
          onClick={() => handleNavToggle()}
          size={"slim"}>
          {t("ChatHistory.viewNav")}
        </Button>}
      <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
    </HorizontalStack>


  //===========================================================================
  // Live socket connection for live chats
  //===========================================================================

  const handleLiveMessage = useCallback((data) => {
    const customerMsg = {
      message_type: "USER",
      metadata: ["customer"],
      message: data.message,
      timestamp: new Date()
    }

    console.log(customerMsg)
    console.log(selected)
    console.log(data)
    console.log(data.conversation_id)


    if (selected === data.conversation_id) { addMessage(customerMsg) }

    // Handle the incoming live message data here
    console.log("Live Message Handler invoked with data:", data)
  }, [selected, addMessage])

  const handleLiveChats = (data) => {
    setLiveChats(data)

    // Handle the incoming live message data here
    console.log('Chat born:', data);
  }

  const handleOffChats = (data) => {
    setLiveChats(prevLiveChats => prevLiveChats.filter(chatId => chatId !== data));

    // Handle the incoming live message data here
    console.log('Chat died:', data);
  }


  useEffect(() => {
    useSocketInitializer(handleLiveChats, handleOffChats, sessionToken).then((data) => setSocket(data))
    return () => {
      // Disconnect socket when component unmounts
      useDisconnectSocket();
    }
  }, [])

  useEffect(() => {
    if (typeof socket?.on === 'function') {
      socket.off('customer_response');
      socket.on('customer_response', (data) => { handleLiveMessage(data) });
    }
  }, [socket, handleLiveMessage])

  useEffect(() => {
    setLiveView(liveChats.includes(selected))
  }, [liveChats])

  //===========================================================================
  // Main Content Event Handlers
  //===========================================================================

  const viewChat = () => {
    setChatView(true)
  }

  const viewSummary = () => {
    setChatView(false)
    setJoinView(false)
  }

  const joinChat = useCallback(() => {
    const data = {
      conversation_id: selected,
      message: "Admin Connected"
    }
    socket.emit("message", data)
    setChatView(true)
    setJoinView(true)
    setTimeout(() => scrollToBottom(), 69)
  }, [selected])

  const leaveChat = useCallback(() => {
    const data = {
      conversation_id: selected,
      message: ""
    }
    socket.emit("forfeit", data)
    setJoinView(false)
  }, [selected])

  const handleAdminMessage = useCallback((messageText) => {
    const data = {
      conversation_id: selected,
      message: messageText
    }
    console.log("emitting data: ", data)
    socket.emit("message", data)

    const adminMsg = {
      message_type: "USER",
      metadata: ["admin"],
      message: messageText,
      timestamp: new Date()
    }

    addMessage(adminMsg)

  }, [selected])

  //===========================================================================
  // Main Content
  //===========================================================================

  const selectedChat = chats.find(item => item.id === selected)

  const content = !selected ? <Robot /> :
    <AlphaCard>
      <CardTitle linebreak title={selectedChat?.conversation_summary?.title ?? t("ChatHistory.untitled")} />
      <Divider />
      <br />
      {!chatView && <ChatSummary chat={selectedChat} />}
      {chatView && <ChatMessages messages={messages} />}
      <Divider />
      <br />
      {joinView && <ChatInput id="chatbubble-input-field" handleSend={handleAdminMessage} />}
      <HorizontalStack align="end" gap="5">
        {liveView && !joinView &&
          <Button primary onClick={() => joinChat()}>{t("ChatHistory.joinChat")}</Button>}
        {joinView &&
          <Button primary onClick={() => leaveChat()}>{t("ChatHistory.leaveChat")}</Button>}
        {chatView && !joinView &&
          <Button onClick={() => viewSummary()}>{t("ChatHistory.viewSummary")}</Button>}
        {!chatView &&
          <Button onClick={() => viewChat()}>{t("ChatHistory.viewChat")}</Button>}
      </HorizontalStack>
    </AlphaCard>



  //===========================================================================
  // Test button function
  //===========================================================================
  const test = () => {
    // setLiveChats((prevChats) => ["5d5ba14b-bd6e-4fc6-aa61-b4fb24c38884", ...prevChats])
    // refreshLiveChats()
    // console.log(socket)
    // socket.emit("message", { conversation_id: selected, message: "hello socket" })
    // console.log(selected)
    // console.log(chats)
    // console.log(liveChats)
    // console.log(messages)
    // console.log(socket)
    console.log(socket)
  }

  //===========================================================================
  // Build the page out of the above created components
  //===========================================================================
  return (
    <AccessWrapper minimum={40} copyDomain={"ChatHistory"} fullpage={true}>
      <Frame navigation={chatNavigation} showMobileNavigation={navVis} onNavigationDismiss={() => handleNavToggle()}>
        <Page primaryAction={primaryActions} title={t("NavigationMenu.chatHistory")} divider>
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
