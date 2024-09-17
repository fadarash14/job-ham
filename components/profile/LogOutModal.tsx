import React, { Dispatch } from "react";
import styled from "styled-components";
import { color, ColorProps, flexbox, FlexboxProps } from "styled-system";
import ModalSkeleton from "../utility/ModalSkeleton";
import { useAppDispatch } from "@/store/hook";
import { exitProfile } from "../../store/sign";
import { useRouter } from "next/router";
import { showLogoutModal } from "../../store/pageConfig";
import { clearCv } from "@/store/cv";
import { clearData } from "@/store/company";
import Image from "next/image";
const Content = styled.div<ColorProps>`
  font-size: 16px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  ${color}
`;
const Span = styled.div`
  color: black;
  margin: 10px 0;
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

const Yes = styled.div`
  border: 1px solid red;
  border-radius: 10px;
  color: red;
  padding: 5px 20px;
  margin-right: auto;
  cursor: pointer;
`;
export default function LogOutModal(props: {
  setLogOut: Dispatch<boolean>;
  logOut: boolean;
}) {
  const Dispatch = useAppDispatch();
  const router = useRouter();
  function exit() {
    Dispatch(clearData());
    Dispatch(exitProfile());
    Dispatch(clearCv());
    Dispatch(showLogoutModal(false));
    router.push("/");
  }

  return (
    <ModalSkeleton
      flex={"column"}
      show={props.logOut}
      setShow={props.setLogOut}
    >
      <Content>
        <Flex>
          <div>خروج</div>
          <Image
            src={"/icons/close-icon-modal.svg"}
            alt=""
            width={23}
            height={23}
            onClick={() => props.setLogOut(false)}
            style={close}
          />
        </Flex>
        <Span>برای خروج از پروفایل‌تان اطمینان دارید؟</Span>
        <Flex>
          <Yes onClick={exit}>بله</Yes>
        </Flex>
      </Content>
    </ModalSkeleton>
  );
}
