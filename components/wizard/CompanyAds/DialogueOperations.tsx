import { AdStatuses, OperationTypes } from "@/types";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { ColorProps, color } from "styled-system";

const Item = styled.div<ColorProps>`
  display: flex;
  cursor: pointer;
  margin: 3px 0;
  & span {
    margin-right: 10px;
  }
  ${color}
`;
const Span = styled.span`
  font-size: 12px;
`;
type Props = {
  action: number;
  onClickOp: (type: OperationTypes) => void;
};
const operationList: {
  [key in OperationTypes]?: AdStatuses[];
} = {
  edit: [AdStatuses.SEND, AdStatuses.ACCEPT, AdStatuses.DELETE],
  delete: [AdStatuses.SEND, AdStatuses.ACCEPT, AdStatuses.DELETE],
  watch: [AdStatuses.ACCEPT],
  rejectReason: [AdStatuses.REJECT],
  resend: [AdStatuses.DELETE],
  archive: [
    AdStatuses.SEND,
    AdStatuses.ACCEPT,
    AdStatuses.REJECT,
    AdStatuses.DELETE,
  ],
};
const operationComponents: {
  [key in OperationTypes]?: {
    color: string;
    iconSrc: string;
    alt: string;
    text: string;
  };
} = {
  [OperationTypes.EDIT]: {
    color: "#FFB52D",
    iconSrc: "/icons/edit-operation.svg",
    alt: "ویرایش",
    text: "ویرایش آگهی",
  },
  [OperationTypes.ARCHIVE]: {
    color: "#212FFB",
    iconSrc: "/icons/archive-operation.svg",
    alt: "آرشیو",
    text: "آرشیو",
  },
  [OperationTypes.DELETE]: {
    color: "#DB143D",
    iconSrc: "/icons/delete-operation.svg",
    alt: "حذف",
    text: "حذف آگهی",
  },
  [OperationTypes.WATCH]: {
    color: "#515151",
    iconSrc: "/icons/watch-operation.svg",
    alt: "مشاهده آگهی در وبسایت",
    text: "مشاهده آگهی در وبسایت",
  },
  [OperationTypes.REJECTREASON]: {
    color: "#DB143D",
    iconSrc: "/icons/edit pen.svg",
    alt: "علت رد شدن آگهی",
    text: "علت رد شدن آگهی",
  },
  [OperationTypes.RESEND]: {
    color: "#00FF88",
    iconSrc: "/icons/resend-operation.svg",
    alt: "ارسال مجدد آگهی",
    text: "ارسال مجدد آگهی",
  },
};

export default function DialogueOperations({ action, onClickOp }: Props) {
  const handleOperations = () => {
    let list: OperationTypes[] = [];
    Object.keys(operationList).map((key) => {
      const values = operationList[key as OperationTypes]!;
      if (values.includes(action)) {
        list.push(key as OperationTypes);
      }
    });
    return list;
  };
  const renderItem = (
    type: OperationTypes,
    onClick: (t: OperationTypes) => void
  ) => {
    const operationComponent = operationComponents[type];
    if (operationComponent) {
      const { color, iconSrc, alt, text } = operationComponent;
      return (
        <Item onClick={() => onClick(type)} color={color}>
          <Image src={iconSrc} alt={alt} height={12} width={12} />
          <Span>{text}</Span>
        </Item>
      );
    } else {
      console.log("Invalid ad status");
    }
  };
  return <div>{handleOperations().map((op) => renderItem(op, onClickOp))}</div>;
}
