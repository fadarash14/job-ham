import Container from "../utility/Container";
import Image from "next/image";
import styled from "styled-components";
import {
  borderBottom,
  BorderProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
} from "styled-system";
import Link from "next/link";
import { useState } from "react";
import { element, string } from "prop-types";
import { useRouter } from "next/router";
import {
  setshowTabletCategory,
  showSupportModal,
} from "../../store/pageConfig";
import { useAppDispatch } from "@/store/hook";
import { useAppSelector } from "@/store/hook";
// import SupportModal from "../wizard/SupportModal";
import Cookies from "js-cookie";

const ASide = styled.aside<LayoutProps>`
  position: sticky;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  ${layout}
`;
const Section = styled.ul<TypographyProps>`
  list-style-type: none;
  background-color: rgba(245, 246, 250, 0.4);
  padding: 0px 10px;

  ${typography}
`;
const Li = styled.li<BorderProps>`
  padding: 5px 0px;
  &:not(:last-child)::after {
    content: "";
    display: block;
    background: RGB(231, 231, 232);
    height: 1px;
    width: 100%;
    margin-top: 8px;
  }
  ${borderBottom}
`;
const ListInside = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 8px;
  cursor: pointer;
  .pointer {
    opacity: 0;
  }
  &:hover {
    background-color: RGBA(219, 20, 61, 5%);
    border-radius: 15px;
    .pointer {
      opacity: 1;
    }
  }
  &.active {
    background-color: RGBA(219, 20, 61, 5%);
    border-radius: 15px;
    .pointer {
      opacity: 1;
    }
  }
`;
const SideTitle = styled.div`
  color: RGB(71, 69, 70);
  padding-right: 12px;
  margin-left: auto;
`;

export default function ProfileSideBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  let token = Cookies.get("token"); // => 'token'

  return (
    <ASide>
      {token && (
        <Section>
          <Li onClick={() => dispatch(setshowTabletCategory(false))}>
            <Link href="/user/profile/mywizard">
              <ListInside
                className={
                  router.pathname == "/user/profile/mywizard" ? "active" : ""
                }
              >
                <Image src={"/icons/MyAds.svg"} height={30} width={30} alt="" />
                <SideTitle>آگهی های من</SideTitle>
                <Image
                  src={"/icons/Pointer.svg"}
                  height={12}
                  width={12}
                  className={"pointer"}
                  alt=""
                />
              </ListInside>
            </Link>
          </Li>
          <Li onClick={() => dispatch(setshowTabletCategory(false))}>
            <Link href="/user/profile/marks">
              <ListInside
                className={
                  router.pathname == "/user/profile/marks" ? "active" : ""
                }
              >
                <Image
                  src={"/icons/NoteIcon.svg"}
                  height={30}
                  width={30}
                  alt=""
                />
                <SideTitle>یادداشت و نشان شده ها</SideTitle>
                <Image
                  src={"/icons/Pointer.svg"}
                  height={12}
                  width={12}
                  className={"pointer"}
                  alt=""
                />
              </ListInside>
            </Link>
          </Li>
          <Li onClick={() => dispatch(setshowTabletCategory(false))}>
            <Link href="/user/profile/invoicehistory">
              <ListInside
                className={
                  router.pathname == "/user/profile/invoicehistory"
                    ? "active"
                    : ""
                }
              >
                <Image
                  src={"/icons/InvoiceIcon.svg"}
                  height={30}
                  width={30}
                  alt=""
                />
                <SideTitle>تاریخچه پرداخت و فاکتور</SideTitle>
                <Image
                  src={"/icons/Pointer.svg"}
                  height={12}
                  width={12}
                  className={"pointer"}
                  alt=""
                />
              </ListInside>
            </Link>
          </Li>
          {/*<Li>*/}
          {/*    <Link href="/user/profile/viewHistory" >*/}
          {/*    <ListInside className={router.pathname == "/user/profile/viewHistory" ? "active" : ""}>*/}
          {/*        <Image src={'/icons/HistoryIcon.svg'} height={30} width={30}/>*/}
          {/*            <SideTitle>تاریخچه بازدیدها</SideTitle>*/}
          {/*        <Image src={'/icons/Pointer.svg'} height={12} width={12} className={"pointer"}/>*/}
          {/*    </ListInside>*/}
          {/*    </Link>*/}
          {/*</Li>*/}
          <Li>
            <Link href="/user/profile/pw">
              <ListInside
                className={
                  router.pathname == "/user/profile/password" ? "active" : ""
                }
              >
                <Image
                  src={"/icons/PasswordIcon.svg"}
                  height={30}
                  width={30}
                  alt=""
                />
                <SideTitle>رمز عبور</SideTitle>
                <Image
                  src={"/icons/Pointer.svg"}
                  height={12}
                  width={12}
                  className={"pointer"}
                  alt=""
                />
              </ListInside>
            </Link>
          </Li>
        </Section>
      )}
      <Section>
        <Li onClick={() => dispatch(setshowTabletCategory(false))}>
          <Link href="/tariff">
            <ListInside
              className={router.pathname == "/tariff" ? "active" : ""}
            >
              <Image
                src={"/icons/TariffsIcon.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>تعرفه ها</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li>
        <Li onClick={() => dispatch(setshowTabletCategory(false))}>
          <Link href="/rules">
            <ListInside className={router.pathname == "/rules" ? "active" : ""}>
              <Image
                src={"/icons/RuleIcon.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>قوانین و مقررات</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li>
        <Li onClick={() => dispatch(setshowTabletCategory(false))}>
          <Link href="/branches">
            <ListInside
              className={router.pathname == "/branches" ? "active" : ""}
            >
              <Image
                src={"/icons/LocationIcon.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>دفاتر همشهری</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li>
        <Li onClick={() => dispatch(setshowTabletCategory(false))}>
          <Link href="/about">
            <ListInside className={router.pathname == "/about" ? "active" : ""}>
              <Image
                src={"/icons/AboutIcon.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>درباره همشهری</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li>
      </Section>
      <Section>
        <Li
          onClick={() => {
            dispatch(showSupportModal(true));
          }}
        >
          <ListInside className={router.pathname == "/support" ? "active" : ""}>
            <Image
              src={"/icons/SupportIcon.svg"}
              height={30}
              width={30}
              alt=""
            />
            {/*<Link href="/support">*/}
            <SideTitle>پشتیبانی</SideTitle>
            {/*</Link>*/}
            <Image
              src={"/icons/Pointer.svg"}
              height={12}
              width={12}
              className={"pointer"}
              alt=""
            />
          </ListInside>
        </Li>
      </Section>
    </ASide>
  );
}
