import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import ExitIframe from "../pages/ExitIframe";
import { useBilling, useLatestScan, useShop } from "../hooks";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [redirectUri, setRedirectUri] = useState(null);

  const checkBilling = useBilling();

  const populate = () => {
    checkBilling()
      .then((response) => setRedirectUri(response.redirect_ul))
      .then(() => { if (!redirectUri) { setLoading(false) } })
  }

  useEffect(() => populate(), [])
  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />
  return redirectUri ? <ExitIframe redirectUri={redirectUri} /> : homePage;
}
