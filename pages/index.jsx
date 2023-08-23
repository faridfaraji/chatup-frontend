import { useEffect, useState } from "react";
import { useActivePlan, usePlanSetter } from "../hooks";
import Landing from "./Landing";
import constants from "../constants";
import { useTranslation } from "react-i18next";
import ExitIframe from "./ExitIframe";
import { SkeletonHomePage } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  const getActivePlan = useActivePlan();
  const setPlan = usePlanSetter();
  const [redirectUri, setUri] = useState(false);
  const [landing, setLanding] = useState(<SkeletonHomePage />)

  useEffect(() => {
    getActivePlan()
      .then((data) => {
        // Plan IDs are of the form [XX]
        // [00] is the non-plan (unbilled) so we redirect them to billing pages
        if (!parseInt(data?.name.slice(1, 3))) {
          setPlan(constants.base_plan, t(`Billing.${constants.base_plan_copy_id}`))
            .then((data) => {
              setUri(data?.confirmation_page_url)
            })
        } else {
          setLanding(<Landing />)
        }
      })
  }, [])

  return redirectUri ? <ExitIframe redirectUri={redirectUri} /> : landing
}