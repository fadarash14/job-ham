import React from "react";
import styled from "styled-components";

import {
  backgroundColor,
  color,
  ColorProps,
  layout,
  LayoutProps,
} from "styled-system";

type Props = {
  OnSendResume: () => void;
  active: boolean;
  text: string;
};

const Contact = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>(
  (props) => {
    return {
      padding: "5px 15px 20px 15px",
      background: "#F5F6FA",
      position: "fixed",
      bottom: 0,
      width: "100%",
      zIndex: 1021,
      //@ts-ignore
      boxShadow: props.shadow ? "" : "#f5f6fa 0px -20px 29px 0px",
    };
  },
  [layout]
);

const ContactInfo = styled.button<ColorProps>`
  background: #1abc9c;
  border-radius: 10px;
  color: white;
  text-align: center;
  flex: 1 1 100%;
  display: flex;
  padding: 10px;
  border: none;
  font-weight: 500;
  & > span {
    margin: auto;
  }
  ${color}
  ${backgroundColor}
`;

export default function FixedContact({ OnSendResume, text, active }: Props) {
  return (
    <Contact display={["flex", "none"]}>
      <ContactInfo
        backgroundColor={active ? "green" : "very_light_pink"}
        disabled={!active}
        onClick={OnSendResume}
      >
        <span>{text}</span>
      </ContactInfo>
    </Contact>
  );
}
