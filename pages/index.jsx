import '@shopify/polaris-viz/build/esm/styles.css';
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AlphaCard, HorizontalGrid, Link, Page, Text, VerticalStack, useBreakpoints } from "@shopify/polaris"
import { CardTitle, PaddedCell, Robot } from "../components";
import { useLatestScan, useScanner } from '../hooks';
import { useEffect } from 'react';

export default function index() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bp = useBreakpoints();
  const getLatestScan = useLatestScan();
  const scan = useScanner();

  useEffect(() => {
    getLatestScan().then(data => {
      if(!["COMPLETED", "PENDING", "IN_PROGRESS"].includes(data?.status)) {
        scan()
      }
    })
  })

  return (
    <Page>
      <AlphaCard>
        <HorizontalGrid columns={{ sm: 1, md: "1fr 1fr" }} gap="10">
          <VerticalStack>
            <PaddedCell padding={["0", "5", "0", "5"]}>
              <CardTitle title={t("Welcome.title")} size={"Lg"} alignment={"start"} linebreak />
              <Text
                as="p"
                variant="bodyMd"
                fontWeight={bp.mdUp ? "medium" : "regular"} >
                <Trans
                  i18nKey={"Welcome.onboardCallout"}
                  components={[<Link onClick={() => navigate("/Onboard?step=1&count=0")} />]} />
                <br />
                <br />
                <Trans
                  i18nKey={"Welcome.dashboardCallout"}
                  components={[<Link onClick={() => navigate("/Dashboard")} />]} />
              </Text>
            </PaddedCell>
          </VerticalStack>
          <Robot />
        </HorizontalGrid>
      </AlphaCard>
    </Page>
  )
}
