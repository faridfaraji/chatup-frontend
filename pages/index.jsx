import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";
import { getScanInfo, getShopId, getShopInfo } from "../utils/shopInfo";
import { useAuthenticatedFetch } from "../hooks";
import ExitIframe from "../pages/ExitIframe";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const [redirectUri, setRedirectUri] = useState(null);
  
  const populate = () => {
    getShopId(fetch)
      .then((resp) => {
        if (resp.redirect_url) {
          setRedirectUri(resp.redirect_url);
        } else {
          return getShopInfo(resp, fetch)
            .then((resp) => {
              if (resp.latest_scan_id) {
                return getScanInfo(resp.latest_scan_id);
              }
            })
            .then(() => setLoading(false));
        }
      });
  }

  useEffect(() => populate(), [])

  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />
  return redirectUri ? <ExitIframe redirectUri={redirectUri} /> : homePage;
}
