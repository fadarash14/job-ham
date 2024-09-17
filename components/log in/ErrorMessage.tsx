import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { SpaceProps, space } from "styled-system";

const fadeIn = keyframes`
 0% { opacity: 0;transform:translateX(0)}
 30% { opacity: 1;transform:translateX(-2px)}
 60% { opacity: 1;transform:translateX(2px)}
 100% { opacity: 1;transform:translateX(0)}
`;

const Message = styled.p`
  font-size: 12px;
  color: #f18f6b;
  font-weight: 500;
  margin: 0px;
  display: flex;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
`;
const Img = styled.div<SpaceProps>`
  margin: 2px 5px 0 0;
  ${space}
`;

interface IProps {
  message?: string;
}

const ErrorMessage = ({ message = "" }: IProps) => {
  return (
    <Message>
      {message !== "" && (
        <Img ml={"5px"}>
          <Image
            height={15}
            width={15}
            src={"/icons/Iconly-Curved-Danger Triangle.svg"}
            alt="danger icon"
          />
        </Img>
      )}
      {message}
    </Message>
  );
};
export default ErrorMessage;
