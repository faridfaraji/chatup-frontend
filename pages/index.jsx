import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";
import { useAuthenticatedFetch } from "../hooks";
import { getScanInfo, getShopId, getShopInfo } from "../utils/shopInfo";

export default function HomePage() {
  const afetch = useAuthenticatedFetch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShopId(afetch)
      .then((resp) => {
        if (resp) {
          return getShopInfo(resp, afetch)
        }
      })
      .then((resp) => {
        if (resp.latest_scan_id) {
          return getScanInfo(resp.latest_scan_id, afetch)
        }
      })
      .then(setLoading(false))
  }, []);

  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />

  return (
    homePage
  )
}
