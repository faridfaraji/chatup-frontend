import {
  Page,
  useBreakpoints,
  VerticalStack,
  Divider,
} from "@shopify/polaris";
import { NegativeKeywords, Temperature } from "../components";
import { useTranslation } from "react-i18next";
import { Setting } from "../components/Setting";

export default function Settings() {
  const { t } = useTranslation();
  const { smUp } = useBreakpoints();
  return (
    <Page divider>
      <VerticalStack gap={{ xs: "8", sm: "4" }}>
        <Setting 
          title={t("Settings.negKeysTitle")}
          short={t("Settings.negKeysShort")}
          inputs={[
            {
              title: "negKeys",
              copy: t("Settings.negKeysCopy"),
              component: <NegativeKeywords />
            }
          ]}
        />
        {smUp ? <Divider /> : null}
          <Setting
            title={t("Settings.tempTitle")}
            short={t("Settings.tempShort")}
            inputs={[
              {
                title: "temp",
                copy: t("Settings.tempCopy"),
                component: <Temperature />
              }
            ]}
          />
      </VerticalStack>
    </Page>
  )
}