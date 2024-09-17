import React, { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { border, BorderProps, color, ColorProps } from "styled-system";
//@ts-ignore
import { fadeInDown } from "react-animations";
import clsx from "clsx";
import Box from "../utility/Box";

const fadeInDownAnimation = keyframes`${fadeInDown}`;

const Content = styled.div`
  display: flex;
  width: 333.7px;
  height: 76px;
  margin: 8px 0 0 7.3px;
  padding: 12.4px 13.8px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  color: white;
  border: solid 1px #f5f6fa;
  background-color: rgba(71, 69, 70, 0.6);
  position: fixed;
  border-radius: 10px;
  top: 90px;
  right: 20px;
  z-index: 1021;
  align-items: center;
  cursor: pointer;
  animation: 1s ${fadeInDownAnimation};
  @media (max-width: 576px) {
    width: 80%;
  }
`;

const Icon = styled.div``;

const Text = styled.div`
  font-size: 12px;
  font-weight: 300;
`;
const Button = styled.div<ColorProps | BorderProps>`
  margin-top: auto;
  margin-right: auto;
  background: rgba(251, 163, 3, 27%);
  border: 1px solid;
  border-radius: 15px;
  padding: 2px 25px;
  font-size: 10px;
  cursor: pointer;
  ${color}
  ${border}
`;
const Img = styled.div`
  position: absolute;
  left: -8px;
  top: -8px;
`;
const Line = styled.div<ColorProps>`
  width: 1px;
  height: 100%;
  margin: 0 10px;
  background: #fcc155;
  ${color}
`;
enum Types {
  "WARNING" = "warning",
  "ERROR" = "error",
  "SUCCESS" = "success",
}

export default function Toast(
  props: PropsWithChildren<{
    isHovering: boolean;
    setIsHovering: Dispatch<boolean>;
    text: string;
    confirm?: boolean;
    onConfirm?: Dispatch<any>;
    onCancel?: Function;
    type: string;
  }>
) {
  const handleMouseOver = () => {
    if (props.onCancel) {
      props.onCancel();
    }

    props.setIsHovering(false);
  };

  useEffect(() => {
    if (!props.confirm) {
      const timer = setTimeout(() => {
        props.setIsHovering(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {props.isHovering && (
        <Content>
          <Icon>
            <Image
              height={21}
              width={21}
              src={`/icons/${props.type}.svg`}
              alt={props.type}
            />
          </Icon>
          <Line
            bg={clsx({
              maize: props.type === "warning",
              green_blue: props.type === "success",
              lipstick: props.type === "error",
            })}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Text>{props.text}</Text>
            <Box display={"flex"}>
              {/*{props.confirm && props.onCancel &&*/}
              {/*<Button bg={'purplish_brown'} onClick={props.onCancel}>*/}
              {/*    انصراف*/}
              {/*</Button>*/}
              {/*}*/}
              {props.confirm && props.onConfirm && (
                <Button
                  bg={"rgba(251,163,3,0.27)"}
                  borderColor={clsx({
                    maize: props.type === "warning",
                    green_blue: props.type === "success",
                    lipstick: props.type === "error",
                  })}
                  onClick={props.onConfirm}
                >
                  ادامه
                </Button>
              )}
            </Box>
          </Box>
          <Img onClick={handleMouseOver}>
            <Image
              height={20}
              width={20}
              src={"/icons/remove.svg"}
              alt={"remove"}
            />
          </Img>
        </Content>
      )}
    </>
  );
}

Toast.defaultProps = {
  confirm: false,
  type: "success",
};
