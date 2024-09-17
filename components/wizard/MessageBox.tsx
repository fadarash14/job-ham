import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { height, HeightProps, width, WidthProps } from "styled-system";

type MessageProps = {
  item: {
    position: string;
    id: number;
    name: string;
    message: string;
  };
  width: number | string;
  height: number | string;
};

const Box = styled.div<HeightProps | WidthProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  direction: rtl;
  ${width}
  ${height}
`;
const Message = styled.p`
  display: flex;
  height: 80%;
  text-align: justify;
  line-height: 28px;
  margin: 0;
`;
const Footer = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    font-size: 12px;
    text-align: left;
  }
`;
const Img = styled.div``;

export default function MessageBox(props: MessageProps) {
  return (
    <Box width={props.width} height={props.height}>
      <Message>{props.item.message}</Message>
      <Footer>
        <Title>
          <span>{props.item.name}</span>
          <span>{props.item.position}</span>
        </Title>
        <Img>
          <Image
            src={"/icons/icons-messages.svg"}
            alt="message"
            width={25}
            height={25}
          />
        </Img>
      </Footer>
    </Box>
  );
}
