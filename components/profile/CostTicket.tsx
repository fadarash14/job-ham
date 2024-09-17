import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";

const Reciept = styled.div`
  background-color: rgba(251, 163, 3, 0.1);
  padding: 12px 18px 12px 13.5px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid rgba(71, 69, 70, 0.12);
  border-left: none;
  flex: 1 1 70%;
`;
const Cut = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;
  position: relative;
`;

const Left = styled.div<ColorProps>`
  height: 20px;
  width: 40px;
  position: absolute;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #e8e8ec;
  bottom: 0;
  border: 1px solid rgba(71, 69, 70, 0.12);
  border-bottom: 0;
  ${color}
`;

const Right = styled.div<ColorProps>`
  height: 20px;
  width: 40px;
  position: absolute;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: #e8e8ec;
  top: 0;
  border: 1px solid rgba(71, 69, 70, 0.12);
  border-top: none;
  ${color}
`;

const Dashed = styled.div`
  flex: 1 1 80%;
  background: rgba(251, 163, 3, 0.1);
  display: flex;
  flex-direction: column;
  &::after {
    content: "";
    display: block;
    height: 95%;
    width: 0;
    border: 1px dashed rgba(251, 163, 3, 0.5);
    margin: auto;
  }
`;
const Pay = styled.div`
  background-color: rgba(251, 163, 3, 0.1);
  padding: 20px 18px 20px 13.5px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  flex: 1 1 25%;
  border: 1px solid rgba(71, 69, 70, 0.12);
  border-right: none;
`;

const PayButton = styled.div`
  margin-right: auto;
  padding: 5px;
  align-items: center;
  display: flex;
  background: rgba(251, 163, 3, 0.35);
  border-radius: 8px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  &.payment {
    justify-content: space-between;
    margin-right: 30px;
  }
`;
const Mute = styled.div`
  color: #acacac;
  font-size: 12px;
  font-weight: 500;
`;
const Unit = styled.div`
  color: #fba303;
  font-size: 14px;
  font-weight: 600;
  margin: auto;
`;
const Img = styled.div<SpaceProps | LayoutProps>`
  cursor: pointer;
  ${space}
  ${layout}
`;

const Div = styled.div<FlexboxProps>`
  display: flex;
  width: 100%;
  margin: 10px 0;
  ${flexbox}
`;

interface IProps {
  flag: boolean;
  title: string;
  price: number | string;
  handleOnclick: any;
  bg: string;
}

export default function CostTicket(props: IProps) {
  return (
    <Div>
      <Reciept>
        <Flex>
          <Img ml={10} onClick={props.handleOnclick}>
            {props.flag ? (
              <Image
                height={19}
                width={19}
                src={"/icons/red check.svg"}
                alt=""
              />
            ) : (
              <Image
                height={19}
                width={19}
                src={"/icons/CheckBoxIcon.svg"}
                alt=""
              />
            )}
          </Img>
          <div>{props.title}</div>
        </Flex>
        <Flex className={"payment"}>
          <Mute></Mute>
        </Flex>
      </Reciept>
      <Cut>
        <Right bg={props.bg}></Right>
        <Dashed></Dashed>
        <Left bg={props.bg}></Left>
      </Cut>
      <Pay>
        <Unit>{props.price} تــومان</Unit>
      </Pay>
    </Div>
  );
}

CostTicket.defaultProps = {
  bg: "#E8E8EC",
};
