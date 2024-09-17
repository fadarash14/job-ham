import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  alignItems,
  AlignItemsProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
} from "styled-system";
import AdsUploadContext from "../AdsUploadContext";
import ErrorMessage from "../../log in/ErrorMessage";
import Image from "next/image";
import { Filter } from "../../../types";
import AdsErrorMessage from "../AdsErrorMessage";
import { Property } from "csstype";
import BelowMessage from "../BelowMessage";

const Flex = styled.div<FlexboxProps | SpaceProps | AlignItemsProps>`
  flex: 1 1 100%;
  position: relative;
  display: flex;
  ${alignItems}
  ${flexbox}
    ${space}
`;
const Values = styled.div`
  color: #f5f6fa;
  font-size: 12px;
  display: flex;
  color: #d1d1d1;
  overflow: hidden;
  flex: 1 1 80%;
`;
const CheckPos = styled.div`
  padding-right: 10px;
  position: relative;
  display: flex;
  width: 24px;
`;
const TickPos = styled.div`
  display: flex;
  margin: auto auto auto 0;
`;
const Tick = styled.div`
  margin: auto auto auto 0;
  height: 10px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div<
  BorderProps | ColorProps | { label: number; onClick: Function; value: any }
>`
  display: flex;
  min-width: fit-content;
  padding: 5px 10px;
  justify-content: center;
  position: relative;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 2px;
  ${border}
  ${color}
    cursor:pointer;
  &:first-child {
    // border-top-right-radius:15px;
    // border-bottom-right-radius:15px;
    margin-right: 0;
  }
  &:last-child {
    // border-top-left-radius:15px;
    // border-bottom-left-radius:15px;
    margin-left: 0;
  }
  @media (max-width: 576px) {
    flex: 1 1 70px;
  }
`;
const Top = styled.div`
  font-size: 14px;
  flex: 1 1;
  @media (max-width: 576px) {
    width: max-content;
  }
`;

export default function LineCheck(props: {
  filters: Filter;
  val: any;
  continue: boolean;
}) {
  const [value, setValue] = useState<number>(parseInt(props.val));
  const [isTouched, setTouched] = useState(false);
  const { selectedFilter, setSelectedFilter, setLevel } =
    useContext(AdsUploadContext);
  const [approve, setApprove] = useState("");
  const [message, setMessage] = useState("");

  function selectOption(value: number | boolean, filterId: number) {
    setSelectedFilter({ ...selectedFilter, [filterId]: value });
    setApprove(" ");
  }

  function error() {
    setApprove(" ");
  }

  const fill =
    props.filters.is_required && !selectedFilter[parseInt(props.filters.id)];
  return (
    <Flex my={"24px"} flexDirection={"column"}>
      <Flex flexDirection={["column", "row"]} alignItems={["none", "center"]}>
        <Top>{props.filters?.label}</Top>
        <Div>
          <Values>
            {
              //@ts-ignore
              Object.keys(props.filters.options).map((f: number, i) => (
                <Value
                  key={i}
                  label={f}
                  onClick={() => {
                    setValue(props.filters.options[f].id);
                    selectOption(
                      props.filters.options[f].id,
                      parseInt(props.filters.id)
                    );
                    error();
                  }}
                  onBlur={() => {
                    setTouched(true);
                    setMessage(" ");
                  }}
                  color={
                    props.filters.options[f].id === value
                      ? "#2d2c2c"
                      : "#707070"
                  }
                  bg={
                    props.filters.options[f].id === value
                      ? "rgba(0, 195, 156, 0.13)"
                      : ""
                  }
                  border={
                    props.filters.options[f].id === value
                      ? "1px solid #00C39C"
                      : "1px solid #d1d1d1"
                  }
                  value={props.filters.options[f].title}
                >
                  {props.filters.options[f].title}
                </Value>
              ))
            }
          </Values>
          <CheckPos>
            {fill && props.continue ? (
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
          </CheckPos>
        </Div>
      </Flex>
      {fill && props.continue ? (
        <BelowMessage message={"تکمـیل این مـورد اجبـاری می باشـد."} />
      ) : null}
    </Flex>
  );
}
