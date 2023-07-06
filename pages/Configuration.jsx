import {
  Page,
  useBreakpoints,
  VerticalStack,
  Divider,
} from "@shopify/polaris";
import { NegativeKeywords, Temperature } from "../components";
import { useTranslation } from "react-i18next";
import { Setting } from "../components/Setting";
import { EmbedButton } from "../components/buttons";

export default function Configuration() {
  const { t } = useTranslation();
  const { smUp } = useBreakpoints();
  return (
    <Page
      divider
      primaryAction={<EmbedButton />}
    >
      <VerticalStack gap={{ xs: "8", sm: "4" }}>
        <Setting
          title={t("Configuration.negKeysTitle")}
          short={t("Configuration.negKeysShort")}
          inputs={[
            {
              title: "negKeys",
              copy: t("Configuration.negKeysCopy"),
              component: <NegativeKeywords label={t("Configuration.negKeysTitle")} />
            }
          ]}
        />
        {smUp ? <Divider /> : null}
        <Setting
          title={t("Configuration.tempTitle")}
          short={t("Configuration.tempShort")}
          inputs={[
            {
              title: "temp",
              copy: t("Configuration.tempCopy"),
              component: <Temperature label={t("Configuration.tempTitle")} />
            }
          ]}
        />
      </VerticalStack>
    </Page>
  )
}