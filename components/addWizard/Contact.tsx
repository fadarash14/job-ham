import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  color,
  border,
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  layout,
  flexbox,
  space,
} from "styled-system";
import Image from "next/image";
import AdsUploadContext from "./AdsUploadContext";
import ErrorMessage from "../log in/ErrorMessage";
import { useAppSelector } from "@/store/hook";

const Whole = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: #474546;
  font-weight: 450;
  margin-bottom: 10px;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #d1d1d1;
  }
`;

const Flex = styled.div<SpaceProps | FlexboxProps>`
  display: flex;
  &.lined::after {
    content: "";
    display: block;
    background: #d1d1d1;
    height: 1px;
    margin: auto 0;
    width: 100%;
    margin-right: 10px;
  }
  &.mobile {
    flex-direction: column;
  }

  &.input {
    flex-direction: column;
  }
  &.cursor {
    cursor: pointer;
  }

  @media (max-width: 576px) {
    &.mobileinput {
      flex-direction: column;
    }
  }

  ${flexbox}
  ${space}
`;

const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  transition: 1s transform;
  &.rotate {
    transform: rotate(180deg);
    width: 25px !important;
  }
  &.rotateBack {
    transform: rotate(0deg);
    width: 25px !important;
  }
  &.cursor {
    cursor: pointer;
  }

  ${layout}
  ${flexbox}
    ${space}
`;

const Rec = styled.div<BorderProps>`
  background: transparent;
  border-radius: 15px;
  padding: 10px 23px;
  overflow: hidden;
  transition: 1s height;
  height: fit-content;
  flex: 1 1 90%;
  margin-bottom: 20px;
  ${border}
`;

const Text = styled.div<SpaceProps>`
  font-size: 12px;
  color: #707070;
  ${space}
`;
const Piece = styled.div<SpaceProps>`
  font-size: 12px;
  color: #474546;
  ${space}
`;
const Item = styled.div<SpaceProps>`
  font-size: 12px;
  color: #db143d;
  font-weight: 500;
  min-width: fit-content;
  cursor: pointer;
  ${space}
`;
const CheckPos = styled.div<SpaceProps>`
  padding-right: 10px;
  position: relative;
  display: flex;
  width: 24px ${space};
`;
const TickPos = styled.div<SpaceProps>`
  display: flex;
  margin: auto auto auto 0;
  ${space}
`;
const Tick = styled.div<SpaceProps>`
  margin: auto auto auto 0;
  ${space}
`;

const Input = styled.input<BorderProps | ColorProps>`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  height: 30px;
  color: #474546;
  margin-right: 10px;
  background: transparent;
  padding-right: 10px;
  outline: none;
  direction: ltr;
  text-align: right;
  @media (max-width: 576px) {
    margin-right: 0;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::-webkit-input-placeholder {
    color: #acacac;
  }
  ${border}
  ${color}
`;

const Div = styled.div<LayoutProps>`
  ${layout}
`;
export default function Contact() {
  const {
    mobile,
    setMobile,
    setLevel,
    tel,
    setTel,
    email,
    setMail,
    showMobile,
    setShowMobile,
    editMode,
  } = useContext(AdsUploadContext);
  //@ts-ignore
  const { mobile: contact } = useAppSelector((state) => state.sign);
  let _validMobile;
  if (contact) {
    if (contact.startsWith("0")) {
      _validMobile = contact;
    } else {
      _validMobile = `0${contact}`;
    }
  }
  let default_show_modal = tel !== "" || email !== "";
  const [modal, setModal] = useState(default_show_modal);
  const [validMobile, setValidMobile] = useState(_validMobile);
  const [valid, setValid] = useState(false);
  const [isTouched, setTouched] = useState(false);
  const [contactShowError, setContactShowError] = useState<{
    [key: string]: string;
  }>({});

  const Tel = (e: any) => {
    setTel(e.target.value);
  };
  const Mail = (e: any) => {
    setMail(e.target.value);
  };

  const Mobile = (e: any) => {
    let No = e.target.value;
    setValidMobile(No);
    setTouched(false);
  };

  const contactVisibility = () => {
    setShowMobile(!showMobile);
    if (mobile && valid) {
      setValid(false);
    }
  };

  useEffect(() => {
    validate();
  }, [validMobile, email, tel, showMobile]);

  const validate = () => {
    setContactShowError({});
    if (validMobile !== undefined) {
      if (/^09[0-9]{9}$/.test(validMobile)) {
        setMobile(validMobile);
        // setLevel(5);
      } else if (!/^09[0-9]{9}$/.test(validMobile)) {
        setContactShowError({ mobile: "موبایل وارد شده صحیح نمی باشد!" });
        setValid(false);
        setMobile("");
      }
    }
  };
  // useEffect(() => {
  //     if (mobile && valid) {
  //         setMobile(validMobile)
  //     }else{
  //         setMobile('')
  //     }
  //
  // },[mobile])

  function maxLengthCheck(e: any) {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  }

  return (
    <Whole>
      <Title>اطـلاعــات تــمـاس</Title>
      <Flex>
        <Rec
          className={!modal ? "drop" : "close"}
          border={mobile && valid ? "1px solid #00C39C" : "1px solid #acacac"}
        >
          <Flex my={24}>
            <Img ml={"10px"}>
              <Image
                src={"/icons/Arrow - Left 2.svg"}
                height={9}
                width={9}
                alt=""
              />
            </Img>
            <Text>
              کد تأیید به شمارهٔ موبایل شما ارسال خواهد شد. تماس و چت نیز با
              این شماره انجام می‌شود.
            </Text>
          </Flex>
          <Flex my={24} className={"mobile"}>
            <Flex mb={"8px"} className={"mobileinput"}>
              <div>شـــماره موبـــایل</div>
              <Input
                bg={mobile && valid ? "rgba(0,195,156,0.1)" : ""}
                border={mobile && valid ? "1px solid rgba(0,195,156,0.1)" : ""}
                onBlur={() => {
                  setTouched(true);
                  if (!mobile)
                    setContactShowError({
                      mobile: "موبایل وارد شده صحیح نمی باشد!",
                    });
                }}
                onInput={(e) => maxLengthCheck(e)}
                maxLength={11}
                type={"number"}
                disabled={editMode}
                defaultValue={validMobile ? validMobile : _validMobile}
                value={validMobile}
                onChange={Mobile}
              />
            </Flex>
            {isTouched && <ErrorMessage message={contactShowError["mobile"]} />}
          </Flex>
        </Rec>
        <CheckPos>
          {mobile && valid ? (
            <TickPos>
              <Tick>
                <Image
                  alt=""
                  src={"/icons/green tick.svg"}
                  height={10}
                  width={15}
                />
              </Tick>
            </TickPos>
          ) : null}
        </CheckPos>
      </Flex>
    </Whole>
  );
}
