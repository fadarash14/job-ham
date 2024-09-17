import Profile from "../../public/icons/profile.svg";
import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import {
  addNewPassword,
  changePassword,
  login,
  signUp,
  verify,
  verifyChangePassword,
} from "../../requests/sign";
import { AuthResult, SignUpResult, User } from "../../types";
import ErrorMessage from "../../components/log in/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { defaultSignIn, userRoles } from "../../store/sign";
import Image from "next/image";
import { useRouter } from "next/router";
import Toast from "../Toast/Toast";
import { rotate } from "next/dist/server/lib/squoosh/impl";
import ModalSkeleton from "../utility/ModalSkeleton";
import { CloseSvgWhite } from "../utility/Icons";
import { showLoginModal } from "../../store/pageConfig";
import Logo from "../../public/icons/Mask Group 48.svg";
import { Timer } from "../log in/Timer";
import convertDigitToEnglish from "../../utils/helper";

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
      justify-content: space-between;
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
const Code = styled.div<LayoutProps>`
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
const ReverseTimer = styled.div`
  display: flex;
  margin-right: auto;
  max-width: 200px;
`;
const Img = styled.div`
  margin: 2px 5px 0 0;
`;
const ImgHa = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  opacity: 0.5;
`;

const Alteration = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
`;

const Digit = styled.input<any>`
  background: transparent;
  border-radius: 13px;
  border: solid 1px rgba(45, 44, 44, 0.32);
  color: black;
  height: 44px;
  width: 44px;
  margin: 0 5px;
  text-align: center;
  &:hover {
    border-color: #f18f6b;
  }
  &:focus {
    outline-style: none;
  }
`;
const Content = styled.div`
  justify-content: right;
  flex-direction: row-reverse;
  margin: 10px 0;
  display: flex;
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
const TryAgain = styled.div`
  background: #d1d1d1;
  padding: 4px 14.6px 4px 14.6px;
  color: #474546;
  border-radius: 8px;
  cursor: pointer;
  width: 110.2px;
  font-size: 11px;
  text-align: center;
  opacity: 35%;
`;
const logo = {
  position: "absolute",
  right: "50%",
  top: "50%",
  transform: "translate(50%,-50%)",
};

const Close = styled.div<SpaceProps>`
  height: 24px;
  z-index: 1;
  ${space}
`;
export default function ConfirmPasswordModal(props: {
  clicked: boolean;
  setClicked: Dispatch<boolean>;
  repeatPass: string;
  newPass: string;
  toast: boolean;
  setToast: Dispatch<boolean>;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState("on");
  const [callTimer, setCallTimer] = useState(false);
  const Duration = 60 * 2;
  const Dispatch = useAppDispatch();
  const { mobile, id } = useAppSelector((state) => state.sign);
  let init = {
    code_1: "",
    code_2: "",
    code_3: "",
    code_4: "",
  };
  const [code, setCode] = useState(init);
  const first_ref = useRef<HTMLInputElement | null>(null);
  const handleInputChange = (e: any, index: number) => {
    const maxLength = e.target.maxLength;
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    const str = convertDigitToEnglish(valueInput);
    const psrseStr = parseInt(str);
    if (valueInput.length <= maxLength) {
      setCode({ ...code, [nameInput]: psrseStr });

      let next = e.target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          next.select();
          break;
        }
      }
    }
    return valueInput;
  };

  const inputOnclick = (e: any) => {
    return e.target.select();
  };

  function tryAgain() {
    setTimer("on");
    if (mobile) {
      changePassword({ mobile })
        .then((res) => {})
        .catch((err) => {
          if (err)
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
    }
  }
  useEffect(() => {
    setMessage("");
    if (timer == "on") {
      setCallTimer(true);
    } else {
      setCallTimer(false);
    }
  }, [timer]);

  let stringCode = "";
  useEffect(() => {
    stringCode =
      code.code_1.toString() +
      code.code_2.toString() +
      code.code_3.toString() +
      code.code_4.toString();

    if (stringCode.length == 4) {
      if (mobile)
        verifyChangePassword({ mobile, code: stringCode })
          .then((res: AuthResult) => {
            if (res.status) {
              addNewPassword({
                mobile,
                password: props.repeatPass,
                userId: id!,
              })
                .then((res: AuthResult) => {
                  if (res.status)
                    login({ mobile, password: props.repeatPass })
                      .then((r: User) => {
                        if (r && !r.errors) {
                          Dispatch(defaultSignIn(r));
                          setCode(init);
                          {
                            props.setToast(true);
                            props.setClicked(false);
                            router.push("/user/pw");
                          }
                          setMessage("");
                          setMessage("");
                        } else if (
                          r.errors[0].message === "bad inputs" ||
                          r.errors[0].message ===
                            "Error: Error: *** _011_auth: Process error - password is not valid"
                        ) {
                          setCode(init);
                          if (first_ref.current) {
                            first_ref.current?.focus();
                          }
                          setMessage("رمز وارد شده صحیح نمی باشد");
                        }

                        props.setToast(true);

                        props.setClicked(false);
                      })
                      .catch((err) => {
                        if (err)
                          setMessage(
                            "فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید"
                          );
                      });

                  props.setToast(true);

                  props.setClicked(false);
                })
                .catch((err) => {
                  if (err)
                    setMessage(
                      "فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید"
                    );
                });
            } else if (res.errorCode === 310) {
              setCode(init);
              if (first_ref.current) {
                first_ref.current?.focus();
              }
              setMessage("کد وارد شده صحیح نمی باشد");
            }
          })
          .catch((err: any) => {
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
          });
      setMessage("");
    }
  }, [code]);
  let bg = "#db143d";
  return (
    <ModalSkeleton flex={"row"} show={props.clicked} setShow={props.setClicked}>
      <React.Fragment>
        <Carpet className={"mobile"} bg={bg}>
          <Span>نیازمندی های همشهری</Span>
          <Close onClick={() => props.setClicked(false)}>
            <Image
              height={24}
              width={24}
              src={"/icons/white-close-modal.svg"}
              alt=""
            />
          </Close>
          {/*<CloseSvgWhite onClick={()=>props.setClicked(false)} style={close}/>*/}
          <ImgHa>
            <Image
              height={80}
              width={80}
              src={"/icons/white-he-profile.svg"}
              alt=""
            />
          </ImgHa>
        </Carpet>
        <Code>
          <Head>
            <Title>
              <div>
                <Profile style={icon} />
                کد تایید
              </div>
              <ReverseTimer>
                <Img>
                  <Image
                    height={15}
                    width={15}
                    src={"/icons/Iconly-Curved-Time Square.svg"}
                    alt=""
                  />
                </Img>
                <div style={{ width: "30px" }}>
                  <Timer
                    Duration={Duration}
                    timer={timer}
                    setTimer={setTimer}
                    callTimer={callTimer}
                  />
                </div>
              </ReverseTimer>
            </Title>
            <Hint>برای تایید شماره خود، لطفا کد ارسال شده را وارد کنید.</Hint>
          </Head>
          <div>
            <Content>
              <Digit
                type={"tel"}
                ref={first_ref}
                autoFocus
                name={"code_1"}
                onChange={handleInputChange}
                value={code.code_1}
                maxLength={1}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"code_2"}
                onChange={handleInputChange}
                value={code.code_2}
                maxLength={1}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"code_3"}
                onChange={handleInputChange}
                value={code.code_3}
                maxLength={1}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"code_4"}
                onChange={handleInputChange}
                value={code.code_4}
                maxLength={1}
                onClick={inputOnclick}
              />
            </Content>
            <ErrorMessage message={message} />
          </div>
          {timer == "on" ? (
            <TryAgain>ارسال مجدد</TryAgain>
          ) : (
            <TryAgain style={{ opacity: "100%" }} onClick={tryAgain}>
              ارسال مجدد
            </TryAgain>
          )}
        </Code>
        <Carpet className={"web"} bg={bg}>
          <Close mr={"auto"} onClick={() => props.setClicked(false)}>
            <Image
              height={24}
              width={24}
              src={"/icons/white-close-modal.svg"}
              alt=""
            />
          </Close>
          <Span>نیازمندی های همشهری</Span>
          <Logo style={logo} />
        </Carpet>
      </React.Fragment>
    </ModalSkeleton>
  );
}
