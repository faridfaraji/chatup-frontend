import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import AwesoonProvider from "./components/providers/AwesoonProvider";
import { PolarisVizLightTheme, PolarisVizProvider } from "@shopify/polaris-viz";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  PolarisVizLightTheme["arc"]["thickness"] = 50
  PolarisVizLightTheme["chartContainer"]["minHeight"] = 250

  return (
    <AwesoonProvider>
      <PolarisProvider>
        <PolarisVizProvider themes={{ Default: PolarisVizLightTheme }}>
          <BrowserRouter>
            <AppBridgeProvider>
              <QueryProvider>
                <NavigationMenu
                  navigationLinks={[
                    {
                      label: t("NavigationMenu.configuration"),
                      destination: "/Configuration",
                    },
                    {
                      label: t("NavigationMenu.insights"),
                      destination: "/Insights",
                    },
                    {
                      label: t("NavigationMenu.chatHistory"),
                      destination: "/ChatHistory",
                    }
                  ]}
                  matcher={(link, location) => link.destination === location.pathname}
                />
                <Routes pages={pages} />
              </QueryProvider>
            </AppBridgeProvider>
          </BrowserRouter>
        </PolarisVizProvider>
      </PolarisProvider>
    </AwesoonProvider>
  );
}
