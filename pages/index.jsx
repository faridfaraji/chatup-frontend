import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  HorizontalStack,
  Link,
  Text,
  Button,
  Divider,
  AlphaCard,
  VerticalStack,
  Box,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import {
  ChatPrompt,
  NegativeKeywords,
  ScanButton,
  SaveBar,
  PermissionCheckbox,
  Title,
  ChatBot,
  LoremIpsum,
} from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  const cardTitle = "headingLg"
  const commonPadding = "4"

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <div id="scan" />
          <AlphaCard >
            <Text variant={cardTitle}>
              1. Scan your shop with Chat Up
            </Text>
            <VerticalStack>
              <LoremIpsum padding={commonPadding} content={t("HomePage.scanInfo")}/>
              <ScanButton fullWidth={true} />
            </VerticalStack>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <AlphaCard>
            <Text variant={cardTitle}>
              2. Define hard boundaries
            </Text>
            <NegativeKeywords padding={commonPadding} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <AlphaCard>
            <Text variant={cardTitle}>
              3. Set a personality
            </Text>
            <LoremIpsum padding={commonPadding} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <AlphaCard>
            <Text variant={cardTitle}>
              4. Enable your new customer service agent
            </Text>
            <LoremIpsum padding={commonPadding} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <AlphaCard>
            <Text variant={cardTitle}>
              5. Try them out!
            </Text>
            <LoremIpsum padding={commonPadding} />
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
