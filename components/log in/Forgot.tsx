import Profile from "../../public/icons/profile.svg";
import Clock from "../../public/icons/Iconly-Curved-Time Square.svg";
import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import PassLogin from "../../public/icons/PassLogin.svg";
import { match } from "assert";
import ErrorMessage from "./ErrorMessage";
import { loadState } from "../../store";
import { addNewPassword, login } from "../../requests/sign";
import { string } from "prop-types";
import { AuthResult, User } from "../../types";
import AuthContext from "./AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import Toast from "../Toast/Toast";
import { defaultSignIn, userRoles } from "../../store/sign";
import { useRouter } from "next/router";
import { showLoginModal } from "../../store/pageConfig";
import convertDigitToEnglish from "../../utils/helper";

const OnetimeUse = styled.div<LayoutProps>`
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 84%;
  ${layout}
`;
const Head = styled.div``;

const Title = styled.div`
  font-size: 16px;
  padding-right: 40px;
  position: relative;
  display: flex;
`;
const CountDown = styled.div`
  display: flex;
  margin-right: auto;
`;

const ChangeNumber = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
`;
const Register = styled.div<LayoutProps>`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1;
  ${layout}
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
  text-align: justify;
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
  direction: ltr;
  text-align: right;
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
`;
const EnterButton = styled.div`
  background: #8886ec;
  padding: 7px 45px;
  color: white;
  border-radius: 13px;
  height: 35px;
  flex-basis: 20%;
  cursor: pointer;
`;
const Eye = styled.div`
  position: absolute;
  height: 16px;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;
export default function Forgot(props: PropsWithChildren<any>) {
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [newPass, setNewPass] = useState("");
  const [toast, setToast] = useState(false);
  const [repeatPass, setRepeatPass] = useState("");
  const {
    setStep: setRoute,
    redirectFrom,
    step,
    setRedirectFrom,
    mobile,
    id,
    hasAccount,
  } = useContext(AuthContext);
  const Dispatch = useAppDispatch();
  const router = useRouter();

  const handleOnFocus = (e: any) => {
    let input = e.target.value;
    e.selectionEnd = input.length;
  };

  useEffect(() => {
    return () => {
      if (setRedirectFrom) {
        if (step != null) {
          setRedirectFrom(step);
        }
      }
    };
  }, [setRedirectFrom, step]);

  const handleNewPass = (e: any) => {
    const inputValue = e.target.value;
    const str = convertDigitToEnglish(String(inputValue));
    setNewPass(str);
  };
  const handleRepeatPass = (e: any) => {
    const inputValue = e.target.value;
    const str = convertDigitToEnglish(String(inputValue));
    setRepeatPass(str);
  };
  const dispatch = useAppDispatch();

  const lengthValidation = () => {
    if (newPass.length >= 6) return true;
    else return false;
  };
  const equalValidation = () => {
    if (repeatPass == newPass) return true;
    else return false;
  };

  const entry = () => {
    if (lengthValidation()) {
      setMessage("");
      if (equalValidation()) {
        setMessage1("");
        if (mobile && id && newPass.length >= 6 && repeatPass == newPass)
          addNewPassword({ mobile, password: repeatPass, userId: parseInt(id) })
            .then((res: AuthResult) => {
              if (res.status)
                if (hasAccount) {
                  if (setRoute) {
                    if (mobile) {
                      login({ mobile, password: repeatPass })
                        .then((r: User) => {
                          if (r && !r.errors) {
                            setMessage("رمز وارد شده صحیح نمی باشد");
                            Dispatch(defaultSignIn(r));
                            Dispatch(userRoles(r.roles));
                            {
                              setToast(true);
                              dispatch(showLoginModal(false));
                              router.push("/user/profile/mywizard");
                            }
                            setMessage("");
                            setMessage1("");
                          } else if (
                            r.errors[0].message === "bad inputs" ||
                            r.errors[0].message ===
                              "Error: Error: *** _011_auth: Process error - password is not valid"
                          ) {
                            setMessage("رمز وارد شده صحیح نمی باشد");
                          }
                          setToast(true);
                        })
                        .catch((err) => {
                          if (err)
                            setMessage(
                              "فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید"
                            );
                        });
                    }
                  }
                } else setToast(true);
            })
            .catch((err) => {
              if (err)
                setMessage(
                  "فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید"
                );
            });
      } else {
        setMessage1("رمزهای وارد شده یکسان نیست!");
      }
    } else {
      setMessage("رمز عبور،حداقل باید 6 رقم باشد");
    }
  };

  return (
    <Register>
      <Head>
        <Title>
          {redirectFrom == "Password" ? (
            <div>
              <PassLogin style={icon} />
              تغییر رمز عبور
            </div>
          ) : (
            <div>
              <PassLogin style={icon} />
              رمز عبور
            </div>
          )}
          <div>
            <PassLogin style={icon} />
          </div>
        </Title>
        <Hint>لطفا رمز جدید خود را وارد کرده و سپس آن را تکرار فرمایید.</Hint>
      </Head>
      <div>
        <Label>رمز جدید</Label>
        <Content>
          <div style={{ position: "relative" }}>
            <MobileInput
              autoFocus
              onFocus={handleOnFocus}
              type={eye ? "text" : "password"}
              value={newPass}
              onChange={handleNewPass}
            ></MobileInput>
            <Eye onClick={() => setEye(!eye)}>
              <Image
                src={"/icons/eye.svg"}
                height={16}
                width={16}
                alt={"hide"}
              />
            </Eye>
          </div>
        </Content>
        <Label mt={"10px"}>تکرار رمز جدید</Label>
        <Content>
          <div style={{ position: "relative" }}>
            <MobileInput
              autoFocus
              onFocus={handleOnFocus}
              type={eye2 ? "text" : "password"}
              value={repeatPass}
              onChange={handleRepeatPass}
            ></MobileInput>
            <Eye onClick={() => setEye2(!eye2)}>
              <Image
                src={"/icons/eye.svg"}
                height={16}
                width={16}
                alt={"hide"}
              />
            </Eye>
          </div>

          <EnterButton onClick={entry}>ادامه</EnterButton>
        </Content>
        <ErrorMessage message={message} />
        <ErrorMessage message={message1} />
      </div>
      {/*{(step == 'forgot') && <ChangeNumber mb={'10px'} onClick={() => setRoute ? setRoute('loginWithPassword') :''}>*/}
      {/*    ورود با رمزعبور*/}
      {/*    <Back style={{margin: "2px 5px 0 0", cursor: "pointer"}} />*/}
      {/*</ChangeNumber>}*/}
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={"رمز شما با موفقیت تغییر کرد"}
          confirm={false}
        />
      )}
    </Register>
  );
}
