import SideProvider from "./context/SideProvider";
import styled, { keyframes } from "styled-components";
import {
  DisplayProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
const SideBarLinks = dynamic(() => import("./sideBarLinks"));
const CheckBoxFilter = dynamic(() => import("./checkBoxFilter"));
const DownloadApp = dynamic(() => import("./blocks/DownloadApp"));
const CategoryBuilder = dynamic(() => import("./category/CategoryBuilder"));
const SideBarSection = dynamic(() => import("./blocks/Section"));
const CityAreaFilter = dynamic(() => import("./modalcity/CityAreaFilter"));
const ModalCity = dynamic(() => import("./modalcity/Modalcity"));
import Image from "next/image";
import { useMediaPredicate } from "react-media-hook";
import { slideInRight } from "react-animations";
import { slideInLeft } from "react-animations";
import {
  search_keys_to_set_get,
  sign_search_array,
} from "../../utils/searchConfig";
const CategoryFilterWrapper = dynamic(() => import("./CategoryFilterWrapper"));
import { Category } from "../../types";
import clsx from "clsx";
const MobileSideBar = dynamic(() => import("./MobileSideBar"));
import { useAppDispatch } from "@/store/hook";
const X: {
  [key: string]: { slug: "string"; id: number };
} = require("../../dictionaries/withId.json");
import _ from "lodash";
import { showSupportModal } from "../../store/pageConfig";
import Link from "next/link";
import router, { useRouter } from "next/router";
import MobileCategory from "../mobile modals/MobileCategory";
import dynamic from "next/dynamic";
import useUrlMaker from "../../hooks/useUrlMaker";
import useUrlValues from "../../hooks/useUrlValues";

const parents_category: {
  [key: string]: Category;
} = require("../../dictionaries/parents.json");

const fadeInDownAnimation = keyframes`${slideInRight}`;
const fadeOutDownAnimation = keyframes`${slideInLeft}`;

const Side = styled.div<LayoutProps>`
  background-color: rgba(71, 69, 70, 0.7);
  // border-top-left-radius: 50px;
  // border-bottom-left-radius: 50px;
  padding: 10px;
  backdrop-filter: blur(50px);
  height: 100%;
  transition: 0.7s width;
  overflow: hidden;
  will-change: width;
  ${layout}
`;

const Having = styled.div<LayoutProps>`
  animation: 1s ${fadeInDownAnimation};
  display: flex;
  ${layout}
`;
const SideContent = styled.div<PositionProps | LayoutProps>`
  right: 0;
  z-index: 1030;
  margin-bottom: 30px;
  display: flex;
  height: 100%;
  transition: width 2s, transform 2s;
  transition-timing-function: linear;
  ${layout}
  ${position}
`;

const PullDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  margin: auto 0;
`;

const CurvedTop = styled.div`
  width: 35px;
  height: 40px;
  overflow: hidden;
  position: relative;

  &::after {
    content: " ";
    display: block;
    width: 200%;
    height: 200%;
    position: absolute;
    border-radius: 20%;
    bottom: 0;
    right: 0;
    box-shadow: 50px 50px 0 0 rgba(71, 69, 70, 0.7);
  }
`;
const Div = styled.div`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  position: relative;
  background-color: rgba(71, 69, 70, 0.7);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  cursor: pointer;
  width: 35px;
  height: 100px;
`;
const move = keyframes`
 0% { left:50% }
 50% { left:40% }
 100% { left: 50% }
`;

const PullButton = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  cursor: pointer;
  align-items: center;
  height: 20px;
  &:hover {
    animation-name: ${move};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`;

const Flex = styled.div`
  display: flex;
  direction: rtl;
  color: white;
  margin: 10px 15px 10px 0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;
const Piece = styled.div<SpaceProps>`
  ${space}
`;

const CurvedBottom = styled.div`
  width: 35px;
  height: 40px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 200%;
    height: 200%;
    position: absolute;
    border-radius: 20%;
    bottom: 0;
    right: 0;
    top: 0;
    right: 0;
    box-shadow: 50px -50px 0 0 rgba(71, 69, 70, 0.7);
  }
`;
const fadein = keyframes`
 0% { opacity:0 }
 25% { opacity:0 }
 50% { opacity:0 }
 75% { opacity:0.7 }
 100% { opacity: 1 }
`;

const Shown = styled.div<DisplayProps | SpaceProps | HTMLElement | any>`
  width: 286px;
  overflow-y: auto;
  padding: 0 10px 0 0;
  height: 100%;
  overscroll-behavior: none;
  display: flex;
  direction: ltr;
  flex-direction: column;
  border-radius: 30px;
  animation-name: ${fadein};
  animation-duration: 0.35s;
  animation-iteration-count: 1;
  ${layout}
`;
const Cursor = styled.div`
  cursor: pointer;
`;

const Hide = styled.div<DisplayProps | SpaceProps | Element | LayoutProps>`
  display: flex;
  flex-direction: column;
  margin: 0 11px;
  animation-name: ${fadein};
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  ${layout}
`;

const Ul = styled.ul<LayoutProps>`
  list-style-type: none;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  ${layout}
`;
const Filters = styled.div`
  right: 0;
  top: -5px;
  padding: 1px 7px;
  text-align: center;
  position: absolute;
  background: #474546;
  border-radius: 9px;
  color: white;
  font-size: 12px;
`;

const CloseSideBarLi = styled.li<SpaceProps>`
  cursor: pointer;
  position: relative;
  width: 40px;
  margin: 8px 0;
  flex: 1 1 30px;

  &::before {
    position: absolute;
    content: "";
    display: block;
    height: 4px;
    width: 100%;
    background: #2d2c2c;
    top: -10px;
    left: 0;
    transform: translate(0%, 0%);
    border-radius: 15px;
  }
  &.filters::after {
    position: absolute;
    content: "";
    display: block;
    height: 4px;
    width: 100%;
    background: #2d2c2c;
    bottom: -10px;
    left: 0;
    transform: translate(0%, 0%);
    border-radius: 15px;
  }
`;
const CategoryName = styled.span`
  opacity: 0;
  display: block;
  transition: all 0.3s ease;
  font-size: 10px;
  text-align: center;
  color: white;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -2px;
  right: 0;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  & > div {
    margin: auto;
  }
`;
const CloseSideBarCategory = styled.li<SpaceProps | FlexboxProps>`
  position: relative;
  margin: 8px 0;
  width: 40px;
  cursor: pointer;
  align-items: center;
  &.category::after {
    position: absolute;
    content: "";
    display: block;
    height: 1px;
    width: 30%;
    background: #ffffff85;
    bottom: -8px;
    left: 50%;
    transform: translate(-50%, 50%);
  }
  img {
    transition: all 0.5s ease;
  }
  &:hover img {
    transform: translateY(-30px);
  }
  &:hover > span {
    opacity: 1;
  }
  ${space}
  ${flexbox}
`;

const Pages = styled.a<SpaceProps | FlexboxProps>`
  position: relative;
  margin: 6px 0;
  width: 40px;
  cursor: pointer;
  img {
    transition: all 0.5s ease;
  }
  &:hover img {
    transform: translateY(-30px);
  }
  &:hover > span {
    opacity: 1;
  }
  ${space}
  ${flexbox}
`;
const Support = styled.span<SpaceProps | FlexboxProps>`
  position: relative;
  margin: 6px 0;
  width: 40px;
  cursor: pointer;
  img {
    transition: all 0.5s ease;
  }
  &:hover img {
    transform: translateY(-30px);
  }
  &:hover > span {
    opacity: 1;
  }
  ${space}
  ${flexbox}
`;
const More = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-height: 775px) {
    display: none;
  }
`;

const MoreIcon = styled.li`
  cursor: pointer;
  position: relative;
  width: 40px;
  margin: 8px 0;
  flex: 1 1 30px;
  display: none;
  & > div {
    margin: auto;
  }
  @media (max-height: 775px) {
    display: flex !important;
  }
`;
const Lined = styled.div`
  &::after {
    content: "";
    display: block;
    height: 2px;
    background-color: rgba(71, 69, 70, 0.66);
    width: 100%;
    margin: 10px 0 5px 0;
  }
`;
const SideBarLink = [
  {
    Icon: "/icons/sidebar-tariff.svg",
    title: "تــــعرفه هـا",
    link: "/tariff",
  },
  {
    Icon: "/icons/sidebar-rule.svg",
    title: "قـوانـین و مـقــررات",
    link: "/rules",
  },
  {
    Icon: "/icons/branch.svg",
    title: "دفـــاتر همـــشـهری",
    link: "/branches",
  },
  { Icon: "/icons/about.svg", title: "دربــاره همـــشهری", link: "/about" },
];

const SideBarPermanentCheckFilters = [
  { title: "عـکـــس دار", nameInUrl: search_keys_to_set_get["hasPicture"] },
  { title: "فــــوری", nameInUrl: search_keys_to_set_get["instant"] },
  { title: "روزنـــامـه", nameInUrl: search_keys_to_set_get["newspaper"] },
  { title: "گــرافـیـکی", nameInUrl: search_keys_to_set_get["graphical"] },
];

export default function Sides() {
  const [display, setDisplay] = useState(false);
  const [mobile, setMobile] = useState(false);
  let shownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  const Eks: JSX.Element[] = SideBarPermanentCheckFilters.map(
    (filter: { title: string; nameInUrl: string }, key: number) => (
      <CheckBoxFilter
        key={key}
        title={filter.title}
        nameInUrl={filter.nameInUrl}
      />
    )
  );
  const isMobile = useMediaPredicate("(max-width:576px)");
  const pages = ["تعرفه", "قوانین", "دفاتر", "درباره ما", "پشتیبانی"];
  const escape = useRef<HTMLDivElement>(null);

  const handlerScroll = useCallback(
    _.throttle(() => {
      setDisplay(false);
    }, 100),
    []
  );

  useEffect(() => {
    //@ts-ignore
    if (typeof window !== "undefined" && window.rahnama) {
      setMobile(true);
    }
    let handler = (event: any) => {
      // @ts-ignore
      if (escape.current && !escape.current.contains(event.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("scroll", handlerScroll);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("scroll", handlerScroll);
    };
  }, []);
  const values = useUrlValues([search_keys_to_set_get["category"]]);

  const router = useRouter();
  const [isActive, setActive] = useState<number>(-1);
  const [, setSelectedCategory] = useUrlMaker();
  const openSide = (n: number) => {
    setActive(X[`${n}`].id);
  };

  useEffect(() => {
    /*find set active category in search url*/
    //@ts-ignore
    if (isActive !== -1 && isActive !== values?.category?.id) {
      if (X[isActive.toString()]) {
        setSelectedCategory({
          [search_keys_to_set_get["category"]]: X[isActive.toString()],
        });
      } else if (isActive === 0) {
        setSelectedCategory({ [search_keys_to_set_get["category"]]: null });
      }
    }
  }, [isActive]);

  useEffect(() => {
    let { key, search, ...res } = router.query;
    setHasFilter(res && Object.keys(res).length > 0);
  }, [router.query]);
  let { key, search, ...res } = router.query;
  function deleteFilters() {
    let { key, search, ...res } = router.query;
    setHasFilter(res && Object.keys(res).length > 0);
    router.push(
      {
        pathname: router.pathname,
        query: { key },
      },
      undefined,
      { shallow: true }
    );
  }

  let a: string[] = [];
  if (Array.isArray(router.query?.key)) {
    a = router.query?.key;
  } else if (router.query?.key) {
    a.push(router.query?.key);
  }

  return (
    <SideProvider>
      <MobileSideBar color={"#474546"} border={"rgba(71, 69, 70,0.12)"} />
      {/*<MobileCategory/>*/}
      <SideContent display={["none", "flex"]} position={"fixed"} ref={escape}>
        <Having>
          <Side width={display ? "310px" : "80px"}>
            {display ? (
              <Shown ref={shownRef}>
                <CategoryBuilder />
                <SideBarSection
                  title={"فـیـلتــر ها"}
                  icon={
                    hasFilter ? (
                      <Cursor>
                        <Image
                          onClick={deleteFilters}
                          src={"/icons/yellow-trash-bin.svg"}
                          alt={"حذف همه"}
                          width={25}
                          height={25}
                        />
                      </Cursor>
                    ) : (
                      <Image
                        src={"/icons/Filters icon.svg"}
                        width={20}
                        height={20}
                        alt={"فیلتر"}
                      />
                    )
                  }
                >
                  <CityAreaFilter mobile={isMobile} />
                  <CategoryFilterWrapper mobile={isMobile} />
                  {Eks}
                </SideBarSection>
                <Lined />
                {SideBarLink.map((obj, key) => (
                  <SideBarLinks key={key} {...obj} />
                ))}
                <Flex onClick={() => dispatch(showSupportModal(true))}>
                  <div>
                    <Image
                      src={"/icons/support.svg"}
                      height={15}
                      width={15}
                      alt={"پشتیبانی"}
                    />
                  </div>
                  <Piece mr={"10px"}>پـشــتـیبــانی</Piece>
                </Flex>
                {!mobile && <DownloadApp />}
              </Shown>
            ) : (
              <Hide ref={shownRef}>
                <Ul>
                  {[
                    1128, 1161, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
                  ].map((n) => {
                    return (
                      <CloseSideBarCategory
                        onClick={() => {
                          openSide(n);
                        }}
                        className={clsx({ category: n !== 1283 })}
                        key={n}
                        flex={"1 1 30px"}
                      >
                        <CategoryName>
                          <div>{parents_category[String(n)]["name"]}</div>
                        </CategoryName>
                        <Image
                          src={
                            a.includes(X[n].slug)
                              ? `/icons/status-sidebar/${n}s.svg`
                              : `/icons/closeSidebar/${n}.svg`
                          }
                          fill
                          alt={""}
                        />
                      </CloseSideBarCategory>
                    );
                  })}
                  <CloseSideBarLi
                    onClick={() => setDisplay(true)}
                    className={"filters"}
                  >
                    <Image
                      src={`/icons/closeSidebar/filters.svg`}
                      fill
                      alt=""
                    />
                    {Object.keys(res).length !== 0 && (
                      <Filters>{Object.keys(res).length}</Filters>
                    )}
                  </CloseSideBarLi>
                  <More>
                    {["tariff", "rules", "branches", "about"].map(
                      (n, index) => {
                        return (
                          <Link
                            href={`/${n}`}
                            key={index}
                            passHref
                            prefetch={false}
                          >
                            <Pages
                              className={clsx({
                                category: n !== "support.svg",
                              })}
                              key={n}
                              flex={"1 1 30px"}
                            >
                              <CategoryName>
                                <div>{pages[index]}</div>
                              </CategoryName>
                              <Image
                                src={`/icons/closeSidebar/${n}.svg`}
                                layout={"fill"}
                                alt={"closeSidebar"}
                              />
                            </Pages>
                          </Link>
                        );
                      }
                    )}
                    {/* Start support section */}
                    <Support
                      onClick={() => dispatch(showSupportModal(true))}
                      key={"support"}
                      flex={"1 1 30px"}
                    >
                      <CategoryName>
                        <div>{pages[4]}</div>
                      </CategoryName>
                      <Image
                        src={`/icons/closeSidebar/support.svg`}
                        layout={"fill"}
                        alt={"support"}
                      />
                    </Support>
                    {/* End support section */}
                    <Link href={"/download"} passHref>
                      <CloseSideBarLi>
                        <Image
                          src={`/icons/closeSidebar/download-side.svg`}
                          layout={"fill"}
                          alt="دانلود اپلیکیشن"
                        />
                      </CloseSideBarLi>
                    </Link>
                  </More>
                  <MoreIcon className={"more"}>
                    <div>
                      <Image
                        src={"/icons/more.svg"}
                        width={30}
                        height={30}
                        alt={"more"}
                      />
                    </div>
                  </MoreIcon>
                </Ul>
              </Hide>
            )}
          </Side>
          <PullDiv onClick={() => setDisplay(!display)}>
            <CurvedTop></CurvedTop>
            <Div>
              <PullButton>
                {display ? (
                  <Image
                    height={20}
                    width={18}
                    src={"/icons/Group 1422.svg"}
                    alt=""
                  />
                ) : (
                  <Image
                    height={20}
                    width={18}
                    src={"/icons/Group 1172.svg"}
                    alt=""
                  />
                )}
              </PullButton>
            </Div>
            <CurvedBottom></CurvedBottom>
          </PullDiv>
        </Having>
      </SideContent>
      <ModalCity />
    </SideProvider>
  );
}
