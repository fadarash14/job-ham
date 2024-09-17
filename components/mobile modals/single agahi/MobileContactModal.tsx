import React, { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import MobileModalSkeleton from "../MobileModalSkeleton";
import styled, { keyframes } from "styled-components";
import { space, SpaceProps } from "styled-system";
import Link from "next/link";
import { setShowPhoneRules } from "../../../store/agreements";
import Image from "next/image";
import { useRouter } from "next/router";
import { loadContact } from "../../../requests/contact";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fadeIn } from "react-animations";
const fadeInAnimation = keyframes`${fadeIn}`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f6fa;
  border-radius: 14px;
  padding: 10px;
  height: 100%;
`;
const zoomInDownAnimation = keyframes`${fadeIn}`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  animation: 1s ${zoomInDownAnimation};
`;
const Divv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  animation: 1s ${zoomInDownAnimation};
  height: 100%;
  justify-content: space-around;
`;

const Text = styled.div`
  font-size: 12px;
  color: #2d2c2c;
  display: flex;
  flex-wrap: wrap;
`;
const Done = styled.div`
  width: 84px;
  padding: 5px 18px;
  border-radius: 9px;
  background-color: #db143d;
  font-size: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
`;
const R = styled.div`
  color: #db143d;
  font-size: 12px;
  font-weight: 500;
  border-bottom: 1px solid #db143d;
  cursor: pointer;
  width: fit-content;
`;

const Phone = styled.div`
  font-size: 16px;
  color: #474546;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PhoneLink = styled.a`
  font-size: 16px;
  color: #474546;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Warning = styled.div<SpaceProps>`
  border-right: 1px solid red;
  padding-right: 20px;
  margin-bottom: 10px;
  ${space}
`;
const Img = styled.div<SpaceProps>`
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  height: 30px;
  .show {
    visibility: visible;
    animation: 1s ${fadeInAnimation};
  }
  ${space}
`;
const Warn = styled.div<SpaceProps>`
  opacity: 0.84;
  font-size: 11px;
  font-weight: 500;
  color: #2d2c2c;
  text-align: justify;
  ${space}
`;
const T = styled.div`
  color: black;
  font-size: 15px;
`;

export default function MobileContactModal(
  props: PropsWithChildren<{
    show: boolean;
    setshow: Dispatch<boolean>;
    contactInfo: any;
  }>
) {
  const [showCon, setShowCon] = useState(false);
  let contactInfo = props.contactInfo;

  //@ts-ignore
  const { showPhoneRules } = useAppSelector((state) => state.agreements);
  const dispatch = useAppDispatch();

  let validMobile: any;
  if (contactInfo?.mobile)
    if (contactInfo?.mobile.startsWith("0")) {
      validMobile = contactInfo?.mobile;
    } else {
      validMobile = `0${contactInfo?.mobile}`;
    }

  return (
    <MobileModalSkeleton
      show={props.show}
      setshow={props.setshow}
      title={"اطلاعات تماس"}
      icon={"/icons/call.svg"}
      mt={"60vh"}
    >
      {/*<Div>*/}
      {/*    <MobileAgreement/>*/}
      {/*</Div>*/}
      <Div>
        {!showPhoneRules && (
          <Content>
            <Text>
              با{" "}
              <Link href={"/rules"}>
                <R> قوانین و مقررات</R>
              </Link>{" "}
              نیازمندی های همشهری موافق هستم.
            </Text>
            <Done
              onClick={() => {
                dispatch(setShowPhoneRules(true));
                setShowCon(true);
              }}
            >
              موافقم
            </Done>
          </Content>
        )}
        {showPhoneRules ? (
          <>
            <Divv>
              {contactInfo?.mobile ? (
                <PhoneLink href={`tel:${validMobile}`}>
                  <Img ml={"5px"}>
                    <Image
                      src={"/icons/phone.svg"}
                      height={30}
                      width={30}
                      alt=""
                    />
                  </Img>
                  <div>{validMobile}</div>
                </PhoneLink>
              ) : null}
              {contactInfo?.telephone || contactInfo?.tel ? (
                <PhoneLink
                  href={`tel:${
                    contactInfo.tel ? contactInfo.tel : contactInfo.telephone
                  }`}
                >
                  <Img ml={"5px"}>
                    <Image
                      src={"/icons/home no.svg"}
                      height={30}
                      width={30}
                      alt=""
                    />
                  </Img>
                  <div>
                    {contactInfo?.tel
                      ? contactInfo?.tel
                      : contactInfo?.telephone}
                  </div>
                </PhoneLink>
              ) : null}
              {contactInfo?.email ? (
                <Phone>
                  <Img ml={"5px"}>
                    <Image
                      src={"/icons/mail.svg"}
                      height={30}
                      width={30}
                      alt=""
                    />
                  </Img>
                  <div>{contactInfo?.email}</div>
                </Phone>
              ) : null}
            </Divv>
            <Warning>
              <T>هـشــدار پــلیــس</T>
              <Warn>
                لطفاً پیش از انجام معامله و هر نوع پرداخت وجه، از صحت کالا یا
                خدمات ارائه شده، به صورت حضوری اطمینان حاصل نمایید.
              </Warn>
            </Warning>
          </>
        ) : null}
      </Div>
    </MobileModalSkeleton>
  );
}
