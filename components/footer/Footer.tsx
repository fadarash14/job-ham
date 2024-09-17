import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../utility/Container";
import Image from "next/image";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import clsx from "clsx";
import Link from "next/link";
import { showLoginModal, showSupportModal } from "../../store/pageConfig";
import { useAppDispatch } from "@/store/hook";

const Footi = styled.div<SpaceProps | ColorProps | LayoutProps>`
  background: #f5f6fa;
  bottom: 0;
  width: 100%;
  left: 0;
  ${space}
  ${color}
  ${layout}
`;
const Head1 = styled.div`
  color: #474546;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: #2d2c2c;
    margin-right: 5px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
`;

const Rules = styled.div<SpaceProps>`
  display: flex;
  @media (max-width: 768px) {
    flex: 1 1 50%;
    flex-direction: column;
    &.mobile > div {
      margin: 5px 0;
    }
  }
  ${space}
`;

const Support = styled.div<SpaceProps | ColorProps | BorderProps>`
  border-radius: 10px;
  border: 1px solid #8886ec;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: fit-content;
  min-width: fit-content;
  margin-right: auto;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    margin-right: auto !important;
  }
  ${border}
  ${color}
    ${space}
`;
const Butt = styled.div<SpaceProps | FlexboxProps>`
  display: flex;
  flex-wrap: wrap;

  ${space}
  ${flexbox}
`;
const Download = styled.div<SpaceProps | ColorProps | BorderProps>`
  border: 1px solid #091d24;
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: fit-content;
  min-width: fit-content;
  margin-right: auto;
  @media (max-width: 768px) {
    margin-right: auto !important;
  }
  ${border}
  ${color}
    ${space}
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  ${space}
`;
const Span = styled.div<SpaceProps>`
  color: #acacac;
  font-size: 0.8rem;
  align-items: center;
  display: flex;
  width: fit-content;
  cursor: pointer;
  @media (max-width: 768px) {
    flex-basis: 50%;
  }
  ${space}
`;

export default function Footer(props: {
  isProfile: boolean;
  isWizard: boolean;
  classNames: string;
  pb: string;
}) {
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    //@ts-ignore
    if (typeof window !== "undefined" && window.rahnama) {
      setMobile(true);
    }
  }, []);
  return (
    <Footi
      pb={[props.pb, "17px"]}
      bg={clsx({ F5F6FA: props.isProfile })}
      display={[
        clsx({
          none: props.isProfile || props.isWizard,
          block: !props.isProfile && !props.isWizard,
        }),
        "block",
      ]}
    >
      <Container className={props.classNames}>
        <Head1>
          <Img>
            <Image
              height={22}
              width={22}
              src={"/icons/black logo.svg"}
              alt="black logo"
            />
          </Img>
        </Head1>
        <Bottom>
          <Rules className={"mobile"}>
            <Link href={"/rules"}>
              <Span ml={"20px"}>
                <Img ml={"5px"}>
                  <Image
                    height={13}
                    width={13}
                    src={"/icons/Group 1416.svg"}
                    alt="rules"
                  />
                </Img>
                قوانین و مقـررات
              </Span>
            </Link>
            <Link href={"/tariff"}>
              <Span ml={"20px"}>
                <Img ml={"5px"}>
                  <Image
                    height={13}
                    width={13}
                    src={"/icons/Subtraction 10.svg"}
                    alt="fares"
                  />
                </Img>
                تعرفـه ها
              </Span>
            </Link>
            <Link href={"/about"}>
              <Span ml={"20px"}>
                <Img ml={"5px"}>
                  <Image
                    height={13}
                    width={13}
                    src={"/icons/Path 128.svg"}
                    alt="about"
                  />
                </Img>
                درباره همـشهری
              </Span>
            </Link>
          </Rules>
          <Rules>
            <Butt
              mt={"auto"}
              mr={"auto"}
              flexDirection={["column", "column", "row", "row"]}
            >
              <Support
                bg={props.isProfile ? "transparent" : "#8886ec"}
                color={props.isProfile ? "#8886ec" : "white"}
                ml={["0", "5px"]}
                onClick={() => dispatch(showSupportModal(true))}
              >
                <Img ml={"5px"}>
                  {props.isProfile ? (
                    <Image
                      height={14}
                      width={14}
                      src={"/icons/FooterSupport.svg"}
                      alt="support"
                    />
                  ) : (
                    <Image
                      height={14}
                      width={14}
                      src={"/icons/support white.svg"}
                      alt="support"
                    />
                  )}
                </Img>
                پـشــتیبـانی
              </Support>
              {!mobile && (
                <Link href={"/download"}>
                  <Download
                    bg={props.isProfile ? "transparent" : "#091d24"}
                    color={props.isProfile ? "#091d24" : "white"}
                  >
                    <Img ml={"5px"}>
                      {props.isProfile ? (
                        <Image
                          height={14}
                          width={14}
                          src={"/icons/Download.svg"}
                          alt="دانلود اپلیکیشن"
                        />
                      ) : (
                        <Image
                          height={14}
                          width={14}
                          src={"/icons/download white.svg"}
                          alt="دانلود اپلیکیشن"
                        />
                      )}
                    </Img>
                    دانــلود اپـلیکــیـشن
                  </Download>
                </Link>
              )}
            </Butt>
          </Rules>
        </Bottom>
      </Container>
    </Footi>
  );
}

Footer.defaultProps = {
  isProfile: false,
  isWizard: false,
  classNames: "hi",
  pb: "17px",
};
