import { AlphaCard, Button, Divider, Frame, HorizontalStack, Layout, Page, useBreakpoints } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { CardTitle, ChatInput, ChatMessages, ChatNavigation, ChatSummary, DateRangePicker, Robot, SkeletonChatNavigation } from "../components";
import { useChatFetch, useChatsFetch, useDisconnectSocket, useMessagesFetch, useSocketInitializer } from "../hooks";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { zeroRange } from "../utils";
import { ConversationMinor } from "@shopify/polaris-icons"

export default function Messages() {
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

  const oneWeekAgo = new Date(kyou)
  oneWeekAgo.setDate(kyou.getDate() - 7)

  // en: tomorrow
  const ashita = new Date(kyou);
  ashita.setDate(kyou.getDate() + 1);

  // Dates for requesting chats
  const [dates, setDates] = useState({ since: oneWeekAgo, until: ashita });

  // Store chat and message data
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState([]);
  const [liveChats, setLiveChats] = useState([]);
  const [messages, setMessages] = useState([]);

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
    if (selected) {
      getMessages(selected)
        .then(data => {
          const sortedData = data.sort((a, b) => new Date(a?.timestamp) - new Date(b?.timestamp))
          const newDiff = new Date(sortedData[sortedData.length - 1]?.timestamp) - new Date(sortedData[0]?.timestamp);
          if (newDiff != diff) {
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

  useEffect(() => refreshMessages(), [selected, joinView, chatView])

  const addMessage = (newMsg) => { setMessages(prevMsgs => [...prevMsgs, newMsg]) }

  //===========================================================================
  // Live socket connection for live chats
  //===========================================================================

  const handleLiveMessage = useCallback((data) => {
    const customerMsg = {
      message_type: "USER",
      metadata: ["customer"],
      message: data.message,
      timestamp: null
    }

    if (selected === data.conversation_id) { addMessage(customerMsg) }
  }, [selected, addMessage])

  const handleLiveChats = (data) => {
    setLiveChats(data)
  }

  const handleOffChats = (data) => {
    setLiveChats(prevLiveChats => prevLiveChats.filter(chatId => chatId !== data));
  }

  useEffect(() => {
    useSocketInitializer(handleLiveChats, handleOffChats, sessionToken).then((data) => setSocket(data))
    return () => useDisconnectSocket();
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
    leaveChat()
  }

  const joinChat = () => {
    setChatView(true)
    setJoinView(true)
  }

  const leaveChat = () => {
    setChatView(false)
    setJoinView(false)
  }

  const handleAdminMessage = useCallback((messageText) => {
    socket.emit("message", {
      conversation_id: selected,
      message: messageText
    })

    const adminMsg = {
      message_type: "USER",
      metadata: ["admin"],
      message: messageText,
      timestamp: null
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
      {chatView && <ChatMessages messages={messages} joined={joinView} />}
      <Divider />
      <br />
      {joinView &&
        <ChatInput
          id="chatbubble-input-field"
          handleSend={handleAdminMessage}
          conversation_id={selected}
          socket={socket}
        />}
      <HorizontalStack align="end" gap="5">
        {/* <Button onClick={() => setLiveChats(prev => [...prev, selected])}>Add to Live</Button> */}
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
  // Navigation Event Handlers
  //===========================================================================

  const handleNavToggle = () => { setNavVis(!navVis) }

  const handleDateChange = (range) => {
    setChatsLoading(true)
    setDates(zeroRange(range))
    if (bp.mdDown) setNavVis(true)
    setLiveView(false)
    setJoinView(false)
    setChatView(false)
    setSelected(false)
  }

  const handleSelect = (chatId) => {
    if (bp.mdDown) setNavVis(false)
    setLiveView(liveChats.includes(chatId))
    setJoinView(false)
    setChatView(liveChats.includes(chatId))
    setMessages([])
    setSelected(chatId)
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
      {/* <Button size="slim" onClick={() => test()}>TEST</Button> */}
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
  // Test button function
  //===========================================================================
  const test = () => {
    console.log(messages)
  }

  //===========================================================================
  // Build the page out of the above created components
  //===========================================================================
  return (
    <Frame navigation={chatNavigation} showMobileNavigation={navVis} onNavigationDismiss={() => handleNavToggle()}>
      <Page primaryAction={primaryActions} title={t("NavigationMenu.messages")} divider>
        <Layout>
          <Layout.Section fullWidth>
            {content}
            <br />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  )
}
