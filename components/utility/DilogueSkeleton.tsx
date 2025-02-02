import React, {
  Dispatch,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  FlexDirectionProps,
  layout,
  LayoutProps,
} from "styled-system";
// @ts-ignore
import { fadeOut, zoomIn } from "react-animations";
import { CSSTransition } from "react-transition-group";

const fadeInDownAnimation = keyframes`${zoomIn}`;
const fadeOutAnimation = keyframes`${fadeOut}`;

const Modal = styled.div<LayoutProps | FlexboxProps>`
  position: absolute;
  z-index: 1031;
  cursor: auto; 
  //   left: 0;
  //   top: 0;
  //   height: 100vh;
  //   background-color: rgba(45, 44, 44, 0.9);
  width: 100%;
  direction: rtl;
  font-size: 16px;
  display: flex;
  min-height: 200px;
margin-left: 150px;
  //   overflow: auto;
  ${layout}
`;

const ModalContent = styled.div<
  FlexboxProps | LayoutProps | ColorProps | BorderProps
>`
  margin: auto auto;
  width: 100%;
  max-width: 320px;
  height: 100%;
  max-height: 190px;
  border-radius: 20px;
  color: #474546;
  background: white;
  opacity: 0.9;
  position: relative;
  animation: 0.2s ${fadeInDownAnimation};
  ${border}
  ${flexbox}
    ${layout}
    ${color}
      display:flex;
  .show {
    display: block;
  }
  .hide {
    display: none;
    animation: 1s ${fadeOutAnimation};
  }
  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
  }
`;

export default function DilogueSkeleton(
  props: PropsWithChildren<{
    height: any;
    flex: any;
    width: boolean;
    back: string;
    overflow: boolean;
    show: boolean;
    setShow: Dispatch<boolean>;
  }>
) {
  const escape = useRef(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.setShow(false);
    }
  }, []);
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (escape.current && !(escape.current as any).contains(e.target)) {
        // props.setShow?.(false) // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [escape.current]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);

    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, [clickListener]);

  return (
    <CSSTransition
      in={props.show}
      timeout={100}
      classNames="fade"
      unmountOnExit
    >
      <Modal onClick={() => props.setShow(false)}>
        <ModalContent
          width={props.width ? "" : "40%"}
          borderRadius={"20px"}
          maxHeight={props.height}
          style={{ overflow: props.overflow ? "" : "hidden" }}
          bg={props.back}
          onClick={(e) => {
            e.stopPropagation();
          }}
          ref={escape}
          flexDirection={props.flex}
        >
          {props.children}
        </ModalContent>
      </Modal>
    </CSSTransition>
  );
}

DilogueSkeleton.defaultProps = {
  back: "#E8E8EC",
  overflow: false,
  height: "auto",
  width: false,
};
