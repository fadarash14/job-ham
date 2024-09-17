import Image from "next/image";
import React, { useState } from "react";
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
import FileResumeModal from "./FileResumeModal";
import { useRouter } from "next/router";

const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  ${space}
  ${layout}
`;
const Div = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  height: 130px;
  min-width: 320px;
  margin-bottom: 15px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  ${space};
`;
const UploadDiv = styled.div`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  margin-top: 15px;
  justify-content: center;
  & .simple {
    display: none;
  }
`;
const SubTitle = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  max-width: 200px;
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
  white-space: wrap;
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
type fileResume={
  id: number;
  filename: string;
  link: string;
}
type Props = {
 fileResume:fileResume
};
export default function PersonalResume({ fileResume }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <Div>
      <Title marginTop={"7px"} marginRight={"5px"}>
        <Span>رزومه شخصی </Span>
      </Title>
      <SubTitle>
        <Label>
          با بارگذاری رزومه خود، شانس خود را برای استخدام افزایش دهید.
        </Label>
      </SubTitle>
      <UploadDiv
        onClick={() => {
          !fileResume?.id
            ? setShowModal(true)
            : router.push(fileResume?.link);
        }}
      >
        <Span fontSize={12}>
          {fileResume?.id ? fileResume?.filename : "آپلود رزومه"}
        </Span>
        <Img>
          <Image
            src={"/icons/Download.svg"}
            alt="download"
            width={18}
            height={18}
          />
        </Img>
      </UploadDiv>
      {showModal && <FileResumeModal show={showModal} setShow={setShowModal} />}
    </Div>
  );
}
