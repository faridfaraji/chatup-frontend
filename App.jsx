import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

import { getShopInfo } from "./utils/shopInfo";
import { useEffect } from "react";
import { PolarisVizProvider } from "@shopify/polaris-viz-core";

export default function App() {
  // Set constants
  useEffect(() => {
    getShopInfo();
  }, []);

  polarisVizTheme = "Light"

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <PolarisVizProvider theme={polarisVizTheme}>
              <NavigationMenu
                navigationLinks={[
                  {
                    label: t("NavigationMenu.analytics"),

                    destination: "/Analytics",
                  },
                  {
                    label: t("NavigationMenu.conversationLibrary"),
                    destination: "/ConversationLibrary",
                  }
                ]}
              />
              <Routes pages={pages} />
            </PolarisVizProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
