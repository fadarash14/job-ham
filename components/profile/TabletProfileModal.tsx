import * as React from "react";
import styled, { CSSObject } from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
} from "styled-system";
import Container from "../../components/utility/Container";
import Image from "next/image";
const ProfileSideBar = dynamic(() => import("../mobile modals/ProfileSideBar"));
import { Dispatch } from "react";
import clsx from "clsx";
import { setshowTabletCategory } from "../../store/pageConfig";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import dynamic from "next/dynamic";

const Modal = styled.div<
  HTMLElement | LayoutProps | { transform: string; slide: boolean }
>(
  // @ts-ignore
  (props: { slide: boolean }) => {
    return {
      position: "fixed",
      flexDirection: "column",
      right: props.slide ? "0" : "-100%",
      top: 0,
      zIndex: 20000,
      width: "100%",
      height: "100%",
      transition: "1.5s all ease",
    };
  },
  layout,
  system({
    transform: {
      property: "transform",
    },
  })
);

// const Modal=styled.div<LayoutProps|ColorProps>`
// position:fixed;
// right:0;
// transform:translate(100%,0);
// width:100%;
// height:100%;
//
//     ${layout}
// `

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 100%;
  background-color: RGB(255, 255, 255);
`;

const MobileHead = styled.div<
  FlexboxProps | LayoutProps | SpaceProps | ColorProps
>`
  display: flex;
  align-items: center;
  position: relative;
  color: black;
  padding: 10px 0;
  &.head::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0px;
    background: #d1d1d1;
    height: 1px;
    width: 100%;
  }
  ${layout}
  ${flexbox}
    ${space}
    ${color}
`;

const IDiv = styled.div<SpaceProps>`
  height: 30px;
  z-index: 1000;
  ${space}
`;
const SubtleLogo = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: block;
  @media all and (min-width: 1399px) and (max-width: 1610px) {
    display: none;
  }
`;

export default function TabletProfileModal() {
  const dispatch = useAppDispatch();

  //@ts-ignore
  const { showTabletCategory } = useAppSelector((state) => state.pageConfig);

  return (
    <Modal
      // @ts-ignore
      slide={showTabletCategory}
      display={["flex", "flex", "flex", "none"]}
      transform={clsx({
        "translateX:(0%)": showTabletCategory,
        "translateX(100%)": !showTabletCategory,
      })}
    >
      <Main>
        <MobileHead bg={"#F5F6FA"} className={"head"}>
          <Container>
            <MobileHead justifyContent={"space-between"}>
              <MobileHead>
                <IDiv ml={"5px"}>
                  <Image
                    src={"/icons/black logo.svg"}
                    height={30}
                    width={30}
                    alt={"logo"}
                  />
                </IDiv>
                <div>نیازمندی های همشهری</div>
              </MobileHead>
              <IDiv onClick={() => dispatch(setshowTabletCategory(false))}>
                <Image
                  src={"/icons/mobile-left-arrow.svg"}
                  height={30}
                  width={30}
                  alt={"arrow"}
                />
              </IDiv>
            </MobileHead>
          </Container>
          <SubtleLogo>
            <Image
              height={90}
              width={97}
              src={"/icons/white-he-profile.svg"}
              alt={"profile"}
            />
          </SubtleLogo>
        </MobileHead>
        <Container>
          {
            //@ts-ignore
            <ProfileSideBar />
          }
        </Container>
      </Main>
    </Modal>
  );
}
