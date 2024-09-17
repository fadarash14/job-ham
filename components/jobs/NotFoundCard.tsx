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
  display: flex;
  justify-content: center;
  //   max-width: 260px;
  margin-top: 50px;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps
>`
  text-align: right;
  color: #757575;
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;

export default function NotFoundCard() {
  return (
    <>
      <Img>
        <Image
          src={"/images/noContent.png"}
          alt={"انتخاب موقعیت شغلی"}
          width={288}
          height={238}
        />
      </Img>
      <Title>
        <Span fontSize={16} fontWeight={400}>
          متاسفانه فرصت شغلی با این مشخصات پیدا نشد!
          <br />
          پیشنهاد می‌کنیم فیلترها را تغییر داده و یا از کلمات دیگری انتخاب کنید
        </Span>
      </Title>
    </>
  );
}
