import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import cache from "../cache";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => checkLoaded(), []);

  const checkLoaded = function () {
    if (cache.shop_identifier === 0) {
      setLoading(true)
      setTimeout(checkLoaded, 50)
    } else {
      setLoading(false)
    }
  }

  const homePage = loading ? <SkeletonHomePage /> : <LoadedHomePage />

  return (
    homePage
  )
}
