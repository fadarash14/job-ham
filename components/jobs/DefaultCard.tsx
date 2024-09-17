import Image from "next/image";
import React from "react";
import styled from "styled-components";
import {
  FontSizeProps,
  FontWeightProps,
  LayoutProps,
  SpaceProps,
  fontSize,
  fontWeight,
  layout,
  space,
} from "styled-system";

const Img = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  text-align: center;
  margin-top: 50px;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps
>`
  text-align: center;
  color: #757575;
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;

export default function DefaultCard() {
  return (
    <>
      <Img>
        <Image
          src={"/images/chooseAd.png"}
          alt={"انتخاب موقعیت شغلی"}
          width={288}
          height={238}
        />
      </Img>
      <Title>
        <Span fontSize={16} fontWeight={400}>
          برای مشاهده آگهی استخدام یکی از موقعیت های شغلی سمت راست را انتخاب
          کنید
        </Span>
      </Title>
    </>
  );
}
