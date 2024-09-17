import moment from "moment";
import "moment/locale/fa";
import "moment-jalaali";
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
  BorderProps,
  border,
  flex,
  flexDirection,
  FlexDirectionProps,
  PositionProps,
  position,
} from "styled-system";
import ProgressBar from "../utility/ProgressBar";
import Image from "next/image";
import { Completeness } from "@/types";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
type Props = {
  className?: string;
  completness: Completeness;
};

const Div = styled.div<SpaceProps>`
  @media only screen and (max-width: 768px) {
    ${({ className }) => className === "Desktop" && "display: none;"}
    ${({ className }) =>
      className === "Mobile" &&
      "padding-bottom:15px; border:none; width: 80%; margin:0 auto;"}
  }
  @media only screen and (min-width: 767px) {
    ${({ className }) => className === "Mobile" && "display: none;"}
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  height: 130px;
  min-width: 320px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  ${space};
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
  ${space}
  ${layout}
`;
const IDiv = styled.div<SpaceProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;
const Download = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    white-space: nowrap;
    font-size: 12px;
    margin-top: 12px;
    margin-right: 10px;
  }
  cursor: pointer;
`;
const Img = styled.div`
  margin: 0 10px;
  display: flex;
  margin-top: 10px;
`;
const Progress = styled.div`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;
const Time = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
  white-space: nowrap;
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
  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const ProgressLabel = styled.span<{ progress: number }>`
  transform: translate(-50%, -50%);
  color: ${({ progress }) => (progress === 100 ? "#00b300" : "#000000")};
  font-size: 12px;
  margin: 0 10px;
  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    transform: none;
  }
`;
export default function ResumeStatus({ className, completness }: Props) {
  // const completeness = useAppSelector(
  //   // @ts-ignore
  //   (state) => state.cvInfo.completeness
  // ) as Completeness;
  const date = new Date();
  // const progress = completeness.percentage;
  const router = useRouter()
  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(date);
  return (
    <Div className={className}>
      <Title marginTop={"7px"} marginRight={"5px"}>
        <Span>وضعیت رزومه شما</Span>
      </Title>
      <Time>
        <Label fontSize={12}>آخرین بروزرسانی : {formattedDate}</Label>
      </Time>
      <Progress>
        {/* @ts-ignore */}
        {completness?.percentage === 100 ? (
          <ProgressLabel progress={completness?.percentage}>
            رزومه شما کامل است
          </ProgressLabel>
        ) : (
          <ProgressLabel progress={completness?.percentage}>
            رزومه شما ناقص است
          </ProgressLabel>
        )}

        <IDiv onClick={() => router.push("my-resume/Templates")}>
          <Download>
            <span> دانلود رزومه</span>
            <Img>
              <Image
                src={"/icons/Download.svg"}
                alt="download"
                width={18}
                height={18}
              />
            </Img>
          </Download>

          <ProgressBar progress={completness?.percentage} />
        </IDiv>
      </Progress>
    </Div>
  );
}
