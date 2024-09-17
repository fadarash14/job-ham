import Select, { StylesConfig } from "react-select";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdsUploadContext from "../AdsUploadContext";
import { Filter } from "../../../types";
import { CSSObject } from "@emotion/serialize";
import { MenuProps } from "react-select";
import ErrorMessage from "../../log in/ErrorMessage";
import Image from "next/image";
import AdsErrorMessage from "../AdsErrorMessage";
import { OptionProps } from "react-select";
import {
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import BelowMessage from "../BelowMessage";

const Whole = styled.div`
  margin-bottom: 16px;
  position: relative;
  align-items: center;
`;
const Parent = styled.div`
  position: relative;
  flex: 1 1 90%;
`;
const Piece = styled.div`
  width: 100%;
`;
const Span = styled.div`
  font-size: 14px;
  color: #474546;
  margin-bottom: 8px;
`;

const Text = styled.div`
  font-size: 11px;
  color: #707070;
  align-items: center;
  margin-top: 8px;
  display: flex;
`;

const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  &.remove {
    opacity: 0.5;
  }
  ${layout}
  ${flexbox}
    ${space}
`;

const Flex = styled.div<LayoutProps>`
  display: flex;
  align-items: center;
  ${layout}
`;
const FilterUnit = styled.div<LayoutProps>`
  margin: auto;
  ${layout}
`;
const Unit = styled.div<BorderProps>`
  background: white;
  color: #707070;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 20%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  text-align: center;
  display: flex;
  border: 1px solid #d1d1d1;
  &:hover {
    border: 1px solid #acacac;
  }
  ${border}
`;
const TickPos = styled.div<LayoutProps>`
  display: flex;
  margin: auto auto auto 0;
  ${layout}
`;
const Tick = styled.div<LayoutProps>`
  margin: auto auto auto 0;
  height: 10px;
  ${layout}
`;
const Check = styled.div<LayoutProps>`
  padding-right: 10px;
  width: 24px;
  ${layout}
`;

export default function MultiSelect(props: {
  filters: Filter;
  val: any;
  continue: boolean;
}) {
  const [isTouched, setTouched] = useState(false);
  const { selectedFilter, setSelectedFilter, setLevel } =
    useContext(AdsUploadContext);
  const [approve, setApprove] = useState("");
  const [message, setMessage] = useState("");
  const [messageBelow, setMessageBelow] = useState("");
  const [focus, setFocus] = useState(false);

  function selectOption(value: {}[], filterId: number) {
    if (value.length === 0) {
      setApprove("");
      setSelectedFilter({ ...selectedFilter, [filterId]: "" });
    } else {
      setApprove(" ");
      setSelectedFilter({ ...selectedFilter, [filterId]: value });
    }
  }

  let Options = props.filters.options.map((i) => {
    return { label: i.title, value: i.id };
  });
  const inputRef = useRef<any>(null);

  // useEffect(() => {
  //     if (inputRef.current) {
  //         inputRef.current.focus();
  //         setFocus(false);
  //     }
  // }, [focus]);

  const filterOptions = (
    candidate: { label: string; value: string; data: any },
    input: string
  ) => {
    if (input) {
      return candidate.label.includes(input.toLowerCase());
    }
    return true;
  };

  const customStyles: StylesConfig<any, any> = {
    indicatorsContainer: () => ({
      position: "relative",
      left: "0px",
      top: "0px",
      display: "flex",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    container: () => ({
      flex: "1 1 100%",
      position: "relative",
    }),
    option: (
      base: CSSObject,
      { options, isSelected, isFocused }: OptionProps<any, any, any>
    ): CSSObject => ({
      ...base,
      background: isSelected
        ? "rgba(246,164,5,0.7)"
        : isFocused
        ? "#e8e8ec"
        : "",
    }),
    control: () => ({
      minHeight: "42px",
      background: "transparent",
      // @ts-ignore
      border: selectedFilter[props.filters.id]
        ? "1px solid #00C39C"
        : "1px solid #d1d1d1",
      borderRadius: "15px",
      fontsize: "14px",
      position: "relative",
      alignItems: "center",
      paddingRight: "10px",
      display: "flex",
      cursor: "pointer",
      zIndex: 3,
      "&:hover": {
        border: "1px solid #acacac",
      },
      "&::focus": {},
      "&:focus-within": {
        boxShadow: "rgb(108 108 108 / 50%) 0px 4px 20px -3px",
      },
    }),
    placeholder: () => ({
      fontSize: "14px",
      color: "#acacac",
      position: "relative",
      bottom: "10px",
    }),
    valueContainer: (base) => ({
      ...base,
      "& > div": {
        display: "flex",
        zIndex: 3,
      },
    }),
    input: () => ({
      color: "#474546",
      fontSize: "14px",
      position: "absolute",
      top: "0",
      margin: "10px 0",
    }),
    // singleValue: () => ({
    //   margin: "auto 0",
    //   fontSize: "14px",
    //   overflow: "none",
    //   Width: "max-content",
    //   color: "#474546",
    // }),
    multiValue: () => ({
      border: selectedFilter[parseInt(props.filters.id)]
        ? "1px solid #00C39C"
        : "1px solid #d1d1d1",
      borderRadius: "15px",
      margin: "0 2px",
      padding: "2px",
    }),
    menu: (base: CSSObject, props: MenuProps<any, any, any>): CSSObject => ({
      color: "#474546",
      background: "white",
      fontSize: "12px",
      zIndex: 2,
      margin: "0 10px",
      borderBottomLeftRadius: "14px",
      borderBottomRightRadius: "14px",
      boxShadow: "3px 5px 6px 0 rgba(112, 112, 112, 0.24)",
      paddingTop: "10px",
      position: "relative",
      // top: "-10px",
      top: "100%",
      // width: "96%"
    }),
    menuPortal: (base) => ({ ...base, zIndex: 3 }),
    // multiValueRemove: () => ({ display: "none" }),
    menuList: () => ({
      overflowY: "scroll",
      maxHeight: "200px",
      marginRight: "0px",
      paddingRight: "0px",
      width: "auto",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
    }),
  };

  const fill =
    props.filters.is_required && !selectedFilter[parseInt(props.filters.id)];
  return (
    <Whole
      style={{
        display: props.filters.filter_id === 0 ? "flex" : "none",
      }}
    >
      <Parent>
        <Piece>
          <Span onClick={() => setFocus(true)}>{props.filters?.label}</Span>
          <Flex>
            <Flex width={"100%"}>
              <Select
                ref={inputRef}
                styles={customStyles}
                aria-labelledby="aria-label1"
                inputId="aria-example-input1"
                name="aria-live-color1"
                defaultValue={props.val}
                //@ts-ignore
                onChange={(e) => selectOption(e, parseInt(props.filters.id))}
                options={Options}
                placeholder={props.filters?.placeholder}
                filterOption={filterOptions}
                onBlur={() => {
                  setTouched(true);
                  setMessage(" ");
                }}
                isMulti={true}
                isClearable={true}
                isSearchable={false}
                // menuIsOpen
              />
              {/* {props.filters.unit && (
                <Unit
                  border={
                    //@ts-ignore
                    selectedFilter[props.filters.id] ? "1px solid #00C39C" : ""
                  }
                >
                  <FilterUnit>{props.filters.unit}</FilterUnit>
                </Unit>
              )} */}
            </Flex>
            <Check>
              {(fill && props.continue) || (fill && isTouched) ? (
                <AdsErrorMessage message={message || props.continue} />
              ) : null}
              {approve !== "" ||
              (props.filters.is_required &&
                selectedFilter[parseInt(props.filters.id)]) ? (
                <TickPos>
                  <Tick>
                    <Image
                      src={"/icons/green tick.svg"}
                      height={10}
                      width={15}
                      alt=""
                    />
                  </Tick>
                </TickPos>
              ) : null}
            </Check>
          </Flex>
          {(fill && props.continue) || (fill && isTouched) ? (
            <BelowMessage message={"تکمـیل این مـورد اجبـاری می باشـد."} />
          ) : null}
          <Text>
            <Img height={"15px"} ml={"10px"}>
              <Image
                src={"/icons/Arrow - Left 2.svg"}
                height={8}
                width={8}
                alt=""
              />
            </Img>
            <div>{props?.filters?.label} خـود را انتـخـاب کـنـید.</div>
          </Text>
        </Piece>
      </Parent>
    </Whole>
  );
}

MultiSelect.defaultProps = {
  continue: false,
};
