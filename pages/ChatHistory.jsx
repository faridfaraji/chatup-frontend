import {
  Frame,
  Navigation,
  AlphaCard,
  Page,
  Layout,
  Text,
  Button,
  Popover,
  DatePicker,
  Scrollable,
  HorizontalStack,
  VerticalStack,
  Box
} from "@shopify/polaris";
import {
  CalendarMinor,
} from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { LoremIpsum } from "../components";
import { DateRangePicker } from "../components/DateRangePicker";

export default function ChatHistory() {

  var chats = [
    { datetime: "saturday", summary: "summary 1", messages: [{ text: "admin message 1.1", sender: "admin" }, { text: "admin message 1.2", sender: "admin" }, { text: "non-admin message 1.3", sender: "customer" }, { text: "admin message 1.4", sender: "admin" }, { text: "admin message 1.5", sender: "admin" }, { text: "non-admin message 1.6", sender: "customer" }, { text: "admin message 1.7", sender: "admin" }, { text: "admin message 1.8", sender: "admin" }, { text: "non-admin message 1.9", sender: "customer" }] },
    { datetime: "sunday", summary: "summary 2", messages: [{ text: "admin message 2.1", sender: "admin" }, { text: "admin message 2.2", sender: "admin" }, { text: "non-admin message 2.3", sender: "customer" }, { text: "admin message 2.4", sender: "admin" }, { text: "admin message 2.5", sender: "admin" }, { text: "non-admin message 2.6", sender: "customer" }, { text: "admin message 2.7", sender: "admin" }, { text: "admin message 2.8", sender: "admin" }, { text: "non-admin message 2.9", sender: "customer" }] },
    { datetime: "sunday", summary: "summary 3", messages: [{ text: "admin message 3.1", sender: "admin" }, { text: "admin message 3.2", sender: "admin" }, { text: "non-admin message 3.3", sender: "customer" }, { text: "admin message 3.4", sender: "admin" }, { text: "admin message 3.5", sender: "admin" }, { text: "non-admin message 3.6", sender: "customer" }, { text: "admin message 3.7", sender: "admin" }, { text: "admin message 3.8", sender: "admin" }, { text: "non-admin message 3.9", sender: "customer" }] },
    { datetime: "sunday", summary: "summary 4", messages: [{ text: "admin message 4.1", sender: "admin" }, { text: "admin message 4.2", sender: "admin" }, { text: "non-admin message 4.3", sender: "customer" }, { text: "admin message 4.4", sender: "admin" }, { text: "admin message 4.5", sender: "admin" }, { text: "non-admin message 4.6", sender: "customer" }, { text: "admin message 4.7", sender: "admin" }, { text: "admin message 4.8", sender: "admin" }, { text: "non-admin message 4.9", sender: "customer" }] },
    { datetime: "monday", summary: "summary 5", messages: [{ text: "admin message 5.1", sender: "admin" }, { text: "admin message 5.2", sender: "admin" }, { text: "non-admin message 5.3", sender: "customer" }, { text: "admin message 5.4", sender: "admin" }, { text: "admin message 5.5", sender: "admin" }, { text: "non-admin message 5.6", sender: "customer" }, { text: "admin message 5.7", sender: "admin" }, { text: "admin message 5.8", sender: "admin" }, { text: "non-admin message 5.9", sender: "customer" }] },
    { datetime: "monday", summary: "summary 6", messages: [{ text: "admin message 6.1", sender: "admin" }, { text: "admin message 6.2", sender: "admin" }, { text: "non-admin message 6.3", sender: "customer" }, { text: "admin message 6.4", sender: "admin" }, { text: "admin message 6.5", sender: "admin" }, { text: "non-admin message 6.6", sender: "customer" }, { text: "admin message 6.7", sender: "admin" }, { text: "admin message 6.8", sender: "admin" }, { text: "non-admin message 6.9", sender: "customer" }] },
    { datetime: "monday", summary: "summary 7", messages: [{ text: "admin message 7.1", sender: "admin" }, { text: "admin message 7.2", sender: "admin" }, { text: "non-admin message 7.3", sender: "customer" }, { text: "admin message 7.4", sender: "admin" }, { text: "admin message 7.5", sender: "admin" }, { text: "non-admin message 7.6", sender: "customer" }, { text: "admin message 7.7", sender: "admin" }, { text: "admin message 7.8", sender: "admin" }, { text: "non-admin message 7.9", sender: "customer" }] },
    { datetime: "monday", summary: "summary 8", messages: [{ text: "admin message 8.1", sender: "admin" }, { text: "admin message 8.2", sender: "admin" }, { text: "non-admin message 8.3", sender: "customer" }, { text: "admin message 8.4", sender: "admin" }, { text: "admin message 8.5", sender: "admin" }, { text: "non-admin message 8.6", sender: "customer" }, { text: "admin message 8.7", sender: "admin" }, { text: "admin message 8.8", sender: "admin" }, { text: "non-admin message 8.9", sender: "customer" }] },
    { datetime: "tuesday", summary: "summary 9", messages: [{ text: "admin message 9.1", sender: "admin" }, { text: "admin message 9.2", sender: "admin" }, { text: "non-admin message 9.3", sender: "customer" }, { text: "admin message 9.4", sender: "admin" }, { text: "admin message 9.5", sender: "admin" }, { text: "non-admin message 9.6", sender: "customer" }, { text: "admin message 9.7", sender: "admin" }, { text: "admin message 9.8", sender: "admin" }, { text: "non-admin message 9.9", sender: "customer" }] },
    { datetime: "tuesday", summary: "summary 10", messages: [{ text: "admin message 10.1", sender: "admin" }, { text: "admin message 10.2", sender: "admin" }, { text: "non-admin message 10.3", sender: "customer" }, { text: "admin message 10.4", sender: "admin" }, { text: "admin message 10.5", sender: "admin" }, { text: "non-admin message 10.6", sender: "customer" }, { text: "admin message 10.7", sender: "admin" }, { text: "admin message 10.8", sender: "admin" }, { text: "non-admin message 10.9", sender: "customer" }] },
    { datetime: "tuesday", summary: "summary 11", messages: [{ text: "admin message 11.1", sender: "admin" }, { text: "admin message 11.2", sender: "admin" }, { text: "non-admin message 11.3", sender: "customer" }, { text: "admin message 11.4", sender: "admin" }, { text: "admin message 11.5", sender: "admin" }, { text: "non-admin message 11.6", sender: "customer" }, { text: "admin message 11.7", sender: "admin" }, { text: "admin message 11.8", sender: "admin" }, { text: "non-admin message 11.9", sender: "customer" }] },
    { datetime: "wednesday", summary: "summary 12", messages: [{ text: "admin message 12.1", sender: "admin" }, { text: "admin message 12.2", sender: "admin" }, { text: "non-admin message 12.3", sender: "customer" }, { text: "admin message 12.4", sender: "admin" }, { text: "admin message 12.5", sender: "admin" }, { text: "non-admin message 12.6", sender: "customer" }, { text: "admin message 12.7", sender: "admin" }, { text: "admin message 12.8", sender: "admin" }, { text: "non-admin message 12.9", sender: "customer" }] },
  ]

  const chatsByDate = chats.reduce((result, item) => {
    const { datetime, ...rest } = item;

    if (datetime in result) {
      result[datetime].push(rest);
    } else {
      result[datetime] = [rest];
    }

    return result;
  }, {});


  const [selectedChat, setSelectedChat] = useState([])
  const [selected, setSelected] = useState(null);
  const [datePickerActive, setDatePickerActive] = useState(true)

  const handleSelect = (selectedId, selectedMessages) => {
    setSelected(selectedId);
    setSelectedChat(selectedMessages)
  };

  const navSections = []
  Object.entries(chatsByDate).forEach(([date, list]) => {
    navSections.push(<Navigation.Section
      key={date}
      title={date}
      items={list.map((currentChat, index) => ({
        key: date + index,
        label: currentChat.summary,
        selected: selected === date + index,
        onClick: () => {
          handleSelect(date + index, currentChat.messages)
        }
      }))}
    />)
  })




  const navMarkup = (
    <Navigation key="nav" location="/">
      <Navigation.Section
        title="Date Range"
        items={[]}
      />
      <DateRangePicker />
      <br />
      {navSections}
    </Navigation>
  )

  const chatMarkup = selectedChat.map((message, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: message.sender === 'admin' ? 'flex-start' : 'flex-end',
        marginBottom: '10px',
        marginLeft: message.sender === 'admin' ? "10px" : "0px",
        marginRight: message.sender === 'admin' ? "0px" : "10px",
      }}
    >
      <div
        style={{
          backgroundColor: message.sender === 'admin' ? '#e5e5e5' : '#008cff',
          color: message.sender === 'admin' ? '#000' : '#fff',
          borderRadius: '5px',
          padding: '10px',
          maxWidth: '70%',
        }}
      >
        {message.text}
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
