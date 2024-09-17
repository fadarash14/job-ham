import AdsErrorMessage from "./AdsErrorMessage";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { border, BorderProps, space, SpaceProps } from "styled-system";
import AdsUploadContext from "./AdsUploadContext";
import { wordCount } from "../../utils/helper";
import BelowMessage from "./BelowMessage";
import { Filter } from "@/types";
import clsx from "clsx";
import { debounce } from "lodash";

const Whole = styled.div`
  margin-bottom: 32px;
`;
const Piece = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-right: 5px;
`;

const Title = styled.div<SpaceProps>`
  color: #474546;
  font-weight: 450;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &.lined::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #d1d1d1;
  }
  ${space}
`;
const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const CheckPos = styled.div`
  padding-right: 10px;
  width: 24px;
`;
const TickPos = styled.div`
  display: flex;
  min-width: fit-content;
`;
const Tick = styled.div`
  margin: auto auto auto 0;
`;
const Explain = styled.textarea<BorderProps>`
  height: 112px;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: transparent;
  flex: 1 1 90%;
  padding: 10px;
  outline: none;
  resize: none;
  -webkit-user-select: text; /* Chrome, Opera, Safari */
  -moz-user-select: text; /* Firefox 2+ */
  -ms-user-select: text; /* IE 10+ */
  user-select: text; /* Standard syntax */
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }

  ${border}
`;
const Span = styled.div`
  font-size: 14px;
  color: #474546;
  margin-bottom: 8px;
`;

export default function ExplainInput(props: {
  filters: Filter;
  val: any;
  continue: boolean;
  message: string;
  placeHolder?: string;
}) {
  const [approveContent, setApproveContent] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isTouched, setTouched] = useState(false);
  const { selectedFilter, setSelectedFilter } = useContext(AdsUploadContext);

  // const { content, setContent } = useContext(AdsUploadContext);
  // const [textarea, setTextArea] = React.useState(content);
  const [value, setValue] = useState<any | undefined>(props.val);

  const inputRef = useRef<any>(null);

  function word(e: any) {
    const words = wordCount(inputRef.current.value);
    const inputValue = e.target.value;

    if (words > 9) {
      setApproveContent(" ");
      setMessageContent("");
      debouncedSetSelectedFilter(inputValue);
    } else {
      debouncedSetSelectedFilter("");
      setMessageContent(" ");
      setApproveContent("");
    }

    debouncedSetValue(inputValue);
  }

  // useEffect(() => {
  //   if (value.length >= 10) {
  //     setSelectedFilter({
  //       ...selectedFilter,
  //       [props.filters.filter_id]: value,
  //     });
  //   } else {
  //     setValue("");
  //   }
  // }, [value]);

  const fill =
    props.filters.is_required &&
    !selectedFilter[parseInt(props.filters.id)] &&
    !value;
  const debouncedSetValue = debounce((newValue) => {
    setValue(newValue);
  }, 300);

  const debouncedSetSelectedFilter = debounce((value) => {
    setSelectedFilter({
      ...selectedFilter,
      [props.filters.id]: value,
    });
  }, 300);

  return (
    <Whole>
      <Title>
        <Span>{props.filters?.label}</Span>
        {props.filters?.help && <Piece>{`(${props.filters?.help})`}</Piece>}
      </Title>
      <Flex>
        <Explain
          border={clsx({
            //@ts-ignore
            "1px solid #00C39C": selectedFilter[props.filters.id],
            "1px solid #f18f6b":
              //@ts-ignore
              !!value && !selectedFilter[props.filters.id],
          })}
          className={"scroll-d-none"}
          ref={inputRef}
          maxLength={2500}
          defaultValue={props.val}
          placeholder={props.placeHolder}
          onChange={(e) => {
            word(e);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        <CheckPos>
          {(fill && props.continue) || (fill && isTouched) ? (
            <AdsErrorMessage message={messageContent || props.continue} />
          ) : null}
          {approveContent !== "" ||
          (selectedFilter[parseInt(props.filters.id)] &&
            messageContent === "") ? (
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
      {approveContent === "" &&
        !(
          selectedFilter[parseInt(props.filters.id)] && messageContent === ""
        ) &&
        value && <BelowMessage message={"حداقل 10 کلمه"} />}
    </Whole>
  );
}
