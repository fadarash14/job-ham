import React from "react";
import styled from "styled-components";
import Container from "../utility/Container";
import Image from "next/image";
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
import clsx from "clsx";
import Link from "next/link";
import { useAppDispatch } from "@/store/hook";
import { showSupportModal } from "../../store/pageConfig";

const Footi = styled.div<SpaceProps | ColorProps | LayoutProps>`
  background: #e8e8ec;
  bottom: 0;
  width: 100%;
  padding-bottom: 17px;
  z-index: 1019;
  left: 0;
  ${space}
  ${color}
    ${layout}
`;

const Bott = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
`;

const SomeText = styled.div`
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
    & > div {
      margin: 5px 0;
    }
  }
`;

const Support = styled.div<SpaceProps>`
  background: #8886ec;
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  margin: auto 0;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  ${space}
`;
const Download = styled.div`
  background: #091d24;
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: fit-content;
  margin: auto 0;
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  ${space}
`;
const Span = styled.div<SpaceProps | FlexboxProps>`
  color: #acacac;
  font-size: 0.8rem;
  align-items: center;
  display: flex;
  cursor: pointer;
  margin: 5px 0;
  min-width: fit-content;
  @media (max-width: 768px) {
    flex-basis: 32%;
  }
  ${flexbox}
  ${space}
`;
const Flex = styled.div<LayoutProps | FlexboxProps>`
  ${flexbox}
  ${layout}
`;
const FlexW = styled.div<LayoutProps | FlexboxProps>`
  flex-wrap: wrap;
  ${flexbox}
  ${layout}
`;
const FlexWrap = styled.div<LayoutProps | FlexboxProps>`
  flex-wrap: wrap;
  ${flexbox}
  ${layout}
`;
const WaterMark = styled.div`
  display: flex;
  margin: auto 0 auto 50px;
  align-items: center;
  &::before {
    content: "";
    display: block;
    height: 40px;
    width: 2px;
    background: black;
    margin-left: 10px;
  }
`;
export default function DownloadFooter(props: {
  isProfile: boolean;
  isWizard: boolean;
  classNames: string;
}) {
  const dispatch = useAppDispatch();

  return (
    <Footi
      id={"id"}
      bg={clsx({ white: props.isProfile })}
      display={[
        clsx({
          none: props.isProfile || props.isWizard,
          block: !props.isProfile && !props.isWizard,
        }),
        "block",
      ]}
    >
      <Container className={props.classNames}>
        <Bott>
          <SomeText id={"id"}>
            <WaterMark>
              <div>نیــازمــنـدی های همشــهری</div>
            </WaterMark>
            <FlexW id={"id"} display={["none", "flex"]}>
              <Link href={"/rules"}>
                <Span ml={"20px"}>
                  <Img ml={"5px"}>
                    <Image
                      height={13}
                      width={14}
                      src={"/icons/Group 1416.svg"}
                      alt=""
                    />
                  </Img>
                  قوانین و مقررات
                </Span>
              </Link>
              <Link href={"/tariff"}>
                <Span ml={"20px"}>
                  <Img ml={"5px"}>
                    <Image
                      height={13}
                      width={14}
                      src={"/icons/Subtraction 10.svg"}
                      alt=""
                    />
                  </Img>
                  تعرفه ها
                </Span>
              </Link>
              <Link href={"/about"}>
                <Span ml={"20px"}>
                  <Img ml={"5px"}>
                    <Image
                      height={13}
                      width={14}
                      src={"/icons/Path 128.svg"}
                      alt=""
                    />
                  </Img>
                  درباره همشهری
                </Span>
              </Link>
              <Link href={"/branches"}>
                <Span ml={"20px"}>
                  <Img ml={"5px"}>
                    <Image
                      height={13}
                      width={14}
                      src={"/icons/Path_34175.svg"}
                      alt=""
                    />
                  </Img>
                  دفاتر همشهری
                </Span>
              </Link>
            </FlexW>
          </SomeText>
          <SomeText id={"id"}>
            <Support
              ml={"5px"}
              onClick={() => dispatch(showSupportModal(true))}
            >
              <Img ml={"5px"}>
                <Image
                  height={14}
                  width={"14"}
                  src={"/icons/support white.svg"}
                  alt=""
                />
              </Img>
              پشتیبانی
            </Support>
            <Link href={"/download"}>
              <Download>
                <Img ml={"5px"}>
                  <Image
                    height={14}
                    width={"14"}
                    src={"/icons/download white.svg"}
                    alt=""
                  />
                </Img>
                دانلود اپلیکیشن
              </Download>
            </Link>
          </SomeText>
        </Bott>
        <FlexWrap display={["flex", "none"]} flex={"1 1 100%"}>
          <Link href={"/rules"}>
            <Span ml={"20px"} flexBasis={"40% !important"}>
              <Img ml={"5px"}>
                <Image
                  height={13}
                  width={14}
                  src={"/icons/Group 1416.svg"}
                  alt=""
                />
              </Img>
              قوانین و مقررات
            </Span>
          </Link>
          <Link href={"/tariff"}>
            <Span ml={"20px"} flexBasis={"40% !important"}>
              <Img ml={"5px"}>
                <Image
                  height={13}
                  width={14}
                  src={"/icons/Subtraction 10.svg"}
                  alt=""
                />
              </Img>
              تعرفه ها
            </Span>
          </Link>
          <Link href={"/about"}>
            <Span ml={"20px"} flexBasis={"40% !important"}>
              <Img ml={"5px"}>
                <Image
                  height={13}
                  width={14}
                  src={"/icons/Path 128.svg"}
                  alt=""
                />
              </Img>
              درباره همشهری
            </Span>
          </Link>
          <Link href={"/branches"}>
            <Span ml={"20px"} flexBasis={"40% !important"}>
              <Img ml={"5px"}>
                <Image
                  height={13}
                  width={14}
                  src={"/icons/Path_34175.svg"}
                  alt=""
                />
              </Img>
              دفاتر همشهری
            </Span>
          </Link>
        </FlexWrap>
      </Container>
    </Footi>
  );
}

DownloadFooter.defaultProps = {
  isProfile: false,
  isWizard: false,
  classNames: "hi",
};
