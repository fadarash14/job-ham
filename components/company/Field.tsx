import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
  color: #acacac;
  margin-left: 5px;
  font-size: 14px;
`;
const Span = styled.span`
  color: #acacac;
`;
const Div = styled.div`
  & img {
    margin: 0px 4px;
  }
`;

export default function Field({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <Div>
      <Image
        src={"/icons/Iconly-Curved-Arrow - Left 3.svg"}
        alt="arrow"
        width={8}
        height={8}
      />
      <Label>
        {label} :<Span>{content}</Span>
      </Label>
    </Div>
  );
}
