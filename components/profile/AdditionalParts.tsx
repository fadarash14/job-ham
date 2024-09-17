import { _AdditionalParts } from "@/mock/_panel";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import {
  LayoutProps,
  SpaceProps,
  space,
  layout,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
  color,
  fontSize,
  fontWeight,
} from "styled-system";

const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  ${space}
  ${layout}
`;
const Div = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  //   min-he: 100%;
  min-width: 320px;

  border: 1px solid #d1d1d1;
  border-radius: 6px;
  ${space};
`;
const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const Time = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  white-space: nowrap;
  cursor: pointer;
  width: fit-content;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Label = styled.label<
  { showIcon?: boolean } & FontSizeProps &
    FontWeightProps &
    SpaceProps &
    LayoutProps &
    ColorProps
>`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Img = styled.div`
  margin: 0 10px;
  display: flex;
  cursor: pointer;
`;
export default function AdditionalParts() {
  return (
    <Div>
      <Title marginTop={"7px"} marginRight={"5px"}>
        <Span>بخش های تکمیلی</Span>
        <Img>
          <Image
            src={"/icons/plus_squar_blak.svg"}
            alt="download"
            width={18}
            height={18}
          />
        </Img>
      </Title>
      <UploadDiv>
        {_AdditionalParts.map((title: string) => (
          <Span
            marginRight={"5px"}
            marginY={"3px"}
            color={"#acacac"}
            fontSize={12}
            key={title}
          >
            {title}
          </Span>
        ))}
      </UploadDiv>
    </Div>
  );
}
