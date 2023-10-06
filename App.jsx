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
  PolarisVizLightTheme["chartContainer"]["minHeight"] = 300

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
                      label: t("NavigationMenu.dashboard"),
                      destination: "/Dashboard",
                    },
                    {
                      label: t("NavigationMenu.messages"),
                      destination: "/Messages",
                    },
                    {
                      label: t("NavigationMenu.analytics"),
                      destination: "/Analytics",
                    },
                    {
                      label: t("NavigationMenu.settings"),
                      destination: "/Settings",
                    },
                    {
                      label: t("NavigationMenu.plan"),
                      destination: "/Plan",
                    },
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
