import { OperationTypes, ResumeStatuses } from "@/types";
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
  action: ResumeStatuses;
  onClickOp: (type: OperationTypes) => void;
};

const operationList: {
  [key in OperationTypes]?: ResumeStatuses[];
} = {
  edit: [ResumeStatuses.SEND, ResumeStatuses.CANCEL],
  delete: [
    ResumeStatuses.SEND,
    ResumeStatuses.SHOW,
    ResumeStatuses.CANCEL,
    ResumeStatuses.ACCEPT,
  ],
  similar: [ResumeStatuses.SEND, ResumeStatuses.SHOW, ResumeStatuses.CANCEL],
  rejectReason: [ResumeStatuses.REJECT],
  resend: [ResumeStatuses.CANCEL],
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
    alt: "ویرایش رزومه",
    text: "ویرایش رزومه",
  },
  [OperationTypes.SIMILAR]: {
    color: "#515151",
    iconSrc: "/icons/similar-operation.svg",
    alt: "مشاهده مشاغل مشابه",
    text: "مشاهده مشاغل مشابه",
  },
  [OperationTypes.REJECTREASON]: {
    color: "#DB143D",
    iconSrc: "/icons/edit pen.svg",
    alt: "علت رد شدن رزومه",
    text: "علت رد شدن رزومه",
  },
  [OperationTypes.RESEND]: {
    color: "#00FF88",
    iconSrc: "/icons/resend-operation.svg",
    alt: "ارسال مجدد رزومه",
    text: "ارسال مجدد رزومه",
  },
  [OperationTypes.DELETE]: {
    color: "#DB143D",
    iconSrc: "/icons/delete-operation.svg",
    alt: "انصراف",
    text: "انصراف درخواست",
  },
};

export default function CvDialogueOperations({ action, onClickOp }: Props) {
  const handleOperations = () => {
    let list: OperationTypes[] = [];
    Object.keys(operationList).forEach((key) => {
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
