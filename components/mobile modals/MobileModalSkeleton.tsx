import React, {
  Dispatch,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled, { keyframes } from "styled-components";
import {
  height,
  HeightProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
import MobileCategoryBuilder from "../mobile modals/MobileCategoryBuilder";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";

const slideOut = keyframes`
 0% { display:block}
 100% {visibility:hidden}
`;

const ModalSkeletonMobile = styled.div`
  position: fixed;
  z-index: 1022;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 100%;
  background-color: rgba(45, 44, 44, 0.7);
  transition: 1s visibility;
  overscroll-behavior: none;
`;

const Img = styled.div<SpaceProps | HeightProps>`
  height: fit-content;
  ${space}
  ${height}
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  align-items: center;

  ${space}
`;

const Header = styled.div<SpaceProps>`
  align-items: center;
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
    background: #fcc155;
  }
  ${space}
`;

const Content = styled.div<HTMLElement | { mt: string } | SpaceProps>(
  (props) => {
    return {
      width: "100%",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      color: "#474546",
      background: "white",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      transition: "1s margin",
    };
  },
  space
);

interface IProps {
  show: boolean;
  setshow: Dispatch<boolean>;
  title: string;
  icon: string;
  mt?: string;
}

const Whole = styled.div<LayoutProps>`
  ${layout}
`;
export default function MobileModalSkeleton(props: PropsWithChildren<IProps>) {
  const escape = useRef(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.setshow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", escapeListener);
    return () => {
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);
  return (
    <Whole display={["block", "none"]}>
      <CSSTransition
        in={props.show}
        timeout={100}
        classNames="slide"
        unmountOnExit
      >
        <ModalSkeletonMobile onClick={() => props.setshow(false)}>
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
            ref={escape}
            mt={props.mt}
            className={"content"}
          >
            <div
              onClick={() => props.setshow(!props.show)}
              onTouchMove={() => props.setshow(!props.show)}
              style={{ height: "20px", textAlign: "center" }}
            >
              <Image
                src={"/icons/swipe-down.svg"}
                height={15}
                width={20}
                alt=""
              />
            </div>
            <Header px={"10px"}>
              <Flex>
                <Flex>
                  <Img height={25} ml={"10px"}>
                    <Image height={25} width={25} src={props.icon} alt="" />
                  </Img>
                  <div>{props.title}</div>
                </Flex>
                <Img
                  height={25}
                  mr={"auto"}
                  onClick={() => props.setshow(!props.show)}
                >
                  <Image
                    height={25}
                    width={25}
                    src={"/icons/remove.svg"}
                    alt="remove"
                  />
                </Img>
              </Flex>
            </Header>
            {props.children}
          </Content>
        </ModalSkeletonMobile>
      </CSSTransition>
    </Whole>
  );
}

MobileModalSkeleton.defaultProps = {
  mt: "60px",
};
