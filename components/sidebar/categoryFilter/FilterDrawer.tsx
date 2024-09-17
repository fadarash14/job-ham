import Box from "../../utility/Box";
import Image from "next/image";
import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import SideBarContext from "../context/SideBarContext";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";

const Label = styled.p<TypographyProps | ColorProps | LayoutProps | SpaceProps>`
  margin: 0 0 0 5px;
  ${space}
  ${layout}
    ${typography}
    ${color}
`;
const Wrapper = styled((props) => <Box {...props} />)<ColorProps>`
  margin: 5px -19px;
  ${color}
`;
const Piece = styled.div<ColorProps>`
  padding-right: 10px;
  ${color}
`;

const BoxHeader = styled((props) => <Box {...props} />)`
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-right: 10px;
`;

const BoxChildren = styled((props) => <Box {...props} />)`
  overflow: visible;
`;

const Cursor = styled.div`
  cursor: pointer;
  height: 24px;
  display: flex;
  align-items: Center;
`;
const Dot = styled.div`
  position: absolute;
  right: -5px;
`;
const Remove = styled.div<LayoutProps>`
  font-size: 12px;
  color: #fcc155;
  margin-left: 8px;
  ${layout}
`;

export default function FilterDrawer(
  props: PropsWithChildren<{
    value: any;
    clear: any;
    label: string;
    closeLabel: string;
    id: number;
    filterId: number;
    themeMode: { color: string; bg: string; plus: string; close: string };
  }>
) {
  const { openFilter, setOpenFilter } = useContext(SideBarContext);

  return (
    <Wrapper
      display={"flex"}
      flexDirection={"column"}
      px={"19px"}
      py={"10px"}
      bg={props.value ? "rgba(252,193,85,0.14)" : props.themeMode.bg}
    >
      <BoxHeader
        onClick={() =>
          setOpenFilter
            ? props.id !== openFilter
              ? setOpenFilter(props.id)
              : setOpenFilter(-1)
            : ""
        }
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        {props.value ? (
          <Dot>
            <Image src={"/icons/gigili.svg"} height={8} width={8} alt="" />
          </Dot>
        ) : null}
        <Label fontSize={12} color={props.themeMode.color}>
          {props.label}
        </Label>
        {openFilter === props.id ? (
          <Cursor>
            <Remove
              onClick={props.clear}
              display={props.value ? "block" : "none"}
            >
              حذف
            </Remove>
            <Image
              onClick={() => (setOpenFilter ? setOpenFilter(-1) : "")}
              height={24}
              width={24}
              src={props.themeMode.close}
              alt={"btn"}
            />
          </Cursor>
        ) : (
          <Cursor>
            <Image
              onClick={() => (setOpenFilter ? setOpenFilter(props.id) : "")}
              height={24}
              width={24}
              src={props.themeMode.plus}
              alt={"btn"}
            />
          </Cursor>
        )}
      </BoxHeader>
      <CSSTransition
        in={openFilter === props.id}
        timeout={300}
        classNames="drawer"
        unmountOnExit
      >
        <BoxChildren>{props.children}</BoxChildren>
      </CSSTransition>
      {/*<CSSTransition*/}
      {/*    in={openFilter !== props.id}*/}
      {/*    timeout={300}*/}
      {/*    classNames="drawer"*/}
      {/*    unmountOnExit*/}
      {/*>*/}
      {/*    <Label mt={clsx({'10px': props.closeLabel})} fontSize={12} color={'maize'}>{props.closeLabel}</Label>*/}
      {/*</CSSTransition>*/}
    </Wrapper>
  );
}

FilterDrawer.defaultProps = {
  closeLabel: "",
};
