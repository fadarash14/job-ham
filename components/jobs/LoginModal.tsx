import React, { Dispatch, useContext } from "react";
import styled from "styled-components";
import {
  alignItems,
  AlignItemsProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
} from "styled-system";
import Close from "../../public/icons/close-icon-modal.svg";
import ModalSkeleton from "../utility/ModalSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { showLoginModal, showLogoutModal } from "../../store/pageConfig";
import Image from "next/image";
import AuthContext from "../log in/AuthContext";

const Content = styled.div<ColorProps>`
  font-size: 16px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 0.5);
  ${color};
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

const Flex = styled.div<FlexboxProps | AlignItemsProps>`
  display: flex;
  ${flexbox}
  ${alignItems}
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
  padding: 5px 30px;
  cursor: pointer;
`;
export default function LoginModal(props: {
  setLogin: Dispatch<boolean>;
  login: boolean;
}) {
  const { role, setRole } = useContext(AuthContext);
  const Dispatch = useAppDispatch();
  const router = useRouter();
  function Login() {
    if (setRole) {
      setRole(2);
    }
    Dispatch(showLoginModal(false));
    router.push("/login");
  }
  return (
    <ModalSkeleton flex={"column"} show={props.login} setShow={props.setLogin}>
      <Content>
        <Flex>
          <Close onClick={() => props.setLogin(false)} style={close} />
        </Flex>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Img>
            <Image
              src={"/icons/Report error.svg"}
              width={80}
              height={80}
              alt=""
            />
          </Img>
          <Span>
            در صورت داشتن حساب کاربری ، وارد شوید. در غیر این صورت ثبت نام کنید
          </Span>
          <Flex justifyContent={"center"} flexDirection={"row"}>
            <Yes onClick={Login}>ورود / ثبت نام</Yes>
          </Flex>
        </Flex>
      </Content>
    </ModalSkeleton>
  );
}
