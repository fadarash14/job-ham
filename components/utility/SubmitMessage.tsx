import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import React, { Dispatch, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutProps } from "styled-system";

type Props = {
  message: string;
  status: "success" | "fail" | "pending" | "";
  setShow: Dispatch<boolean>;
};

const Modal = styled.div<LayoutProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(45 44 44 / 71%);
  z-index: 10200;
`;
const ModalContent = styled.div`
  background: #e8e8ec;
  width: 500px;
  height: 200px;
  border-radius: 15px;
  z-index: 10300;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Message = styled.p``;

export default function SubmitMessage({ message, status, setShow }: Props) {
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setShow(false);
  });
  return (
    <>
      {status !== "" && (
        <Modal>
          <ModalContent ref={ref}>
            {status === "pending" ? (
              <Image
                src={"/icons/loading_j.gif"}
                height={20}
                width={20}
                alt=""
              />
            ) : status === "success" ? (
              <>
                <Image
                  src={"/icons/successTick.svg"}
                  height={40}
                  width={40}
                  alt=""
                />
                <Message>{message}</Message>
              </>
            ) : (
              <>
                <Image src={"/icons/error.svg"} height={40} width={40} alt="" />
                <Message>
                  {message !== ""
                    ? message
                    : "مشکلی رخ داده است. دوباره تلاش کنید!"}
                </Message>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
