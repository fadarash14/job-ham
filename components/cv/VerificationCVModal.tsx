import Back from "../../public/icons/Iconly-Curved-Arrow - Left Circle.svg";
import React, {
  Dispatch,
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
  SpaceProps,
} from "styled-system";
import ErrorMessage from "../log in/ErrorMessage";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Close from "../../public/icons/white-close-modal.svg";
import Logo from "../../public/icons/Mask Group 48.svg";
import ModalSkeleton from "../utility/ModalSkeleton";
import { useRouter } from "next/router";
import CloseSvgWhite from "../../public/icons/white-close-modal.svg";
import { showLoginModal } from "../../store/pageConfig";
import { Timer } from "../log in/Timer";
import Toast from "../Toast/Toast";
import convertDigitToEnglish from "../../utils/helper";
import { verifyCV } from "@/requests/cv";
import Cookies from "js-cookie";

const Throwaway = styled.div<LayoutProps>`
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 84%;
  ${layout}
`;
const Head = styled.div``;
const Piece = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 16px;
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
`;

const Digit = styled.input`
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
  margin-bottom: 10px;
`;

const Img = styled.div`
  margin: 2px 5px 0 0;
`;
const Item = styled.div`
  width: 30px;
`;
const Imgha = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  opacity: 0.5;
`;

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
  @media (max-width: 575px) {
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

export default function VerificationCVModal(props: {
  setVerModal: Dispatch<boolean>;
  setStatus: Dispatch<"success" | "fail" | "pending" | "">;
  verModal: boolean;
  values: { mobile: string; id: string; type: string };
  setDone: Dispatch<boolean>;
}) {
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState("on");
  const [callTimer, setCallTimer] = useState(false);
  const Duration = 60 * 2;
  let init = {
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
  };
  const [throwawayPass, setThrowawayPass] = useState(init);
  const first_ref = useRef<HTMLInputElement | null>(null);
  //@ts-ignore
  const sign = useAppSelector((state) => state.sign);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const maxLength = e.target.maxLength;
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    const str = convertDigitToEnglish(valueInput);
    const psrseStr = parseInt(str);
    if (valueInput.length <= maxLength) {
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
  }

  useEffect(() => {
    setMessage("");
    if (timer == "on") {
      setCallTimer(true);
    } else {
      setCallTimer(false);
    }
  }, [timer]);

  //   useEffect(() => {
  //     if (done) {
  //       setPaused(4);
  //       router
  //         .push("/user/profile/managewizard/" + id, undefined, { shallow: false })
  //         .then((r) => {
  //           props.setVerModal(false);
  //         });
  //     }
  //   }, [sign]);
  console.log(props.values);

  let stringCode = "";
  useEffect(() => {
    stringCode =
      throwawayPass.field_1.toString() +
      throwawayPass.field_2.toString() +
      throwawayPass.field_3.toString() +
      throwawayPass.field_4.toString();

    if (stringCode.length == 4 && props.values.mobile) {
      let map_code = "999-99901-2601";
      //@ts-ignore
      if (window && window.rahnama) {
        //@ts-ignore
        if (window?.rahnama?.getDownloadType) {
          // @ts-ignore
          map_code = window?.rahnama?.getDownloadType();
        }
      }
      let data = { ...props.values, code: stringCode };
      props.setVerModal(false);
      props.setStatus("pending");
      verifyCV(data)
        .then((res: any) => {
          if (res.id) {
            console.log(res);
            Cookies.set("token", res.token, { expires: 2, path: "/" });
            props.setDone(true);
            props.setStatus("success");
          } else if (res.errorCode === 330) {
            setThrowawayPass(init);
            if (first_ref.current) {
              first_ref.current?.focus();
            }
            props.setStatus("fail");
            setMessage("کد وارد شده صحیح نمی باشد");
          }
        })
        .catch((err: any) => {
          setThrowawayPass(init);
          if (first_ref.current) {
            first_ref.current?.focus();
          }
          setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
        });
      setMessage("");
    }
  }, [throwawayPass]);
  //@ts-ignore
  return (
    <ModalSkeleton
      flex={"column"}
      show={props.verModal}
      setShow={props.setVerModal}
    >
      <Carpet className={"mobile"} bg={"#DB143D"}>
        <Span>نیازمندی های همشهری</Span>
        <CloseSvgWhite
          onClick={() => dispatch(showLoginModal(false))}
          style={close}
        />
        <Imgha>
          <Image
            height={80}
            width={80}
            src={"/icons/white-he-profile.svg"}
            alt=""
          />
        </Imgha>
      </Carpet>
      <Piece>
        <Throwaway>
          <Head>
            <Title>
              <div>کد یکبـار مصـرف</div>
              <ReverseTimer>
                <Img>
                  <Image
                    height={15}
                    width={15}
                    alt=""
                    src={"/icons/Iconly-Curved-Time Square.svg"}
                  />
                </Img>
                <Item>
                  <Timer
                    Duration={Duration}
                    timer={timer}
                    setTimer={setTimer}
                    callTimer={callTimer}
                  />
                </Item>
              </ReverseTimer>
            </Title>
            <Hint>برای تایید رزومه خود، لطفا کد ارسال شده را وارد کنید.</Hint>
          </Head>
          <div>
            <Content aria-autocomplete={"none"}>
              <Digit
                type={"tel"}
                ref={first_ref}
                autoFocus
                name={"field_1"}
                value={throwawayPass.field_1}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"field_2"}
                value={throwawayPass.field_2}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
                name={"field_3"}
                value={throwawayPass.field_3}
                maxLength={1}
                onChange={handleInputChange}
                onClick={inputOnclick}
              />
              <Digit
                type={"tel"}
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
            <TryAgain onClick={tryAgain}>ارسـال مجـدد</TryAgain>
          ) : (
            <TryAgain style={{ opacity: "100%" }} onClick={tryAgain}>
              ارسـال مجـدد
            </TryAgain>
          )}
          <Alteration>
            تغـییر شمـاره موبایـل
            <Back
              style={{ margin: "2px 5px 0 0" }}
              onClick={() => props.setVerModal(false)}
            />
          </Alteration>
        </Throwaway>
        <Carpet className={"web"} bg={"#DB143D"}>
          <Close
            onClick={() => props.setVerModal(!props.verModal)}
            style={close}
          />
          <Span>نیازمنــدی هـای همشــهری</Span>
          <Logo style={logo} />
        </Carpet>
      </Piece>
      {/* {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: e }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )} */}
    </ModalSkeleton>
  );
}
