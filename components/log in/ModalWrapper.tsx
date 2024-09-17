import React, {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";
import ModalAuthContent from "./ModalAuthContent";

const Modal = styled.div<LayoutProps>`
  position: fixed;
  z-index: 1032;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(45, 44, 44, 0.9);
  direction: rtl;
  font-size: 16px;
  ${layout}
`;

const ModalContent = styled.div`
  margin: auto auto;
  width: 35%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  color: #474546;
  @media (max-width: 1350px) {
    width: 45%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 960px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 575px) {
    width: 95%;
    flex-direction: column;
  }
`;

export default function ModalWrapper(props: {
  show: boolean;
  setShow: Dispatch<boolean>;
}) {
  const escape = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (event: any) => {
      // @ts-ignore
      if (escape.current)
        if (!escape.current?.contains(event.target) && props.show) {
          props.setShow(false);
        }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Modal display={props.show ? "flex" : "none"}>
      <ModalContent ref={escape}>
        <ModalAuthContent />
      </ModalContent>
    </Modal>
  );
}
