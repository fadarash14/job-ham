import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import MobileSideBarSection from "../sidebar/blocks/MobileSection";
// import { AppBar } from "../header/appBar";
// import SideBar from "../profile/SideBar";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import mobileConfig, {
  setShowHome,
  setShowProfile,
} from "../../store/mobilePage";
import { MobileProfileAppBar } from "./MobileProfileAppbar";
import ProfileSideBar from "./ProfileSideBar";
import { useRouter } from "next/router";
import {
  height,
  HeightProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
// import { setloading } from "../../store/pageConfig";
import { DownloadTypesApp } from "../../utils/mobileConfig";
// let manifest = require("../../public/manifest.json");
const Main = styled.div<LayoutProps>`
  ${layout}
`;
const Version = styled.div<LayoutProps | SpaceProps>`
  text-align: center;
  direction: ltr;
  font-size: 14px;
  ${space}
  ${layout}
`;

function MobileProfile() {
  //@ts-ignore
  const { showProfile } = useAppSelector((state) => state.mobileConfig);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [type, setType] = useState("راهنما");
  useEffect(() => {
    //@ts-ignore
    if (window && window.rahnama) {
      //@ts-ignore
      if (window?.rahnama?.getDownloadType) {
        // @ts-ignore
        let type = window?.rahnama?.getDownloadType();
        switch (type) {
          case DownloadTypesApp.Myket:
            setType("مایکت");
            break;
          case DownloadTypesApp.KafeBazar:
            setType("بازار");
            break;
        }
      }
    }
    const handleComplete = (url: string) => {
      dispatch(setShowHome(true));
    };
    router.events.on("routeChangeComplete", handleComplete);
  }, []);

  const profile_noBar = ["/user/profile"];

  let hide_bar = profile_noBar.find((i) => router.pathname.startsWith(i));
  // console.log(process.env.VERSION)

  function clear() {
    if (
      typeof window !== "undefined" &&
      //@ts-ignore
      window.rahnama &&
      //@ts-ignore
      window.rahnama.clearCache
    ) {
      //@ts-ignore
      window.rahnama.clearCache();
    }
  }

  return (
    <MobileSideBarSection show={showProfile}>
      <MobileProfileAppBar
        bg={"#f5f6fa"}
        color={"#474546"}
        button={"lipstick"}
        line={"1px solid #474546"}
        logo={false}
        profilePage={true}
        pro={Boolean(hide_bar)}
      />
      <Main height={hide_bar ? "auto !important" : ""}>
        <ProfileSideBar />
        {!!process?.env?.VERSION && (
          <Version onClick={clear} mx={"auto"} mt={"auto"}>
            {" "}
            {`${process.env.VERSION} v ${type}`}
          </Version>
        )}
      </Main>
    </MobileSideBarSection>
  );
}

export default MobileProfile;
