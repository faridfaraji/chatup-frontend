import { AlphaCard, Page, Layout, TextContainer, Text, Button, Popover, DatePicker } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";

export default function ConversationLibrary() {
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

  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar />
      <Layout>
        <Layout.Section>
          <AlphaCard sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </AlphaCard>
          <AlphaCard sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section secondary>
          <AlphaCard sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
