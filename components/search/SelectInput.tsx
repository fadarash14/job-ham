import React, { PropsWithChildren, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  WidthProps,
  space,
  SpaceProps,
  width,
} from "styled-system";
import Select, { ActionMeta } from "react-select";
import { Option } from "@/types";

type Options = Option[] | null;
type ArrowIconProp = any;

const FormControl = styled.form<ColorProps | LayoutProps>(
  {
    display: "flex",
    borderRadius: "12px",
  },
  layout,
  `
  & select {
    display:none;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
}
& span {
  display:none;
}
& svg {
  // display:none;
}
`
);

const Form = styled.div<PositionProps | WidthProps | LayoutProps>`
  // display: flex;
  // flex: 1 1 100%;
  // max-width: 190px;
  // min-width: 150px;

  margin: 0 5px;
  & select ::after {
    content: "";
    display: block;
    margin-top: 10px;
    height: 1px;
    background: #d1d1d1;
    opacity: 76%;
  }
  ${position}
  ${width}
  ${layout}
`;

const Button = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  left: 27px;
  top: 0px;
  position: relative;
  ${color}
`;
const Img = styled.div<SpaceProps>`
  min-width: fit-content;
  display: flex;
  margin: auto;
  cursor: pointer;
  ${space}
`;
// const Select = styled.select<SpaceProps | LayoutProps>`
//   display: flex;
//   flex: 1 1 100%;
//   border-radius: 12px;
//   height: 37px;
// `;
export default function SelectInput(
  props: PropsWithChildren<{
    bg?: string;
    mobile: boolean;
    placeHolder: string;
    options: Options;
    minWidth?: string | number;
    maxWidth?: string | number;
    value: any;
    onChange: any;
    onClear?: () => void;
    isDisabled?: boolean;
    isMulti?: boolean;
  }>
) {
  return (
    <Form
      minWidth={props.minWidth}
      maxWidth={props.maxWidth}
      position={["static", "relative"]}
    >
      <FormControl bg={props.bg} height={["40px", "37px"]}>
        <Select
          isDisabled={props?.isDisabled}
          maxMenuHeight={250}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 2020,
              backgroundColor: props.bg,
              height: "32px",
              fontSize: 14,
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              width: props.maxWidth,
              minWidth: props.minWidth,
              borderRadius: "12px",
              // height: "40px",
              fontSize: 14,
            }),
            menu: (base) => ({
              ...base,
              width: props.maxWidth,
              minWidth: props.minWidth,
              zIndex: 2020,
              fontSize: 14,
            }),
            option: (base) => ({
              ...base,
              fontSize: 14,
            }),
          }}
          value={props.value}
          placeholder={props.placeHolder}
          options={props.options!}
          isClearable={false}
          isMulti={props?.isMulti}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.title}
          // @ts-ignore
          onChange={props.onChange}
        />
        {props.value ? (
          <Button>
            <Img>
              <Image
                src={"/icons/close.svg"}
                height={16}
                width={16}
                alt={"close"}
                // @ts-ignore
                onClick={props.onClear}
              />
            </Img>
          </Button>
        ) : null}
      </FormControl>
    </Form>
  );
}
