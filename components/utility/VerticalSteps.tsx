import React, { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

type StepProps = PropsWithChildren<{
  children: ReactNode;
  label: string;
}>;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid black;
  position: relative;
`;

const Label = styled.div`
  display: flex;
  margin-left: 20px;
  position: relative;
  bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 80px;
`;
const StepWrapper = styled.div`
  display: flex;
`;
const ChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  max-width: 320px;
  margin-bottom: 50px;
  word-wrap: break-word; /* Break the text into multiple lines if needed */
  overflow-wrap: break-word; /* Handle overflow within words */
`;
const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;
  top: -4px;
  right: -8px;
  background-color: black;
`;

export const Step: React.FC<StepProps> = ({ children, label }) => {
  return (
    <StepWrapper>
      <Label>{label}</Label>
      <Border />
      <Circle />
      <ChildWrapper>{children}</ChildWrapper>
    </StepWrapper>
  );
};
