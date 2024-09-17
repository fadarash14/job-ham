import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AppBar from "@/components/header/appBar";
import styled from "styled-components";
import {
  fontSize,
  FontSizeProps,
  FontWeightProps,
  fontWeight,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  ColorProps,
  color,
  BorderProps,
  border,
  backgroundColor,
} from "styled-system";
import Footer from "@/components/footer/Footer";
import ModalAuthContent from "@/components/log in/ModalAuthContent";

const Flex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;

  ${space}
  ${layout}
`;

const Field = styled.div<SpaceProps | LayoutProps>`
  ${space}
  ${layout}
`;
const Label = styled.span<SpaceProps | ColorProps>`
  font-size: 12px;
  ${space}
  ${color}
`;
const Input = styled.input<BorderProps>`
  height: 70px;
  border-radius: 15px;
  border: 1px solid #d1d1d1;
  background: white;
  outline: none;
  width: 100%;
  padding-right: 10px;
  flex: 1 1;
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }

  ${border}
`;
const Links = styled.div`
  height: 70px;
  border-radius: 15px;
  border: 1px solid #d1d1d1;
  background: white;
  outline: none;
  width: 100%;
  padding-right: 10px;
  flex: 1 1;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RedButton = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 218px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 15px;
  border: none;
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
const Img = styled.div`
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  return <ModalAuthContent />;
}
