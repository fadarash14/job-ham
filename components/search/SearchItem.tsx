import React, { Dispatch, PropsWithChildren, useState } from "react";
import { SearchItemSingle, SearchItemType } from "../../types";
import styled from "styled-components";
import {
  flexbox,
  FlexboxProps,
  layout,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
const Pin = styled.div<any>`
  marginleft: 22px;
`;

const Content = styled.div(
  (props) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: "30px",
  }),
  layout
);

const SpanName = styled.div`
  opacity: 58%;
  font-size: 15px;
`;

const SpanCategory = styled.span`
  opacity: 58%;
  font-size: 15px;
  margin-top: 6px;
`;

const Li = styled.li<
  SpaceProps | { onClick: React.MouseEventHandler<HTMLLIElement> }
>`
   {
    display: flex;
    position: relative;
    color: #474546;
    font-size: 16px;
    padding-top: 12px;
    padding-bottom: 10px;
    margin-left: 19.5px;
    margin-right: 17px;
    align-items: center;
    cursor: pointer;
  }
  &:not(:last-of-type) {
    border-bottom: ${(props) => `1px solid ${props.theme.colors["paleGrey"]}`};
  }
  &:hover {
    color: black;
  }
  ${space}
`;

const catIDs: {
  [key: string]: {
    id: number;
    name: string;
    address: string;
    parentString: string[];
  };
} = require("../../dictionaries/withId.json");

const SearchItem = (props: SearchItemType) => {
  const [width, setWidth] = useState(false);
  const [isPinned, setPinned] = useState(false);

  function scale() {
    setWidth((width) => !width);
  }
  if (!catIDs[props.item.jobId]) {
    return <span></span>;
  }

  return (
    <Li ml={props.mobile ? "0" : ""} onClick={props.onClick}>
      <Pin
        onClick={(e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          setPinned(true);
          // props.onPin();
        }}
      >
        {props.pinned || isPinned ? (
          <Image
            onClick={(e) => {
              setPinned(false);
              props?.onDelete?.(e);
            }}
            width={18}
            height={18}
            src={"/icons/push_pin.svg"}
            alt=""
          />
        ) : (
          <Image
            width={11}
            height={18}
            src={"/icons/push_pin_mute.svg"}
            alt=""
          />
        )}
      </Pin>
      <Content>
        <SpanName>{props.item?.jobTitle}</SpanName>
        <SpanCategory>
          {catIDs[props.item.jobId]
            ? " در گروه " + catIDs[props.item.jobId]["parentString"].join(" / ")
            : ""}
        </SpanCategory>
      </Content>
      {/*<DeleteIcon  onClick={props.onDelete}/>*/}
    </Li>
  );
};

SearchItem.defaultProps = {};

export default SearchItem;
