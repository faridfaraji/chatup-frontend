import {
  Frame,
  Navigation,
  AlphaCard,
  Page,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { getChatHistory, getChatMessages } from "../utils/chatHistory";
import cache from "../cache";
import { SkeletonMessages } from "../components";

export default function ChatHistory() {
  const afetch = useAuthenticatedFetch();
  const [chats, setChats] = useState([])
  // todo:
  // get history (dates)
  const getChatHistoryCallback = async () => { getChatHistory(afetch).then((resp) => setChats(resp)) };
  // todo: 
  // useEffect(() => getChatHistoryCallback(today), [])
  useEffect(() => getChatHistoryCallback(), [])

  const chatsByDate = chats.reduce((result, item) => {
    const { timestamp, ...rest } = item;
    if (rest.messages.length) {
      const date = new Date(timestamp)
      rest.fullDate = date

      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();
      const formattedDate = `${year}-${month}-${day}`;

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      rest.time = formattedTime

      if (result && formattedDate in result) {
        result[formattedDate].push(rest);
      } else {
        result[formattedDate] = [rest];
      }
    }
    return result;

  }, {});


  const [selectedChat, setSelectedChat] = useState([])
  const [selected, setSelected] = useState(null)
  const [chatLoading, setChatLoading] = useState(true)

  const getSetChatMessages = (chatId) => {
    setChatLoading(true)
    getChatMessages(chatId, afetch)
      .then((resp) => setSelectedChat(resp))
      // .then(() => setChatLoading(false))
  }

  const polling = (chatId) => {

  }

  const [skeletonChatMarkup, setSkeletonChatMarkup] = useState(<SkeletonMessages messages={2} />)
  const handleSelect = (chatId, chatLength) => {
    setSkeletonChatMarkup(<SkeletonMessages messages={chatLength} />)
    setSelected(chatId)
    getSetChatMessages(chatId)
  };

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
          .sort((x, y) => { return y.fullDate - x.fullDate })
          .map((currentChat, index) => ({
            key: currentChat.id,
            label: currentChat.time + ": " + currentChat.messages.length,
            selected: selected === currentChat.id,
            onClick: () => {
              handleSelect(currentChat.id, currentChat.messages.length)
            }
          }))}
      />)
    })




  const navMarkup = (
    <Navigation key="nav" location="/">
      <Button primary fullWidth onClick={() => getChatHistoryCallback()}>refresh messages</Button>
      <Navigation.Section
        title="Date Range"
        items={[]}
      />
      {/* todo: (date1, date2) => getChatHistoryCallback(date1, date2)) */}
      <DateRangePicker callback={() => getChatHistoryCallback()} />
      <br />
      {navSections}
    </Navigation>
  )

  const chatMarkup = selectedChat.map((message, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: message.message_type === 'AI' ? 'flex-start' : 'flex-end',
        marginBottom: '10px',
        marginLeft: message.message_type === 'AI' ? "10px" : "0px",
        marginRight: message.message_type === 'AI' ? "0px" : "10px",
      }}
    >
      <div
        style={{
          backgroundColor: message.message_type === 'AI' ? '#e5e5e5' : '#008cff',
          color: message.message_type === 'AI' ? '#000' : '#fff',
          borderRadius: '5px',
          padding: '10px',
          maxWidth: '70%',
        }}
      >
        {message.message}
      </div>
    </div>
  ))


  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar />
      <Frame navigation={navMarkup}>
        <AlphaCard>
          {chatLoading && skeletonChatMarkup}
          {!chatLoading && chatMarkup}
        </AlphaCard>
      </Frame>
    </Page>
  );
}
