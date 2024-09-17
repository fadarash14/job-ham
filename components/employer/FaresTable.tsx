import { _Creditfares, _Sharedfares } from "@/mock/_employers";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
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
import TableSkeleton from "../utility/Table/Table";
import FareCardsSwiper from "../swiper/FareCardsSwiper";

const Img = styled.div``;
const TableWrapper = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
  width: 80%;
  margin: 0 auto;
  max-width: 800px;
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
interface IButtonSyle {
  [key: string]: {
    id: number;
    color: string;
    backgroundColor: string;
  };
}

export default function FaresTable() {
  const [tables, setTables] = useState(1);
  const Fares1 = _Creditfares.map(({ id, title, one, five, ten, twenty }) => ({
    id,
    title,
    one:
      one === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    five:
      five === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    ten:
      ten === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    twenty:
      twenty === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
  }));
  const Fares2 = _Sharedfares.map(({ id, title, one, five, ten, twenty }) => ({
    id,
    title,
    one:
      one === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    five:
      five === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    ten:
      ten === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
    twenty:
      twenty === 1
        ? [
            <Img key={1}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-done.svg"}
              />
            </Img>,
            "فعال",
          ]
        : [
            <Img key={2}>
              <Image
                width={20}
                height={20}
                alt="correct"
                src={"/icons/icons8-close.svg"}
              />
            </Img>,
            "غیرفعال",
          ],
  }));
  const TableHeads1 = [
    {
      id: "oneAds",
      label: "انتشار یک آگهی 90 هزار تومان",
    },
    {
      id: "fiveAds",
      label: "انتشار 5 آگهی 250 هزارتومان",
    },
    {
      id: "tenAds",
      label: "انتشار 10 آگهی 440 هزارتومان",
    },
    {
      id: "TwentyAds",
      label: "انتشار 20 آگهی 850 هزارتومان",
    },
  ];
  const Footer = [
    {
      id: "oneAds",
      button: (
        <RedButton className="RedButton" backgroundColor={"lipstick"}>
          <span>ثبت نام و خرید</span>
        </RedButton>
      ),
    },
    {
      id: "fiveAds",
      button: (
        <RedButton className="RedButton" backgroundColor={"lipstick"}>
          <span>ثبت نام و خرید</span>
        </RedButton>
      ),
    },
    {
      id: "tenAds",
      button: (
        <RedButton className="RedButton" backgroundColor={"lipstick"}>
          <span>ثبت نام و خرید</span>
        </RedButton>
      ),
    },
    {
      id: "TwentyAds",
      button: (
        <RedButton className="RedButton" backgroundColor={"lipstick"}>
          <span>ثبت نام و خرید</span>
        </RedButton>
      ),
    },
  ];
  const showTableHandler = (e: React.MouseEvent<HTMLElement>) => {
    const id = Number((e.target as HTMLInputElement).id);
    if (id !== tables) setTables(id);
  };
  return (
    <TableWrapper>
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
      {tables === 1 && (
        <TableSkeleton
          footer={Footer}
          tableHeader={TableHeads1}
          data={Fares1}
        />
      )}
      {tables === 2 && (
        <TableSkeleton
          footer={Footer}
          tableHeader={TableHeads1}
          data={Fares2}
        />
      )}
      {/* <FareCardsSwiper tableId={tables} /> */}
    </TableWrapper>
  );
}
