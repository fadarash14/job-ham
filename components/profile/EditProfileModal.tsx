import React, { Dispatch, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
import ErrorMessage from "../log in/ErrorMessage";
import ModalSkeleton from "../utility/ModalSkeleton";
import Close from "../../public/icons/white-close-modal.svg";
import Logo from "../../public/icons/Mask Group 48.svg";
import CloseSvgWhite from "../../public/icons/white-close-modal.svg";
import { useAppDispatch, useAppSelector } from "@/store/hook";
// import SupportModal from "../wizard/SupportModal";
import { showSupportModal } from "../../store/pageConfig";

const Carpet = styled.div<ColorProps>`
  font-size: 12px;
  padding: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 119px;
  &.mobile {
    display: none;
  }
  @media (max-width: 525px) {
    &.web {
      display: none;
    }
    &.mobile {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
  }
  ${color}
`;
const Span = styled.div`
  margin-top: auto;
  border-right: 1px solid white;
  color: white;
  padding-right: 5px;
`;
const Head = styled.div``;
const Name = styled.div<SpaceProps>`
  ${space}
`;
const Title = styled.div<FlexboxProps>`
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    &.mobile {
      flex-direction: column;
    }
  }
  ${flexbox}
`;

const icon = {
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translate(0,-50%)",
};

const Hint = styled.div`
  color: #8886ec;
  font-size: 12px;
  margin-top: 12px;
  text-align: justify;
  margin-left: 5px;
`;

const EnterButton = styled.div`
  background: #8886ec;
  padding: 7px 20px;
  color: white;
  border-radius: 13px;
  height: 35px;
  cursor: pointer;
  max-width: fit-content;
  min-width: fit-content;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const logo = {
  position: "absolute",
  right: "50%",
  top: "50%",
  transform: "translate(50%,-50%)",
};

const close = {
  marginRight: "auto",
  cursor: "pointer",
  zIndex: "2",
};

const Div = styled.div`
  background: white;
  flex: 1 1 100%;
  padding: 30px;
`;
const Content = styled.div`
  background: #e8e8ec;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin: 10px 0;
`;

const Img = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  opacity: 0.5;
`;
export default function EditProfileModal(props: {
  setEditModal: Dispatch<boolean>;
  editModal: boolean;
}) {
  const [support, setSupport] = useState(false);
  // @ts-ignore
  const { name, lastname } = useAppSelector((state) => state.sign);
  const dispatch = useAppDispatch();

  return (
    <ModalSkeleton
      flex={"row"}
      show={props.editModal}
      setShow={props.setEditModal}
    >
      <Carpet className={"mobile"} bg={"#8886EC"}>
        <Span>نیازمندی های همشهری</Span>
        <CloseSvgWhite
          onClick={() => props.setEditModal(false)}
          style={close}
        />
        <Img>
          <Image
            height={80}
            width={80}
            src={"/icons/white-he-profile.svg"}
            alt=""
          />
        </Img>
      </Carpet>
      <Div>
        <Head>
          <div>ویرایش اطلاعات</div>
        </Head>
        <Content>
          <Title>
            <div>
              <Image src={"/icons/profile.svg"} height={30} width={30} alt="" />
            </div>
            <Name mr={"5px"}>{`${name} ${lastname}`}</Name>
          </Title>
        </Content>
        <Title className={"mobile"}>
          <Hint>
            برای ویرایش دوباره اطلاعات خود لطفا با پشتیبانی تماس بگیرید.
          </Hint>
          <EnterButton
            onClick={() => {
              dispatch(showSupportModal(true));
              props.setEditModal(false);
            }}
          >
            <Name ml={"5px"}>پشتیبانی</Name>
            <Image
              src={"/icons/support-modal.svg"}
              height={26}
              width={26}
              alt=""
            />
          </EnterButton>
        </Title>
      </Div>
      <Carpet className={"web"} bg={"#8886EC"}>
        <Close onClick={() => props.setEditModal(false)} style={close} />
        <Span>نیازمندی های همشهری</Span>
        <Logo style={logo} />
      </Carpet>
    </ModalSkeleton>
  );
}
