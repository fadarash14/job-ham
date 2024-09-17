import styled from "styled-components";
import React from "react";
import Image from "next/image";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { useAppDispatch } from "@/store/hook";
import { setShowHome } from "../../../store/mobilePage";

const Section = styled.div<HTMLElement | { show: boolean } | LayoutProps>(
  (props) => {
    return {
      color: "black",
      backgroundColor: "white",
      position: "fixed",
      direction: "rtl",
      height: "100vh",
      width: "100vw",
      right: "0",
      //@ts-ignore
      transform: props.show ? "translate(0,0)" : "translate(100%,0)",
      transition: "0.5s transform",
      zIndex: 1011,
      overflowY: "scroll",
      paddingBottom: "68px",
      overscrollBehavior: "contain",
    };
  },
  layout
);

const Head = styled.a`
    position: relative;
    margin 20px 0;
    padding:0 10px;
    display:flex;
    font-size:16px;
    font-weight:500;
    align-items:center;
    justify-content:space-between;
`;
const Img = styled.div<SpaceProps>`
  cursor: pointer;
  display: flex;
  color: #2d2c2c;
  font-size: 14px;
  position: relative;
  ${space}
`;
const Text = styled.div`
  color: #474546;
  font-size: 14px;
  flex: 1 1;
`;

export default function MobileSideBarSection({
  children,
  show,
}: {
  children: any;
  show: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <Section
      className={"scroll-d-none"}
      display={["block", "none"]}
      show={show}
    >
      {children}
    </Section>
  );
}
