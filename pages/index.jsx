import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";
import { getScanInfo, getShopId, getShopInfo } from "../utils/shopInfo";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const populate = () => {
    getShopId(fetch)
      .then((resp) => getShopInfo(resp, fetch))
      .then((resp) => getScanInfo(resp.latest_scan_id, fetch))
      .then(() => setLoading(false))
  }

  useEffect(() => populate(), [])

  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />

  return (
    homePage
  )
}
