import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";

const Carpet = styled.div<ColorProps | LayoutProps>`
  font-size: 12px;
  padding: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 119px;
  &.mobile {
    display: none;
  }
  @media (max-width: 576px) {
    &.web {
      display: none;
    }
    &.mobile {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
  }
  ${color}
  ${layout}
`;
const Span = styled.div`
  margin-top: auto;
  border-right: 1px solid white;
  color: white;
  padding-right: 5px;
`;

const BodyCard = styled.div`
  flex: 1 1;
  background: white;
  padding: 20px;
`;

const Head = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  align-items: center;

  &.calls > div {
    font-size: 14px;
  }
  ${space}
  ${flexbox}
`;

const Call = styled.div`
  background: #8886ec;
  border-radius: 10px;
  color: white;
  padding: 5px 10px;
  width: fit-content;
  cursor: pointer;
`;
const Logo = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  opacity: 1;
  & > div {
    margin: auto;
  }

  & img {
    object-fit: cover;
  }
`;
const No = styled.a<SpaceProps>`
  margin-right: 5px;
  ${space}
`;
export default function SupportModal(props: {
  setShow: Dispatch<boolean>;
  show: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <ModalSkeleton setShow={props.setShow} show={props.show} flex={"row"}>
      <Carpet className={"mobile"} bg={"#8886ec"}>
        <Span>نیازمندی های همشهری</Span>
        <div
          style={{ marginRight: "auto", cursor: "pointer", zIndex: 10 }}
          onClick={() => props.setShow(false)}
        >
          <Image
            width={30}
            height={30}
            alt=""
            src={"/icons/white-close-modal.svg"}
          />
        </div>
        <Logo>
          <Image
            src={"/icons/white-he-profile.svg"}
            height={65}
            width={70}
            alt=""
          />
        </Logo>
      </Carpet>
      <BodyCard>
        <Head>
          <div>
            <Image
              src={"/icons/SupportIcon.svg"}
              height={35}
              width={35}
              alt=""
            />
          </div>
          <div style={{ marginRight: "5px" }}>پشتیبانی</div>
        </Head>
        <div style={{ textAlign: "justify", margin: "30px 0", fontSize: 14 }}>
          پشتیبانی نیازمندی‌های همشهری در روزهای کاری از ساعت 9 تا 17، برای
          ارتباط بیشتر و نزدیک‌تر ما و شماست. ما اینجا هستیم تا پاسخ‌گوی مشکلات
          و سوال‌های شما باشیم. با ما در ارتباط باشید.{" "}
        </div>
        <Head>
          {show ? (
            <Head
              flexDirection={["column", "row"]}
              className={"calls"}
              justifyContent={"end"}
              alignItems={"flex-start"}
            >
              <Head ml={["0", "10px"]} mb={["10px", "0"]}>
                <Image src={"/icons/phone.svg"} height={24} width={24} alt="" />
                <No href={"tel:02188860177"}>021-88860177</No>
              </Head>
              <Head ml={["0", "10px"]} mb={["10px", "0"]}>
                <Image src={"/icons/phone.svg"} height={24} width={24} alt="" />
                <No href={"tel:1819"}>1819</No>
              </Head>
            </Head>
          ) : (
            <Call onClick={() => setShow(!show)}>تماس با پشتیبانی</Call>
          )}
        </Head>
      </BodyCard>
      <Carpet className={"web"} bg={"#8886ec"}>
        <div
          style={{ marginRight: "auto", cursor: "pointer", zIndex: 10 }}
          onClick={() => {
            props.setShow(false);
            setShow(false);
          }}
        >
          <Image
            width={30}
            height={30}
            alt=""
            src={"/icons/white-close-modal.svg"}
          />
        </div>
        <Span>نیازمندی های همشهری</Span>
        <Logo>
          <Image
            src={"/icons/Mask Group 48.svg"}
            height={300}
            width={150}
            alt=""
          />
        </Logo>
      </Carpet>
    </ModalSkeleton>
  );
}
