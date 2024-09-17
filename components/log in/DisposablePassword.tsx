import Profile from "../../public/icons/profile.svg";
import Clock from "../../public/icons/Iconly-Curved-Time Square.svg";
import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import {
  disposablePassword,
  verify,
  verifyChangePassword,
} from "../../requests/sign";
import { AuthResult, User } from "../../types";
import ErrorMessage from "./ErrorMessage";
import Image from "next/image";
import AuthContext from "./AuthContext";
import { defaultSignIn, userRoles } from "../../store/sign";
import { useAppDispatch } from "@/store/hook";
import Toast from "../Toast/Toast";
import { useRouter } from "next/router";
import { showLoginModal } from "../../store/pageConfig";
import { Timer } from "./Timer";
import convertDigitToEnglish from "../../utils/helper";
import { Debugger } from "inspector";
import { getCV } from "@/requests/cv";
import { getSentSvIds } from "@/requests/profile/sentCvList";
import { setSentCVIds } from "@/store/cvList";
import { setMyCv } from "@/store/cv";
import { getCompany } from "@/requests/profile/company";
import { getCompanyInfo, setCompanyInfo } from "@/store/company";
import Cookies from "js-cookie";

const Throwaway = styled.div<LayoutProps>`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1;
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

const Alteration = styled.div<SpaceProps>`
  display: flex;
  font-size: 12px;
  cursor: pointer;
  ${space}
`;

const Digit = styled.input`
  /* inputMode='numeric'; */
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
  margin-top: 12px;
  text-align: justify;
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

const Img = styled.div`
  margin: 2px 5px 0 0;
`;

export default function DisposablePassword() {
  const { setHasAccount, mobile } = useContext(AuthContext);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState("on");
  const [callTimer, setCallTimer] = useState(false);
  const Duration = 60 * 2;
  const init = {
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
  };
  const [throwawayPass, setThrowawayPass] = useState(init);
  const Dispatch = useAppDispatch();
  const router = useRouter();
  const {
    setStep: setRoute,
    setRedirectFrom,
    step,
    setId,
    role,
  } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      if (setRedirectFrom) {
        if (step != null) {
          setRedirectFrom(step);
        }
      }
    };
  }, [setRedirectFrom, step]);

  const handleInputChange = (e: any) => {
    const maxLength = e.target.maxLength;
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    if (valueInput.length <= maxLength) {
      const str = convertDigitToEnglish(valueInput);
      const psrseStr = parseInt(str);
      setThrowawayPass({
        ...throwawayPass,
        [nameInput]: psrseStr,
      });

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
    if (mobile)
      disposablePassword({ mobile })
        .then((res: AuthResult) => {
          if (setRoute) {
            setRoute("disposablePassword");
          }
          setMessage("");
        })
        .catch((err: any) => {
          if (err)
            setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
  }

  useEffect(() => {
    setMessage("");
    if (timer == "on") {
      setCallTimer(true);
    } else {
      setCallTimer(false);
    }
  }, [timer]);
  const dispatch = useAppDispatch();
  const refFirst = useRef<HTMLInputElement | null>(null);

  let stringCode = "";
  useEffect(() => {
    stringCode =
      throwawayPass.field_1.toString() +
      throwawayPass.field_2.toString() +
      throwawayPass.field_3.toString() +
      throwawayPass.field_4.toString();
    if (stringCode.length == 4 && mobile) {
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
                console.log(res);
                if (!res.errorCode && res.data.length > 0) {
                  console.log("I'm Manager");
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
                  console.log("no company");
                }
              });
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
            setThrowawayPass(init);
            if (refFirst.current) {
              refFirst.current?.focus();
            }
            setMessage("کد وارد شده صحیح نمی باشد");
          }
        })
        .catch((err: any) => {
          setThrowawayPass(init);
          if (refFirst.current) {
            refFirst.current?.focus();
          }
          setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
      setMessage("");
    }
  }, [throwawayPass]);

  return (
    <Throwaway>
      <Head>
        <Title>
          <div>
            <Profile style={icon} />
            رمز یکبار مصرف
          </div>
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
        </Title>
        <Hint>برای تایید شماره خود، لطفا کد ارسال شده را وارد کنید.</Hint>
      </Head>
      <div>
        <Content aria-autocomplete={"none"}>
          <Digit
            type={"tel"}
            ref={refFirst}
            autoFocus
            name={"field_1"}
            value={throwawayPass.field_1}
            maxLength={1}
            onChange={handleInputChange}
            onClick={inputOnclick}
          />
          <Digit
            type={"tel"}
            inputMode="decimal"
            name={"field_2"}
            value={throwawayPass.field_2}
            maxLength={1}
            onChange={handleInputChange}
            onClick={inputOnclick}
          />
          <Digit
            type={"tel"}
            inputMode="decimal"
            name={"field_3"}
            value={throwawayPass.field_3}
            maxLength={1}
            onChange={handleInputChange}
            onClick={inputOnclick}
          />
          <Digit
            type={"tel"}
            inputMode="decimal"
            name={"field_4"}
            value={throwawayPass.field_4}
            maxLength={1}
            onChange={handleInputChange}
            onClick={inputOnclick}
          />
        </Content>
        <ErrorMessage message={message} />
      </div>
      {timer == "on" ? (
        <TryAgain onClick={tryAgain}>ارسال مجدد</TryAgain>
      ) : (
        <TryAgain style={{ opacity: "100%" }} onClick={tryAgain}>
          ارسال مجدد
        </TryAgain>
      )}
      <Alteration
        my={"5px"}
        onClick={() => (setRoute ? setRoute("login") : "")}
      >
        تغییر شماره موبایل
        <Back style={{ margin: "2px 5px 0 0" }} />
      </Alteration>
      <Alteration
        mb={"10px"}
        onClick={() => (setRoute ? setRoute("loginWithPassword") : "")}
      >
        ورود با رمز عبور
        <Back style={{ margin: "2px 5px 0 0" }} />
      </Alteration>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={"ورود با موفقیت انجام شد"}
          confirm={false}
        />
      )}
    </Throwaway>
  );
}
