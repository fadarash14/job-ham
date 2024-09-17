import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ArrowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  & img {
    &:first-child {
      margin-bottom: 16px;
    }
    margin-bottom: 6px;
    cursor: pointer;
  }
`;

type ArrowButtonsProps = {
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

const ArrowButtons: React.FC<ArrowButtonsProps> = ({
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <ArrowsContainer>
      <Image
        src={"/icons/close-red.svg"}
        onClick={onRemove}
        alt="remove"
        width={20}
        height={20}
      />
      <Image
        onClick={onMoveUp}
        src={"/icons/arrow-up.svg"}
        alt=""
        width={20}
        height={20}
      />
      <Image
        onClick={onMoveDown}
        src={"/icons/arrow-down.svg"}
        alt=""
        width={20}
        height={20}
      />
    </ArrowsContainer>
  );
};

export default ArrowButtons;
