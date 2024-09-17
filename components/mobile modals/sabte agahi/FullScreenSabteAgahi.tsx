import React, { Dispatch, PropsWithChildren, useState } from "react";
import styled, { keyframes } from "styled-components";
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
import Image from "next/image";
import CategorySelect from "../sabte agahi/CategorySelect";

const slideOut = keyframes`
 0% { display:block}
 100% {visibility:hidden}
`;

const ModalSkeletonMobile = styled.div`
  position: fixed;
  z-index: 1025;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  transition: 1s visibility;
  &.show {
    // animation: 0.1s ${slideOut} 1s forwards;
    visibility: visible;
  }
`;

const slideIn = keyframes`
 0% { margin-top: 100vh}
 100% { margin-top:60px}
`;
const slideOff = keyframes`
 0% { margin-top: 60px}
 100% { margin-top:100vh}
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 60px;
  color: #474546;
  background: #f5f6fa;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  margin-top: 100vh;
  transition: 1s margin;
  &.slide {
    margin-top: 0px !important;
  }
  &.close {
    // animation: 1s ${slideOff} ease-in-out forwards;
  }
`;

const Img = styled.div<SpaceProps>`
  height: 25px;
  ${space}
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
const ScrollCheck = styled.div`
  background: #d1d1d1;
  height: 15px;
  border-radius: 4px;
  display: flex;
  margin: 10px 0;
`;
const Check = styled.div`
  background: #00c39c;
  border-radius: 4px;
  display: flex;
  padding: 4px;
`;
const Dot = styled.div`
  background: white;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  margin: auto;
`;
export default function FullScreenSabteAgahi(
  props: PropsWithChildren<{ show: boolean; setshow: Dispatch<boolean> }>
) {
  const [route, setRoute] = useState<string>("CategorySelect");
  const Component = {
    CategorySelect: <CategorySelect setRoute={setRoute} />,
  }[route];

  return (
    <ModalSkeletonMobile className={props.show ? "show" : "close"}>
      <Content className={props.show ? "slide" : "close"}>
        <Header>
          <Flex justifyContent={"space-between"}>
            <Flex>
              <Img ml={"10px"}>
                <Image
                  height={20}
                  width={20}
                  src={"/icons/mobile sabte agahi.svg"}
                  alt=""
                />
              </Img>
              <div>ثبت آگهی</div>
            </Flex>
            <Flex>
              <Img mr={"auto"}>
                <Image
                  height={25}
                  width={25}
                  src={"/icons/mobile sabteagahi refresh.svg"}
                  alt=""
                />
              </Img>
              <Img onClick={() => props.setshow(!props.show)}>
                <Image
                  height={25}
                  width={25}
                  src={"/icons/Iconly-Curved-Close Square.svg"}
                  alt=""
                />
              </Img>
            </Flex>
          </Flex>
        </Header>
        <ScrollCheck>
          <Check>
            <Dot></Dot>
          </Check>
        </ScrollCheck>
        {Component}
      </Content>
    </ModalSkeletonMobile>
  );
}
