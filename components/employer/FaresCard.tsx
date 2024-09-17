import Image from "next/image";
import React from "react";
import styled from "styled-components";
import {
  color,
  border,
  ColorProps,
  BorderProps,
  LayoutProps,
  layout,
  backgroundColor,
} from "styled-system";

type Props = {
  data: {
    title: string;
    price: string;
    options: { title: string; value: number }[];
  };
};

const Img = styled.div`
  display: flex;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #d1d1d1;
  width: 100%;
`;
const Price = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  min-height: 250px;
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  margin-bottom: 5px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  max-width: 280px;
  width: 100%;
  height: 100%:
`;
const RedButton = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 110px;
  height: 33px;
  cursor: pointer;
  display: flex;
  align-items: center;
  //   margin-right: 10px;
  border: none;
  & > span {
    font-size: 11px;
  }
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
const Label = styled.label`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  white-space: nowrap;
  ${color}
  ${layout}
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: black;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 110px;
  height: 33px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: none;
  & > span {
    font-size: 11px;
  }
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
// const Span = styled.span<
//   FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
// >`
//   @media only screen and (max-width: 768px) {
//     justify-content: center;
//   }
//   white-space: nowrap;
//   ${color}
//   ${fontSize}
//   ${fontWeight}
//   ${space}
//   ${layout}
// `;

export default function FaresCard({ data }: Props) {
  return (
    <CardWrapper>
      <Content>
        <Title>{data.title}</Title>
        <Price>{data.price}</Price>
        <Div>
          {data.options.map((option, index: number) => (
            <Item key={index}>
              <Label>{option.title}</Label>
              <Img>
                {option.value === 1 ? (
                  <Image
                    width={20}
                    height={20}
                    alt="correct"
                    src={"/icons/icons8-done.svg"}
                  />
                ) : (
                  <Image
                    width={20}
                    height={20}
                    alt="correct"
                    src={"/icons/icons8-close.svg"}
                  />
                )}
              </Img>
            </Item>
          ))}
        </Div>
      </Content>
      <RedButton className="RedButton" backgroundColor={"lipstick"}>
        <span>ثبت نام و خرید</span>
      </RedButton>
    </CardWrapper>
  );
}
