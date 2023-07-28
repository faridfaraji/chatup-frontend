import { LoadedHomePage, SkeletonWelcome } from "../components";
import { useEffect, useState } from "react";
import ExitIframe from "../pages/ExitIframe";
import { useActivePlan, useLatestScan, useMessageCounts, useScanner, useShopValidator } from "../hooks";

export default function HomePage() {
  const getActivePlan = useActivePlan();
  const validateShop = useShopValidator();
  const getMessages = useMessageCounts();
  const scanShop = useScanner();
  const getScan = useLatestScan();


  // const [page, setPage] = useState(<SkeletonHomePage /> );

  // const [loading, setLoading] = useState(true);
  // const [redirectUri, setRedirectUri] = useState(null);

  // const checkActivePlan = useActivePlan();

  // const populate = () => {
  //   checkActivePlan()
  //     .then((response) => setRedirectUri(response.redirect_ul))
  //     .then(() => { if (!redirectUri) { setLoading(false) } })
  // }

  // useEffect(() => populate(), [])
  // const homePage = 
  // loading ? <SkeletonHomePage /> : 
  // return redirectUri ? <ExitIframe redirectUri={redirectUri} /> : homePage;

  // const [loading, setLoading] = useState(true);

  // const load = () => {
  //   getActivePlan().then(() => validateShop()).then(() => getMessages()).then(() => getScan()).then(() => setLoading(false))
  // }

  // useEffect(() => setPage(<PlanImage plan={"paper"} />), [])
  
  // const page = loading ? <SkeletonWelcome /> : <LoadedHomePage />
  const page = <LoadedHomePage />

  // useEffect(() => load(), [])

  return page
}
