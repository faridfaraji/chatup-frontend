import {
  Box,
  Page,
  useBreakpoints,
  VerticalStack,
  Divider,
  HorizontalStack,
  HorizontalGrid,
  AlphaCard,
} from "@shopify/polaris";
import { LoremIpsum, NegativeKeywords, Temperature } from "../components";
import { useTranslation } from "react-i18next";
import { Setting } from "../components/Setting";
import { EmbedButton } from "../components/buttons";

export default function Configuration() {
  const { t } = useTranslation();
  const { smUp } = useBreakpoints();
  return (
    <Page
    // divider
    // primaryAction={<EmbedButton />}
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
        {smUp ? <Divider /> : null}
        <Box
          paddingInlineStart={{ xs: 4, sm: 0 }}
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
          <AlphaCard bg="--p-color-bg-inverse-active">
            <HorizontalGrid columns={{ xs: "1fr", md: "5fr 2fr" }} gap="4" alignItems="center">
              <LoremIpsum content={t("Configuration.bottomCopy")} />
              <EmbedButton />
            </HorizontalGrid>
          </AlphaCard>
        </Box>
      </VerticalStack>
    </Page>
  )
}