import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import FiltersModalContent from "./FiltersModalContent";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};
const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 9999;
  animation-name: ${slideIn};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const Img = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
  top: 4%;
  left: 5%;
  cursor: pointer;
`;
const FiltersModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <Img onClick={onClose}>
        <Image
          src={"icons/close-icon-modal.svg"}
          width={24}
          height={24}
          alt="close"
        />
      </Img>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FiltersModalContent onClose={onClose} />
      </ModalContent>
    </ModalWrapper>
  );
};

export default FiltersModal;
