import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import {
  fontSize,
  FontSizeProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import PassLogin from "../../public/icons/PassLogin.svg";
import { changePassword, disposablePassword, login } from "../../requests/sign";
import { AuthResult, ChangePassResult, User } from "../../types";
import { defaultSignIn, userRoles } from "../../store/sign";
import { useAppDispatch } from "@/store/hook";
import ErrorMessage from "./ErrorMessage";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import Toast from "../Toast/Toast";
import Image from "next/image";
import { showLoginModal } from "../../store/pageConfig";
import { getCV } from "@/requests/cv";
import { setMyCv } from "@/store/cv";
import { getCompany } from "@/requests/profile/company";
import { getCompanyInfo, setCompanyInfo } from "@/store/company";
import { getSentSvIds } from "@/requests/profile/sentCvList";
import { setSentCVIds } from "@/store/cvList";
import Cookies from "js-cookie";

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
  // padding-right: 40px;
  width: 300px;
  position: relative;
  display: flex;
`;
const CountDown = styled.div`
  display: flex;
  margin-right: auto;
`;

const ChangeMobile = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
  cursor: pointer;
`;
const Register = styled.div<LayoutProps>`
  margin-top: 30px;
  // background: white;
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
  margin-bottom: 12px;
  text-align: center;
`;

const PasswordInput = styled.input`
  background: transparent;
  border-radius: 13px;
  border: solid 1px rgba(45, 44, 44, 0.32);
  color: black;
  height: 38px;
  // flex: 1 1 65%;
  // margin-left: 10px;
  padding-left: 20px;
  width: 100%;
  direction: ltr;
  text-align: left;
  &:hover {
    border-color: #f18f6b;
  }
  @media (max-width: 425px) {
    // margin-left: 0px;
    width: 100%;
  }
  &:focus {
    outline-style: none;
  }
`;
const Eye = styled.div`
  position: absolute;
  height: 16px;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span<SpaceProps | FontSizeProps>`
  ${space}
  ${fontSize}
`;
const Content = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  @media (max-width: 425px) {
    flex-direction: column;
    width: 80%;
    margin: 12px 0;
  }
`;
const EnterButton = styled.div`
  margin-top: 10px;
  background: #8886ec;
  padding: 7px 45px;
  color: white;
  border-radius: 13px;
  height: 38px;
  // flex-basis: 10%;
  width: 100%;
  cursor: pointer;
  text-align: center;
`;
const Return = styled.div`
  position: relative;
  // right: 20%;
  cursor: pointer;
`;
const Img = styled.div`
  margin: 2px 5px 0 0;
`;
const PasswordDiv = styled.div`
  position: relative;
`;
const ButtomDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 55px;
  justify-content: space-evenly;
`;

export default function LoginWithPassword(props: PropsWithChildren<any>) {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [toast, setToast] = useState(false);
  const {
    setStep: setRoute,
    step,
    setRedirectFrom,
    setId,
    mobile,
    role,
  } = useContext(AuthContext);
  const router = useRouter();

  const handleInputPassword = (e: any) => {
    setPassword(e.target.value);
  };
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
  const dispatch = useAppDispatch();
  function entry() {
    if (mobile) {
      login({ mobile, password })
        .then((res: User) => {
          if (res && !res.errors) {
            let hasMultipleCompany = false;
            dispatch(defaultSignIn(res));
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
                  console.log(res.data.length);
                  if (res.data.length > 1) {
                    hasMultipleCompany = true;
                  }
                  if (res.data.length === 1) {
                    Cookies.set("cid", String(res.data[0].id) ,{ expires: 1, path: "/" });
                  }
                  dispatch(getCompanyInfo(true));
                  dispatch(setCompanyInfo(res.data));

                  console.log(res.data);
                } else {
                  dispatch(getCompanyInfo(false));
                  console.log("no company");
                }
              });
            }

            {
              setToast(true);
              setTimeout(() => {
                dispatch(showLoginModal(false));
                if (role === 1 && hasMultipleCompany) {
                  router.push("/login/verifyCompany");
                } else if (router.pathname === "/profile") {
                  router.reload();
                } else if (router.pathname === "/login") {
                  router.push("/user");
                }
              }, 3000);
              setMessage("");
            }
          } else if (
            res.errors[0].message === "bad inputs" ||
            res.errors[0].message ===
              "Error: Error: *** _011_auth: Process error - password is not valid"
          ) {
            setMessage("رمز وارد شده صحیح نمی باشد");
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
    }
  }

  function throwawayEntry() {
    if (mobile)
      disposablePassword({ mobile })
        .then((res: AuthResult) => {
          if (setRoute) {
            setRoute("disposablePassword");
          }
        })
        .catch((err) => {
          if (err)
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
  }
  function forgot() {
    if (mobile)
      changePassword({ mobile })
        .then((res: ChangePassResult) => {
          if (res.status) {
            if (setId) {
              setId(String(res.userId));
              setToast(true);
            }
            if (setRoute) {
              setRoute("verify");
            }
          }
        })
        .catch((err) => {
          if (err)
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
  }
  return (
    <Register>
      <Head>
        <Title>
          <Div>
            <PassLogin style={icon} />
            <Label marginRight={"14px"}>ورود با رمز عبور</Label>
          </Div>
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
        <Hint>لطفا رمز عبور خود را وارد کنید.</Hint>
      </Head>
      <Div>
        <Label fontSize={12}>رمز عبور</Label>
        <Content>
          <PasswordDiv>
            <PasswordInput
              autoFocus
              onFocus={handleOnFocus}
              type={eye ? "tel" : "password"}
              onChange={handleInputPassword}
              value={password}
              onKeyPress={(e: any) => {
                if (e.key == "Enter") entry();
              }}
            />
            <Eye onClick={() => setEye(!eye)}>
              <Image
                src={"/icons/eye.svg"}
                height={16}
                width={16}
                alt={"hide"}
              />
            </Eye>
          </PasswordDiv>
          <EnterButton onClick={entry}>ادامه</EnterButton>
        </Content>
        <ErrorMessage message={message} />
      </Div>
      <ButtomDiv>
        <ChangeMobile mb={"10px"} onClick={throwawayEntry}>
          ورود با رمز یکـبار مصرف
          <Back style={{ margin: "2px 5px 0 0" }} />
        </ChangeMobile>
        <ChangeMobile onClick={forgot}>
          فراموشی رمز عبور
          <Back style={{ margin: "2px 5px 0 0" }} />
        </ChangeMobile>
      </ButtomDiv>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={"ورود با موفقیت انجام شد"}
          confirm={false}
        />
      )}
    </Register>
  );
}
