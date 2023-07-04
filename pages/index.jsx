import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";
import { getScanInfo, getShopId, getShopInfo } from "../utils/shopInfo";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    getShopId(fetch)
      .then((resp) => {
        if (resp) {
          return getShopInfo(resp, fetch)
        }
      })
      .then((resp) => {
        if (resp.latest_scan_id) {
          return getScanInfo(resp.latest_scan_id)
        }
      })
      .then(() => setLoading(false))
  }, []);

  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />

  return (
    homePage
  )
}
