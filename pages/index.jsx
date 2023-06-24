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
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import {
  ChatPrompt,
  NegativeKeywords,
  SaveBar,
  PermissionCheckbox,
  Title,
  ChatBot,
} from "../components";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Page fullWidth>
      {/* <TitleBar /> */}
      <Layout>
        <Layout.Section>
          <Title />
        </Layout.Section>
        <Layout.Section >
          {/* <SaveBar /> */}
          {/* <PermissionCheckbox /> */}
          <ChatBot />
          {/* <br /> */}
          {/* <NegativeKeywords /> */}
          {/* <ChatPrompt /> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
