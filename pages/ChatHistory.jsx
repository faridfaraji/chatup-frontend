import {
  Frame,
  Navigation,
  AlphaCard,
  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { getChatHistory, getChatMessages } from "../utils/chatHistory";

export default function ChatHistory() {
  const [chats, setChats] = useState([])

  const chatsByDate = chats.reduce((result, item) => {
    const { timestamp, ...rest } = item;
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    if (formattedDate in result) {
      result[formattedDate].push(rest);
    } else {
      result[formattedDate] = [rest];
    }

    return result;
  }, {});


  const [selectedChat, setSelectedChat] = useState([])
  const [selected, setSelected] = useState(null)

  const handleSelect = (selectedId, conversationId) => {
    setSelected(selectedId)
    getChatMessages(conversationId).then((resp) => setSelectedChat(resp))
  };

  const navSections = []
  Object.entries(chatsByDate).forEach(([date, list]) => {
    navSections.push(<Navigation.Section
      key={date}
      title={date}
      items={list.map((currentChat, index) => ({
        key: date + index,
        label: currentChat.id,
        selected: selected === date + index,
        onClick: () => {
          handleSelect(date + index, currentChat.id)
        }
      }))}
    />)
  })

  const getChatHistoryCallback = async () => {
    getChatHistory().then((resp) => setChats(resp))
  };


  const navMarkup = (
    <Navigation key="nav" location="/">
      <Navigation.Section
        title="Date Range"
        items={[]}
      />
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
          {chatMarkup}
        </AlphaCard>
      </Frame>
    </Page>
  );
}
