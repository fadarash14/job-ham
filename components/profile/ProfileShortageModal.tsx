import React, { Dispatch, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  display,
  flex,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
import ErrorMessage from "../log in/ErrorMessage";
import ModalSkeleton from "../utility/ModalSkeleton";
import Close from "../../public/icons/close-icon-modal.svg";
import Logo from "../../public/icons/Mask Group 48.svg";
import CloseSvgWhite from "../../public/icons/white-close-modal.svg";
import { profileUpdate } from "../../requests/sign";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { profileComplete } from "../../store/sign";
//@ts-ignore
import Cookie from "js-cookie";
import Toast from "../Toast/Toast";
import Cookies from "js-cookie";

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
const Form = styled.div`
  display: flex;
  flexflow: row wrap;
`;
const Title = styled.div`
  font-size: 16px;
  position: relative;
  display: flex;
  align-items: center;
  @media (max-width: 525px) {
    &.inputs {
      flex-flow: column wrap;
    }
  }
`;

const icon = {
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translate(0,-50%)",
};

const Hint = styled.div`
  color: #acacac;
  font-size: 12px;
  margin-top: 12px;
`;

const MobileInput = styled.input`
  background: transparent;
  border-radius: 13px;
  border: solid 1px rgba(45, 44, 44, 0.32);
  color: black;
  height: 35px;
  flex-basis: 65%;
  margin-left: 10px;
  padding-right: 20px;
  &:hover {
    border-color: #f18f6b;
  }

  &:focus {
    outline-style: none;
  }
`;
const Label = styled.span<SpaceProps>`
  font-size: 12px;
  ${space}
`;
const Content = styled.div`
  justify-content: space-between;
  margin: 10px 0;
  display: flex;
  flex-flow: column wrap;
`;
const EnterButton = styled.div`
  background: #db143d;
  padding: 7px 45px;
  color: white;
  border-radius: 13px;
  height: 35px;
  flex-basis: 20%;
  cursor: pointer;
  max-width: fit-content;
  margin-right: auto;
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
const Img = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  opacity: 0.5;
`;
const Icon = styled.div<SpaceProps>`
  ${space}
`;

export default function ProfileShortageModal(props: {
  setShortageModal: Dispatch<boolean>;
  shortage: boolean;
  setEdit: Dispatch<boolean>;
}) {
  let token = Cookies.get("token"); // => 'token'
  const Dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(false);

  const handleNameInput = (e: any) => {
    const inputValue = e.target.value;
    if (setName) {
      setName(inputValue);
    }
    setMessage("");

    if (
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF7\u200C\u200F ]$/.test(inputValue)
    ) {
      setMessage("");
    }
    return inputValue;
  };
  const handleLastNameInput = (e: any) => {
    const inputValue = e.target.value;
    if (setLastName) {
      setLastName(inputValue);
    }
    setMessage("");

    if (
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF7\u200C\u200F ]$/.test(inputValue)
    ) {
      setMessage("");
    }
    return inputValue;
  };
  const handleTelephoneInput = (e: any) => {
    const inputValue = e.target.value;
    if (setTelephone) {
      setTelephone(inputValue);
    }

    if (!/^[0-9]+$/.test(inputValue)) {
      setMessage1("تلفن شما صحیح نمی باشد");
    } else {
      setMessage1("");
    }

    return inputValue;
  };

  const handleEmailInput = (e: any) => {
    const inputValue = e.target.value;
    if (setEmail) {
      setEmail(inputValue);
    }
    setMessage2("ایمیل شما صحیح نمی باشد");

    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(inputValue)) {
      setMessage2("");
    }
    return inputValue;
  };

  function entryButton() {
    if (token && name && lastName) {
      profileUpdate({ name, lastname: lastName, telephone, email }, { token })
        .then((r) => {
          Dispatch(
            profileComplete({
              name: r.name,
              lastname: r.lastname,
              email: email,
              telephone,
            })
          );
          setToast(true);
          props.setEdit(true);
          props.setShortageModal(false);
          setMessage("");
          setMessage1("");
          setMessage2("");
        })
        .catch((err) => {
          alert("تکمیل بروفایل با خطا مواجه شد لطفا دوباره امتحان کنید");
        });
    } else setMessage("لطفا نام و نام خانوادگی خود را وارد نمایید");
  }

  return (
    <>
      <ModalSkeleton
        flex={"row"}
        show={props.shortage}
        setShow={props.setShortageModal}
      >
        <Carpet className={"mobile"} bg={"#DB143D"}>
          <Span>نیازمندی های همشهری</Span>
          <CloseSvgWhite
            onClick={() => props.setShortageModal(false)}
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
            <Title>
              <Icon ml={"5px"}>
                <Image
                  src={"/icons/profile.svg"}
                  height={30}
                  width={30}
                  alt="profile"
                />
              </Icon>
              <div>تکمیل پروفایل</div>
            </Title>
            <Hint>
              در صورت تمایل میتوانید برای دریافت خدمات بهتر و سریع تر از همشهری
              اطلاعات زیر را تکمیل کنید.
            </Hint>
          </Head>
          <Title className={"inputs"}>
            <Form>
              <div>
                <Label>نام</Label>
                <Content>
                  <MobileInput value={name} onChange={handleNameInput} />
                </Content>
              </div>
              <div>
                <Label>نام خانوادگی</Label>
                <Content>
                  <MobileInput
                    value={lastName}
                    onChange={handleLastNameInput}
                  />
                  <ErrorMessage message={message} />
                </Content>
              </div>
            </Form>
            <Form>
              <div>
                <Label>تلفن</Label>
                <Content>
                  <MobileInput
                    value={telephone}
                    onChange={handleTelephoneInput}
                  />
                  <ErrorMessage message={message1} />
                </Content>
              </div>
              <div>
                <Label>ایمیل</Label>
                <Content>
                  <MobileInput value={email} onChange={handleEmailInput} />
                  <ErrorMessage message={message2} />
                </Content>
              </div>
            </Form>
          </Title>
          <EnterButton onClick={entryButton}>ثبت</EnterButton>
        </Div>
        <Carpet className={"web"} bg={"#DB143D"}>
          <Close onClick={() => props.setShortageModal(false)} style={close} />
          <Span>نیازمندی های همشهری</Span>
          <Logo style={logo} />
        </Carpet>
      </ModalSkeleton>
      <Toast
        setIsHovering={setToast}
        isHovering={toast}
        type={"success"}
        text={"اطلاعات شما با موفقیت تغییر کرد"}
        confirm={false}
      />
    </>
  );
}
