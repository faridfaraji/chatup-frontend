import { AlphaCard, Page, Layout, Text, Button, Popover, DatePicker, Scrollable, HorizontalStack, VerticalStack, Box } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { LoremIpsum } from "../components";

export default function ChatHistory() {
  const [popoverActive, setPopoverActive] = useState(false)
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Date Range
    </Button>
  );

  const [{ month, year }, setDate] = useState({ month: 7, year: 2023 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Fri July 07 2023 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon July 10 2023 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    [],
  );

  var chats = [
    ["info box"],
    ["chat summary 1", { text: "admin message 1.1", sender: "admin" }, { text: "admin message 1.2", sender: "admin" }, { text: "non-admin message 1.3", sender: "customer" }, { text: "admin message 1.4", sender: "admin" }, { text: "admin message 1.5", sender: "admin" }, { text: "non-admin message 1.6", sender: "customer" }, { text: "admin message 1.7", sender: "admin" }, { text: "admin message 1.8", sender: "admin" }, { text: "non-admin message 1.9", sender: "customer" },],
    ["chat summary 2", { text: "admin message 2.1", sender: "admin" }, { text: "admin message 2.2", sender: "admin" }, { text: "non-admin message 2.3", sender: "customer" }, { text: "admin message 2.4", sender: "admin" }, { text: "admin message 2.5", sender: "admin" }, { text: "non-admin message 2.6", sender: "customer" }, { text: "admin message 2.7", sender: "admin" }, { text: "admin message 2.8", sender: "admin" }, { text: "non-admin message 2.9", sender: "customer" },],
    ["chat summary 3", { text: "admin message 3.1", sender: "admin" }, { text: "admin message 3.2", sender: "admin" }, { text: "non-admin message 3.3", sender: "customer" }, { text: "admin message 3.4", sender: "admin" }, { text: "admin message 3.5", sender: "admin" }, { text: "non-admin message 3.6", sender: "customer" }, { text: "admin message 3.7", sender: "admin" }, { text: "admin message 3.8", sender: "admin" }, { text: "non-admin message 3.9", sender: "customer" },],
    ["chat summary 4", { text: "admin message 4.1", sender: "admin" }, { text: "admin message 4.2", sender: "admin" }, { text: "non-admin message 4.3", sender: "customer" }, { text: "admin message 4.4", sender: "admin" }, { text: "admin message 4.5", sender: "admin" }, { text: "non-admin message 4.6", sender: "customer" }, { text: "admin message 4.7", sender: "admin" }, { text: "admin message 4.8", sender: "admin" }, { text: "non-admin message 4.9", sender: "customer" },],
    ["chat summary 5", { text: "admin message 5.1", sender: "admin" }, { text: "admin message 5.2", sender: "admin" }, { text: "non-admin message 5.3", sender: "customer" }, { text: "admin message 5.4", sender: "admin" }, { text: "admin message 5.5", sender: "admin" }, { text: "non-admin message 5.6", sender: "customer" }, { text: "admin message 5.7", sender: "admin" }, { text: "admin message 5.8", sender: "admin" }, { text: "non-admin message 5.9", sender: "customer" },],
    ["chat summary 6", { text: "admin message 6.1", sender: "admin" }, { text: "admin message 6.2", sender: "admin" }, { text: "non-admin message 6.3", sender: "customer" }, { text: "admin message 6.4", sender: "admin" }, { text: "admin message 6.5", sender: "admin" }, { text: "non-admin message 6.6", sender: "customer" }, { text: "admin message 6.7", sender: "admin" }, { text: "admin message 6.8", sender: "admin" }, { text: "non-admin message 6.9", sender: "customer" },],
    ["chat summary 7", { text: "admin message 7.1", sender: "admin" }, { text: "admin message 7.2", sender: "admin" }, { text: "non-admin message 7.3", sender: "customer" }, { text: "admin message 7.4", sender: "admin" }, { text: "admin message 7.5", sender: "admin" }, { text: "non-admin message 7.6", sender: "customer" }, { text: "admin message 7.7", sender: "admin" }, { text: "admin message 7.8", sender: "admin" }, { text: "non-admin message 7.9", sender: "customer" },],
    ["chat summary 8", { text: "admin message 8.1", sender: "admin" }, { text: "admin message 8.2", sender: "admin" }, { text: "non-admin message 8.3", sender: "customer" }, { text: "admin message 8.4", sender: "admin" }, { text: "admin message 8.5", sender: "admin" }, { text: "non-admin message 8.6", sender: "customer" }, { text: "admin message 8.7", sender: "admin" }, { text: "admin message 8.8", sender: "admin" }, { text: "non-admin message 8.9", sender: "customer" },],
    ["chat summary 9", { text: "admin message 9.1", sender: "admin" }, { text: "admin message 9.2", sender: "admin" }, { text: "non-admin message 9.3", sender: "customer" }, { text: "admin message 9.4", sender: "admin" }, { text: "admin message 9.5", sender: "admin" }, { text: "non-admin message 9.6", sender: "customer" }, { text: "admin message 9.7", sender: "admin" }, { text: "admin message 9.8", sender: "admin" }, { text: "non-admin message 9.9", sender: "customer" },],
    ["chat summary 10", { text: "admin message 10.1", sender: "admin" }, { text: "admin message 10.2", sender: "admin" }, { text: "non-admin message 10.3", sender: "customer" }, { text: "admin message 10.4", sender: "admin" }, { text: "admin message 10.5", sender: "admin" }, { text: "non-admin message 10.6", sender: "customer" }, { text: "admin message 10.7", sender: "admin" }, { text: "admin message 10.8", sender: "admin" }, { text: "non-admin message 10.9", sender: "customer" },],
    ["chat summary 11", { text: "admin message 11.1", sender: "admin" }, { text: "admin message 11.2", sender: "admin" }, { text: "non-admin message 11.3", sender: "customer" }, { text: "admin message 11.4", sender: "admin" }, { text: "admin message 11.5", sender: "admin" }, { text: "non-admin message 11.6", sender: "customer" }, { text: "admin message 11.7", sender: "admin" }, { text: "admin message 11.8", sender: "admin" }, { text: "non-admin message 11.9", sender: "customer" },],
    ["chat summary 12", { text: "admin message 12.1", sender: "admin" }, { text: "admin message 12.2", sender: "admin" }, { text: "non-admin message 12.3", sender: "customer" }, { text: "admin message 12.4", sender: "admin" }, { text: "admin message 12.5", sender: "admin" }, { text: "non-admin message 12.6", sender: "customer" }, { text: "admin message 12.7", sender: "admin" }, { text: "admin message 12.8", sender: "admin" }, { text: "non-admin message 12.9", sender: "customer" },],
  ]

  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  const handleSelectMessage = (index) => {
    setSelectedMessageIndex(index);
  };


  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar />
      <HorizontalStack align="space-between">
        <Box width="20%">
          <AlphaCard sectioned>

            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>

              <VerticalStack>
                {chats.map((currentChat, index) => (
                  <div onClick={() => handleSelectMessage(index)} style={{ padding: '10px', backgroundColor: selectedMessageIndex == index ? '#008cff' : '#fff' }}>
                    {/* <AlphaCard key={index} > */}
                    <Text>
                      <p style={{ color: selectedMessageIndex == index ? '#fff' : '#000' }}>
                        {selectedMessageIndex == index ? "selected chat" : currentChat[0]}
                      </p>
                    </Text>
                    {/* </AlphaCard> */}
                  </div>
                ))}
              </VerticalStack>
            </div>
          </AlphaCard>
        </Box>
        <Box width="78%">

          <AlphaCard sectioned>
            {selectedMessageIndex && (
              <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                {chats[selectedMessageIndex].map((message, messageIndex) => {

                  // console.log(message)
                  return (
                    <div
                      key={messageIndex}
                      style={{
                        display: 'flex',
                        justifyContent: message.sender === 'admin' ? 'flex-start' : 'flex-end',
                        marginBottom: '10px',
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
                  )
                })}
              </div>
            ) || (
                <Layout>
                  <Layout.Section>

                    {/* <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                  > */}
                    <DatePicker
                      month={month}
                      year={year}
                      onChange={setSelectedDates}
                      onMonthChange={handleMonthChange}
                      selected={selectedDates}
                      allowRange
                    />
                  </Layout.Section>
                  {/* // </Popover> */}
                  <Layout.Section>

                    <LoremIpsum padding="4" />
                    {/* // content={t("ChatHistory.infoBox")}/> */}
                  </Layout.Section>
                </Layout>
              )
            }
          </AlphaCard>
        </Box>
      </HorizontalStack>
      {/* </Layout> */}
    </Page>
  );
}
