import { SkeletonHomePage, LoadedHomePage } from "../components";
import { useEffect, useState } from "react";
import ExitIframe from "../pages/ExitIframe";
import { useActivePlan } from "../hooks";

export default function HomePage() {
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
  return <LoadedHomePage />
}
