import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AdsUploadContext from "@/components/addWizard/AdsUploadContext";
import { Filter } from "@/types";
import styled from "styled-components";
// import ErrorMessage from "../../log in/ErrorMessage";
import { debounce } from "lodash";
import Image from "next/image";
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
import AdsErrorMessage from "@/components/addWizard/AdsErrorMessage";
import clsx from "clsx";
import BelowMessage from "@/components/addWizard/BelowMessage";

const Whole = styled.div`
  display: flex;
  position: relative;
  flex: 1 1 100%;
  align-items: center;
  margin-bottom: 16px;
`;
const Div = styled.div`
  width: 100%;
`;

const Input = styled.input<BorderProps>`
  height: 40px;
  background: transparent;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  flex: 1 1 90%;
  color: #474546;
  padding-right: 10px;
  width: 100%;
  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #d1d1d1;
    // color: black;
  }
  ${border}
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
  margin: 8px 0;
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
const Flex = styled.div`
  display: flex;
`;
const Entry = styled.div`
  flex: 1 1 80%;
  position: relative;
`;
const Piece = styled.div`
  margin: auto;
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

const PlaceHolder = styled.div<BorderProps>`
  background: white;
  color: #707070;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  // width: 20%;
  padding: 0 10px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  text-align: center;
  display: flex;
  border: 1px solid #d1d1d1;
  ${border}
`;
export default function SimpleInput(props: {
  filters: Filter;
  val: any;
  continue: boolean;
  message: string;
}) {
  const { selectedFilter, setSelectedFilter } = useContext(AdsUploadContext);
  const [approve, setApprove] = useState("");
  const [isTouched, setTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBelow, setMessageBelow] = useState("");
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState<string | undefined>(props.val);

  function selectOption(value: string, filterId: number) {
    if (value.length === 0) {
      setValue(value);
      setMessage(" ");
      setApprove("");
      //@ts-ignore
      setSelectedFilter({ ...selectedFilter, [filterId]: "" });
    } else {
      setValue(value);
      setApprove(" ");
      setMessage("");
      setSelectedFilter({ ...selectedFilter, [filterId]: value });
    }
  }
  const debouncedSelectOption = debounce(selectOption, 300);

  const inputRef = useRef<any>(null);

  const fill =
    props.filters.is_required &&
    !selectedFilter[parseInt(props.filters.id)] &&
    !value;
  // console.log(approve);
  return (
    <Whole>
      <Div>
        <Span>{props.filters?.label}</Span>
        <Flex>
          <Entry>
            {
              //@ts-ignore
              <Input
                ref={inputRef}
                border={clsx({
                  //@ts-ignore
                  "1px solid #00C39C": selectedFilter[props.filters.id],
                  "1px solid #f18f6b":
                    //@ts-ignore
                    !!value && !selectedFilter[props.filters.id],
                })}
                // onInput={(e) => maxLengthCheck(e)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const selectedValue = e.target.value;
                  //@ts-ignore
                  debouncedSelectOption(selectedValue, props.filters.id);
                }}
                onBlur={() => {
                  setTouched(true);
                  setMessage(" ");
                }}
                // pattern={"\\d*"}
                // lang={"en-US"}
                placeholder={props.filters?.label}
                defaultValue={props.val}
              />
            }
            {props.filters.placeholder && (
              <PlaceHolder
                border={
                  //@ts-ignore
                  selectedFilter[props.filters.id] ? "1px solid #00C39C" : ""
                }
              >
                <Piece>{props.filters.placeholder}</Piece>
              </PlaceHolder>
            )}
          </Entry>
          <CheckPos>
            {(fill && props.continue) || (fill && isTouched) ? (
              <AdsErrorMessage message={message || props.continue} />
            ) : null}
            {approve !== "" ||
            (selectedFilter[parseInt(props.filters.id)] && message === "") ? (
              <TickPos>
                <Tick>
                  <Image
                    alt=""
                    src={"/icons/green tick.svg"}
                    height={10}
                    width={15}
                  />
                </Tick>
              </TickPos>
            ) : null}
          </CheckPos>
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
          <div>{props?.filters?.label} خـود را وارد کـنـید.</div>
        </Text>
      </Div>
    </Whole>
  );
}

SimpleInput.defaultProps = {
  continue: false,
};
