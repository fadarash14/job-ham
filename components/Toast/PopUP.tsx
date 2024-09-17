import React, { useEffect } from "react";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import clsx from "clsx";

const PopUp = styled.div<SpaceProps | LayoutProps>`
  visibility: hidden;
  background-color: #474546;
  color: #f5f6fa;
  text-align: center;
  border-radius: 10px;
  padding: 10px 12px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  right: 50%;
  width: max-content;
  transform: translate(50%, 0);
  font-size: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  ${space}
  ${layout}
`;

export default function PopUP(props: { show: boolean; text: string }) {
  let { show, text } = props;
  return (
    <PopUp
      display={["none", "block"]}
      className={clsx("popuptext", { show: show })}
      id="myPopup"
    >
      {text}
    </PopUp>
  );
}
