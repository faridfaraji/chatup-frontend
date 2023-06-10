import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ChatPrompt, NegativeKeywords, SaveBar, PermissionCheckbox } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <SaveBar />
          <PermissionCheckbox />
          <br />
          <NegativeKeywords />
          {/* <ChatPrompt /> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
