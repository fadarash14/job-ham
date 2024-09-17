import * as React from "react";
import Box from "@/components/utility/Box";
import styled from "styled-components";
import {
  color,
  ColorProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from "styled-system";
import SideBar from "@/components/profile/SideBar";
import Footer from "@/components/footer/Footer";
import Container from "@/components/utility/Container";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import ErrorMessage from "@/components/log in/ErrorMessage";
import { changePassword } from "@/requests/sign";
import { useAppSelector } from "@/store/hook";
import Toast from "@/components/Toast/Toast";
import { useRouter } from "next/router";
import ConfirmPasswordModal from "@/components/profile/ConfirmPasswordModal";
import ProfileTopBar from "@/components/profile/ProfileTopBar";
import convertDigitToEnglish from "@/utils/helper";

interface Props {
  posts: [object];
  perPage: number;
  page: number;
  count: number;
}

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);
const Main = styled.main<SpaceProps>`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background-color: RGB(255, 255, 255);
  flex: 1 1 100%;
  ${space}
`;

const Input = styled.input`
  background: transparent;
  border-radius: 10px;
  outline: none;
  height: 30px;
  /* max-width: 300px;
  width: 100%; */
  min-width: 100%;
  border: 1px solid black;
  padding: 0 10px;
  direction: ltr;
  text-align: left;
`;

const Approve = styled.div`
  color: white;
  background: rgb(136, 134, 236);
  padding: 5px 25px;
  border-radius: 10px;
  margin-top: 40px;
  /* width: fit-content; */
  cursor: pointer;
  min-width: 100%;
  text-align: center;
  &.disabled {
    background: rgba(136, 134, 236, 0.5);
    cursor: default;
  }
`;

const Title = styled.div<ColorProps | TextAlignProps>`
  color: black;
  font-size: 12px;
  margin-top: 20px;
  min-width: 100%;
  ${textAlign}
  ${color}
`;

const Eye = styled.div`
  position: absolute;
  height: 16px;
  right: 5px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const LoginContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: max(300px, 30%);
  margin: 0 auto;
  text-align: center;
  @media only screen and (min-width: 768px) {
    /* margin: 0; */
    text-align: start;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export default function Pw() {
  const [eye, setEye] = useState(false);
  const [message, setMessage] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [clicked, setClicked] = useState(false);
  const [toast, setToast] = useState(false);

  let token = Cookies.get("token");
  const router = useRouter();
  const { id, mobile } = useAppSelector((state) => state.sign);
  const handleNewPass = (e: any) => {
    setMessage("");
    const inputValue = e.target.value;
    const str = convertDigitToEnglish(String(inputValue));
    setNewPass(str);
    if (repeatPass != newPass && repeatPass) {
      setMessage("رمزهای وارد شده یکسان نیست!");
    }
  };
  const handleRepeatPass = (e: any) => {
    setMessage("");
    const inputValue = e.target.value;
    const str = convertDigitToEnglish(String(inputValue));
    setRepeatPass(str);
  };

  const validate = () => {
    if (!newPass || !repeatPass) return;
    if (newPass.length < 6) {
      setMessage("رمز عبور،حداقل باید 6 رقم باشد");
      return false;
    }
    if (repeatPass != newPass) {
      setMessage("رمزهای وارد شده یکسان نیست!");
      return false;
    }
    return true;
  };

  const entry = () => {
    setMessage("");
    let valid = validate();
    if (valid && mobile) {
      changePassword({ mobile })
        .then((res) => {
          setClicked(true);
        })
        .catch((err) => {
          if (err)
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
    }
  };

  const activePath = router.pathname;

  return (
    <BoxLayout
      p={["0"]}
      bg={"white"}
      minHeight={"100vh"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <ProfileTopBar
        icon={"/icons/password-profile-side.svg"}
        title={"رمز عبور"}
      />
      <Container className={"containerPro"} flex={"1 1 100%"}>
        <Main pt={["0", "20px"]}>
          <SideBar activePath={activePath} token={token} />
          <LoginContent>
            <Title color={"#ACACAC"}>
              لطفا رمز جدید خود را وارد کنید و سپس آن را تکرار فرمایید.
            </Title>

            <Title textAlign={"right"}>رمز جدید</Title>
            <div style={{ position: "relative", minWidth: "100%" }}>
              <Input
                autoFocus
                id={"myInput"}
                type={eye ? "text" : "password"}
                value={newPass}
                onChange={handleNewPass}
                onBlur={validate}
              />
              <Eye onClick={() => setEye(!eye)}>
                <Image src={"/icons/eye.svg"} height={16} width={16} alt="" />
              </Eye>
            </div>

            <Title textAlign={"right"}>تکرار رمز</Title>
            <div style={{ position: "relative", minWidth: "100%" }}>
              <Input
                id={"myInput"}
                type={eye ? "text" : "password"}
                value={repeatPass}
                onChange={handleRepeatPass}
                onBlur={validate}
              />
              <Eye onClick={() => setEye(!eye)}>
                <Image src={"/icons/eye.svg"} height={16} width={16} alt="" />
              </Eye>
            </div>

            <ErrorMessage message={message} />
            <Approve
              onClick={entry}
              className={
                newPass === repeatPass && newPass.length >= 6 ? "" : "disabled"
              }
            >
              تایید
            </Approve>
            <ConfirmPasswordModal
              clicked={clicked}
              setClicked={setClicked}
              repeatPass={repeatPass}
              newPass={newPass}
              toast={toast}
              setToast={setToast}
            />
          </LoginContent>
        </Main>
      </Container>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={"رمز شما با موفقیت تغییر کرد"}
          confirm={false}
        />
      )}
      <Footer />
    </BoxLayout>
  );
}
