import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Page } from "@shopify/polaris"
import { Robot } from "../components";
import {
  AnalyticsDonutMinor,
  MagicMinor
} from '@shopify/polaris-icons';

export default function index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Page
      title={t("Welcome.title")}
      primaryAction={
        <Button icon={MagicMinor} onClick={() => navigate("/Onboard?step=1&count=0")} >
          {t("Welcome.onboard")}
        </Button>
      }
      secondaryActions={
        <Button icon={AnalyticsDonutMinor} onClick={() => navigate("/Dashboard")} >
          {t("Welcome.dashboard")}
        </Button>
      }
    >
      <Robot />
    </Page>
  )
}
