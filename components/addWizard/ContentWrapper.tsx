import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AdsCategoryBuilder from "./AdsCategoryBuilder";
import AdsForm from "./AdsForm";
import AdsUploadContext from "./AdsUploadContext";
import steps from "./AdsUploadConfig";
import Image from "next/image";
// import MobileScroll from "../wizard/MobileScroll";
// import Container from "../utility/Container";
// import { useMediaPredicate } from "react-media-hook";
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import _ from "lodash";
import Link from "next/link";

const Content = styled.div<LayoutProps | SpaceProps>`
  margin: 0 auto;
  overflow-y: scroll;
  flex: 1 1;
  position: relative;
  @media (max-width: 768px) {
    margin: 0;
    // height:70vh;
    flex-basis: 70%;
  }
  @media (max-width: 576px) {
    flex: 1 1 100%;
    // height:100vh;
  }
  // &::before{
  //     content:"";
  //     display:block;
  //     position:sticky;
  //     height:60px;
  //     width:100%;
  //     background:linear-gradient(to bottom, #f5f6fa, rgba(245, 246, 250, 0) 90%);
  //
  // }
  ${space}
  ${layout}
`;
const Flex = styled.div<SpaceProps | FlexboxProps>`
  display: flex;
  align-items: center;
  ${flexbox}
  ${space}
`;

const Header = styled.div`
  align-items: center;
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  &.default {
    cursor: pointer !important;
  }
  ${space}
`;
const Div = styled.div<LayoutProps>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #f5f6fa;
  height: auto;
  padding: 25px 9px;
  padding-bottom: 0;
  margin-bottom: 26px;
  z-index: 999;
  box-shadow: #f5f6fa 0px 20px 29px 0px;
  ${layout}
`;

const Whole = styled.div`
  width: 90%;
`;
const Address = styled.div<LayoutProps>`
  background: #f1f1f5;
  border: 1px solid #e8e8ec;
  display: flex;
  font-size: 11px;
  font-weight: 300;
  color: #474546;
  align-items: center;
  border-radius: 9px;
  padding: 0px 15px;
  width: fit-content;
  // margin-top: 10px;
  height: fit-content;
  max-width: 233px;
  min-width: fit-content;
  position: relative;
  right: 0;
  margin-top: 20px;
  // z-index: 1;
  box-shadow: rgb(108 108 108 / 38%) 0px 4px 20px -9px;
  & > div {
    margin: 0 5px;
  }
  ${layout}
`;

const AddressLink = styled.div`
  display: flex;
`;

export default function ContentWrapper() {
  const { step, setStep, setLevel, getWizard, setPaused, paused, editMode } =
    useContext(AdsUploadContext);
  const [shadow, setShadow] = useState(false);

  const Component = {
    [steps["select_category"]]: <AdsCategoryBuilder />,
    [steps["ads_form"]]: <AdsForm />,
  }[step];

  return (
    <Content
      height={["auto", "80vh"]}
      pb={["10px", "0"]}
      className={"scroll-d-none"}
    >
      <Div display={["block", "none"]}>
        <Header>
          <Flex justifyContent={"space-between"}>
            <Flex>
              <Img ml={"10px"}>
                <Image
                  height={30}
                  width={30}
                  src={"/icons/mobile sabte agahi.svg"}
                  alt=""
                />
              </Img>
              {editMode ? (
                <div>ثـبــت ویرایـش آگـهـی</div>
              ) : (
                <div>ثـبــت آگـهــی</div>
              )}
            </Flex>
            <Flex>
              <Img
                mr={"auto"}
                onClick={() => {
                  setStep(steps["select_category"]);
                  setLevel(0);
                }}
              >
                <Image
                  height={30}
                  width={30}
                  src={"/icons/mobile sabteagahi refresh.svg"}
                  alt=""
                />
              </Img>
              <a href={"/"}>
                <Img mr={"5px"}>
                  <Image
                    height={30}
                    width={30}
                    src={"/icons/close.svg"}
                    alt=""
                  />
                </Img>
              </a>
            </Flex>
          </Flex>
        </Header>
        {/* <MobileScroll /> */}
      </Div>
      <Address display={["none", "flex"]}>
        <AddressLink>
          <Link href={"/"}>نیازمندی های همشهری</Link>
          <Img className={"default"} ml={"5px"} mr={"5px"}>
            <Image
              height={10}
              width={10}
              src={"/icons/red arrow left.svg"}
              alt=""
            />
          </Img>
          {!editMode ? "ثــبت آگهـــی" : "ثــبت ویرایــش آگهـــی"}
        </AddressLink>
      </Address>
      {Component}
    </Content>
  );
}
