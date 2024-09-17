import { Dispatch, useContext, useRef, useState } from "react";
import Select, { StylesConfig } from "react-select";
import styled, { keyframes } from "styled-components";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  fontWeight,
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  FlexProps,
  flex,
  BackgroundColorProps,
  background,
  display,
} from "styled-system";
import Image from "next/image";
import AdsUploadContext from "../AdsUploadContext";
import { CSSObject } from "@emotion/serialize";
import { Filter } from "@/types";
import { OptionProps } from "react-select";
import { MenuProps } from "react-select";
import Search from "@/public/icons/grey-search-icon.svg";
import { levels } from "@/dictionaries/cv-filters.json";
import React from "react";

const Modal = styled.div<LayoutProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(45 44 44 / 71%);
  z-index: 10300;
`;

const ModalContent = styled.div`
  background: #e8e8ec;
  width: 500px;
  border-radius: 15px;
  z-index: 10300;
  padding: 15px;
`;
const Flex = styled.div<LayoutProps | FlexProps | SpaceProps>`
  &::-webkit-scrollbar {
    display: none;
  }
  ${layout}
  ${flex}
  ${space}
`;
const BottomFlex = styled.div<LayoutProps | FlexProps | SpaceProps>`
  background-color: white;
  border-radius: 15px;
  padding: 4px;
  margin-top: 20px;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 40px;
  ${layout} ${flex} ${space};
`;
const SmallDiv = styled.div`
  border: 1px solid #d1d1d1;
  background-color: white;
  border-radius: 4px;
  padding: 1px 0px;
  margin: 5px;
  justify-content: center;
  align-self: center;
  text-align: center;
  min-width: 76px;
  max-width: 124px;
  cursor: pointer;
`;
const Img = styled.div<SpaceProps>`
  align-self: center;
  display: flex;
  position: relative;
  cursor: pointer;
  ${space}
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  ${space}
  ${layout}
`;
const Level = styled.div`
  width: 100%;
  text-align-center;
  align-items:center;
  display:flex;
  cursor:pointer;
  justify-content:center;
  height:100%;
  &:not(:last-child) {
    border-left: 1px solid #D1D1D1;
  }
  &:last-child {
    border-bottom-left-radius:12px;
    border-top-left-radius:12px;
  }
  &:first-child {
    border-bottom-right-radius:12px;
    border-top-right-radius:12px;
  }
  :hover {
    color: white;
    background:#db143d;

  }
`;
const CustomIndicator = () => (
  <div style={{ position: "relative", left: "3px", top: "3px" }}>
    <Search />
  </div>
);
export function AdsMultiSelectModal(props: {
  closeModal: Dispatch<any>;
  label: string;
  options: { value: number; label: string }[];
  filters: Filter;
}) {
  const { selectedFilter, setSelectedFilter } = useContext(AdsUploadContext);
  const inputRef = useRef<any>(null);
  const [values, setValues] = useState<{
    id: number;
    label: string;
    levelId: number;
  }>({ id: 0, levelId: 0, label: "" });
  function selectOption(item: { label: string; value: number }) {
    if (item !== null) {
      setValues((prev) => ({ ...prev, id: item.value, label: item.label }));
    }
  }
  const filterOptions = (
    candidate: { label: string; value: string; data: any },
    input: string
  ) => {
    if (input) {
      const inputValue = input.toLowerCase();
      const label = candidate.label.toLowerCase();
      return label.includes(inputValue);
    }
    return true;
  };

  const levelHandler = (id: number) => {
    if (values.id !== 0) {
      let _values = { ...values };
      _values.levelId = id;
      const filterId = parseInt(props.filters.id);
      let prevValues: any[] = [];
      if (selectedFilter[filterId]) {
        prevValues = selectedFilter[filterId];
      }

      prevValues.push(_values);
      setSelectedFilter({
        ...selectedFilter,
        [filterId]: prevValues,
      });
      //@ts-ignore
      props.closeModal();
    }
  };
  const customStyles: StylesConfig<any, any> = {
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
      borderBottom: "1px solid #D1D1D1",
      cursor: "pointer",
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
      paddingLeft: "5px",
      display: "flex",
      cursor: "pointer",
      zIndex: 3,
      "&:hover": {
        border: "1px solid #acacac",
      },
    }),
    placeholder: () => ({
      fontSize: "14px",
      color: "#acacac",
      position: "absolute",
      right: "10px",
    }),
    input: () => ({
      color: "#474546",
      fontSize: "14px",
    }),
    singleValue: () => ({
      position: "absolute",
      fontSize: "14px",
    }),
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
      fontSize: "12px",
      zIndex: 2,
      margin: "10px 10px",
      borderBottomLeftRadius: "14px",
      borderBottomRightRadius: "14px",
      overflowY: "auto",
      scrollBehavior: "smooth",
      paddingTop: "10px",
      position: "relative",
      height: "180px",
      top: "10px",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 3 }),
    menuList: () => ({
      overflowY: "auto",
      maxHeight: "180px",
      marginRight: "0px",
      paddingRight: "0px",
      scrollBehavior: "smooth",
      width: "auto",
      "&::-webkit-scrollbar": {
        display: "none !important",
      },
    }),
  };

  return (
    <Modal>
      <ModalContent>
        <Title>
          <Span>{`${props.label}`}</Span>
          <Img onClick={props.closeModal}>
            <Image
              alt="remove"
              height={20}
              width={20}
              src={"/icons/close-icon-modal.svg"}
            />
          </Img>
        </Title>
        <Flex>
          <Select
            ref={inputRef}
            styles={customStyles}
            components={{
              IndicatorSeparator: null, // Hide the default indicator separator
              DropdownIndicator: CustomIndicator, // Use the custom SVG component for the dropdown indicator
            }}
            aria-labelledby="aria-label1"
            inputId="aria-example-input1"
            name="aria-live-color1"
            onChange={(e) => {
              //@ts-ignore
              selectOption(e, parseInt(props.filters.id));
            }}
            options={props.options}
            placeholder={props.filters?.placeholder}
            filterOption={filterOptions}
            menuIsOpen
            isSearchable={true}
            isClearable={true}
          />
        </Flex>
      </ModalContent>
      <BottomFlex display={"flex"}>
        {levels?.map((level, i: number) => (
          <Level onClick={() => levelHandler(level.id)} key={i}>
            <Span width={"100%"} fontSize={14}>
              {level.title}
            </Span>
          </Level>
        ))}
      </BottomFlex>
    </Modal>
  );
}
export const MemoizedAdsMultiSelectModal = React.memo(AdsMultiSelectModal);
