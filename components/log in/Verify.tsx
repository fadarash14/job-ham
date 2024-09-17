import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  fontSize,
  FontSizeProps,
  FontWeightProps,
  fontWeight,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  ColorProps,
  color,
} from "styled-system";
import {
  changePassword,
  login,
  signUp,
  verify,
  verifyChangePassword,
} from "../../requests/sign";
import { AuthResult, SignUpResult, User } from "../../types";
import ErrorMessage from "./ErrorMessage";
import { useAppDispatch } from "@/store/hook";
import { defaultSignIn, userRoles } from "../../store/sign";
import Image from "next/image";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import Toast from "../Toast/Toast";
import { showLoginModal } from "../../store/pageConfig";
import { Timer } from "./Timer";
import Cookies from "js-cookie";
import convertDigitToEnglish from "../../utils/helper";
import Container from "../utility/Container";
import { getCV } from "@/requests/cv";
import { setMyCv } from "@/store/cv";
import { getCompany } from "@/requests/profile/company";
import { getCompanyInfo, setCompanyInfo } from "@/store/company";
import { setSentCVIds } from "@/store/cvList";
import { getSentSvIds } from "@/requests/profile/sentCvList";

const Box = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1;
`;

// const Code = styled.div<LayoutProps>`
//   /* padding: 30px; */
//   background: inherit;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   flex: 1 1 84%;
//   height: 80%;
//   ${layout}
// `;
const Head = styled.div`
  width: 60%;
  margin-bottom: 15px;
  @media (max-width: 960px) {
    width: 80%;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ReverseTimer = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  max-width: 200px;
  align-items: center;
`;
const Img = styled.div`
  margin: 2px 5px 0 0;
`;

const Alteration = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
  cursor: pointer;
  ${space}
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
  &::-webkit-inner-spin-button {
    display: none;
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
  margin-top: 18px;
  max-width: 200px;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;
const Return = styled.div`
  position: relative;
  right: 15%;
  cursor: pointer;
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

const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;

  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;

export default function Verify() {
  let token = Cookies.get("token"); // => 'token'
  const Dispatch = useAppDispatch();
  const router = useRouter();
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState("on");
  const [callTimer, setCallTimer] = useState(false);
  const Duration = 60 * 2;
  const {
    setStep: setRoute,
    setId,
    mobile,
    hasAccount,
    redirectFrom,
    setRedirectFrom,
    step,
    role,
  } = useContext(AuthContext);
  let roleName = role === 2 ? "کارجو" : "کارفرما";
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
    if (valueInput.length <= maxLength) {
      const str = convertDigitToEnglish(String(valueInput));
      const psrseStr = parseInt(str);
      if (valueInput === "") {
        setCode({ ...code, [nameInput]: "" });
      } else {
        setCode({ ...code, [nameInput]: psrseStr });
      }
      let next = e.target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (valueInput === "") break;
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
      if (redirectFrom === "login") {
        if (role)
          signUp({ mobile, role })
            .then((res: SignUpResult) => {})
            .catch((err: any) => {
              if (err)
                setMessage(
                  "فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید"
                );
            });
      } else {
        changePassword({ mobile })
          .then((res) => {})
          .catch((err) => {
            console.log(err, "test error token");
            if (err)
              setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
          });
      }
    }
  }

  useEffect(() => {
    return () => {
      if (setRedirectFrom) {
        if (step != null) {
          setRedirectFrom(step);
        }
      }
    };
  }, [setRedirectFrom, step]);

  useEffect(() => {
    setMessage("");
    if (timer == "on") {
      setCallTimer(true);
    } else {
      setCallTimer(false);
    }
  }, [timer]);

  const dispatch = useAppDispatch();

  let stringCode = "";
  useEffect(() => {
    stringCode =
      code.code_1.toString() +
      code.code_2.toString() +
      code.code_3.toString() +
      code.code_4.toString();

    if (stringCode.length == 4) {
      if (redirectFrom === "loginWithPassword") {
        if (mobile)
          verifyChangePassword({ mobile, code: stringCode })
            .then((res: AuthResult) => {
              if (res.status) {
                if (setRoute) {
                  setRoute("forgot");
                }
              } else if (res.errorCode === 310) {
                setCode(init);
                if (first_ref.current) {
                  first_ref.current?.focus();
                }
                setMessage("کد وارد شده صحیح نمی باشد");
              }
            })
            .catch((err: any) => {
              setCode(init);
              if (first_ref.current) {
                first_ref.current?.focus();
              }
              setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
            });
        setMessage("");
      } else {
        if (mobile) {
          verify({ mobile, code: stringCode })
            .then((res: User) => {
              if (res.id) {
                if (setId) {
                  setId(String(res.id));
                }
                let hasMultipleCompany = false;
                Dispatch(defaultSignIn(res));
                Dispatch(userRoles(res.roles));
                if (role) {
                  dispatch(userRoles(role.toString()));
                }
                if (role == 2) {
                  getCV(res.token).then((result) => {
                    if (result.data !== null) {
                      getSentSvIds(
                        { skip: 0, limit: 100, sort: "Desc" },
                        { token: res.token }
                      ).then((result) => {
                        if (result.data !== null) {
                          dispatch(setSentCVIds(result.data?.rows));
                        }
                      });
                      dispatch(setMyCv(result.data));
                    }
                  });
                } else if (role == 1) {
                  getCompany(res.token).then((res) => {
                    if (!res.errorCode && res.data.length > 0) {
                      if (res.data.length > 1) {
                        hasMultipleCompany = true;
                      }
                      if (res.data.length === 1) {
                        Cookies.set("cid", String(res.data[0].id), { expires: 1, path: "/" });
                      }

                      dispatch(getCompanyInfo(true));
                      dispatch(setCompanyInfo(res.data));
                    } else {
                      dispatch(getCompanyInfo(false));
                      dispatch(setCompanyInfo([]));
                    }
                  });
                }
                Dispatch(defaultSignIn(res));
                Dispatch(userRoles(res.roles));
                if (role) {
                  dispatch(userRoles(role.toString()));
                }
                if (setRoute) {
                  if (hasMultipleCompany) {
                    router.push("/login/verifyCompany");
                  } else {
                    router.push("/");
                  }

                  setToast(true);
                  dispatch(showLoginModal(false));
                }
              } else if (res.errorCode === 310 || res.errorCode === 311) {
                setCode(init);
                if (first_ref.current) {
                  first_ref.current?.focus();
                }
                setMessage("کد وارد شده صحیح نمی باشد");
              }
            })
            .catch((err: any) => {
              setCode(init);
              if (first_ref.current) {
                first_ref.current?.focus();
              }
              setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
            });
          setMessage("");
        }
      }
    }
  }, [code]);

  return (
    <Box>
      {/* <Code> */}
      <Head>
        <Title>
          <Span fontSize={20} fontWeight={600}>
            ثبت نام {roleName}
          </Span>
          <Return onClick={() => (setRoute ? setRoute("login") : "")}>
            <Img>
              <Image
                height={20}
                width={20}
                src={"/icons/arrow-left.svg"}
                alt={"arrow"}
              />
            </Img>
          </Return>
        </Title>
        <Hint>کد تایید پیامک شده را وارد نمایید</Hint>
      </Head>
      <div>
        <Content>
          <Digit
            type={"number"}
            ref={first_ref}
            autoFocus
            name={"code_1"}
            onChange={handleInputChange}
            value={code.code_1}
            maxLength={1}
            onClick={inputOnclick}
          />
          <Digit
            type={"number"}
            name={"code_2"}
            onChange={handleInputChange}
            value={code.code_2}
            maxLength={1}
            onClick={inputOnclick}
          />
          <Digit
            type={"number"}
            name={"code_3"}
            onChange={handleInputChange}
            value={code.code_3}
            maxLength={1}
            onClick={inputOnclick}
          />
          <Digit
            type={"number"}
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
      <Alteration
        mt={"5px"}
        onClick={() => (setRoute ? setRoute("login") : "")}
      >
        تغییر شماره موبایل
        <Back style={{ margin: "2px 5px 0 0" }} />
      </Alteration>
      <Container
        // display={["flex", "none"]}
        marginTop={"15px"}
        maxWidth={"100px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <ReverseTimer>
          <Img>
            <Image
              height={15}
              width={15}
              src={"/icons/Iconly-Curved-Time Square.svg"}
              alt={"timer"}
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
      </Container>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={"ورود با موفقیت انجام شد"}
          confirm={false}
        />
      )}
      {/* </Code> */}
    </Box>
  );
}
