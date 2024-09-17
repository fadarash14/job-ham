import React, { Dispatch } from "react";
import styled from "styled-components";
import { color, ColorProps, flexbox, FlexboxProps } from "styled-system";
import Close from "../../public/icons/close-icon-modal.svg";
import ModalSkeleton from "../utility/ModalSkeleton";
import { useRouter } from "next/router";
import { showLoginModal } from "../../store/pageConfig";
import Image from "next/image";
import { useAppDispatch } from "@/store/hook";

const Content = styled.div<ColorProps>`
  font-size: 16px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  //   width: 370px;
  ${color}
`;
const Span = styled.div`
  color: black;
  margin: 20px 0;
`;

const close = {
  marginRight: "auto",
  cursor: "pointer",
  zIndex: "2",
};

const Flex = styled.div<FlexboxProps>`
  display: flex;
  ${flexbox}
`;
const Img = styled.div<FlexboxProps>`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  ${flexbox};
`;

const Yes = styled.div`
  border: 1px solid red;
  border-radius: 10px;
  color: white;
  background: red;
  font-size: 14px;
  //   width: 100px;
  padding: 5px 30px;
  cursor: pointer;
`;
export default function SuccessfullModal(props: {
  setLogin: Dispatch<boolean>;
  login: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  function Login() {
    dispatch(showLoginModal(false));
    router.push("/login");
  }
  return (
    <ModalSkeleton flex={"column"} show={props.login} setShow={props.setLogin}>
      <Content>
        <Flex>
          <Close onClick={() => props.setLogin(false)} style={close} />
        </Flex>
        <Img>
          <Image
            src={"/icons/Report error.svg"}
            width={80}
            height={80}
            alt=""
          />
        </Img>
        <Span>رزومه شما با موفقیت ارسال شد</Span>
      </Content>
    </ModalSkeleton>
  );
}
