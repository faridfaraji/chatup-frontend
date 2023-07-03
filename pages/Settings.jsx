import {
  Page,
  useBreakpoints,
  VerticalStack,
  AlphaCard,
  HorizontalGrid,
  Box,
  TextField,
  Divider,
  Text
} from "@shopify/polaris";
import { NegativeKeywords, Temperature } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";

import { useTranslation, Trans } from "react-i18next";
import { Setting } from "../components/Setting";

export default function Settings() {
  const { t } = useTranslation();
  const { smUp } = useBreakpoints();
  return (
    <Page
      divider
      // primaryAction={{ content: "View on your store", disabled: true }}
      // secondaryActions={[
      //   {
      //     content: "Duplicate",
      //     accessibilityLabel: "Secondary action label",
      //     onAction: () => alert("Duplicate action"),
      //   },
      // ]}
    >

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
    </Page >
  )
}