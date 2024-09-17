import React, { useState } from "react";
import Swiper from "@/components/swiper/swiperSkeleton";
import styled from "styled-components";
// import Container from "../utility/Container";
import Image from "next/image";
import {
  _Creditfares,
  _Sharedfares,
  _CreaditFaresCard,
  _SharedFaresCard,
} from "@/mock/_employers";
import {
  BorderProps,
  ColorProps,
  LayoutProps,
  backgroundColor,
  border,
  color,
  layout,
} from "styled-system";
import FaresCard from "../employer/FaresCard";

type Props = {
  tableId: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  justify-content: center;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0 auto;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-right: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const Div = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    display: none;
  }
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
export default function FareCardsSwiper() {
  const [tables, setTables] = useState(1);
  let data = [];
  if (tables === 1) {
    data = _CreaditFaresCard;
  } else {
    data = _SharedFaresCard;
  }
  const showTableHandler = (e: React.MouseEvent<HTMLElement>) => {
    const id = Number((e.target as HTMLInputElement).id);
    if (id !== tables) setTables(id);
  };
  return (
    <Div>
      <ButtonWrapper>
        <Button
          id="1"
          color={tables === 1 ? "white" : "black"}
          //  @ts-ignore
          backgroundColor={tables === 1 ? "lipstick" : "unset"}
          onClick={showTableHandler}
        >
          اعتباری
        </Button>
        <Button
          id="2"
          color={tables === 2 ? "white" : "black"}
          //  @ts-ignore
          backgroundColor={tables === 2 ? "lipstick" : "unset"}
          onClick={showTableHandler}
        >
          اشتراکی
        </Button>
      </ButtonWrapper>
      <Container>
        <Swiper isFinite={false} height={460} ssr={true}>
          {data.map((item, key) => (
            <ItemWrapper key={key}>
              <FaresCard data={item} />
            </ItemWrapper>
          ))}
        </Swiper>
      </Container>
    </Div>
  );
}
