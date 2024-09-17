import React, { useState, useContext, useEffect } from "react";
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
  BorderProps,
  border,
  backgroundColor,
} from "styled-system";
import ErrorMessage from "@/components/log in/ErrorMessage";
import { signUp } from "@/requests/sign";
import { SignUpResult } from "@/types";
import AuthContext from "@/components/log in/AuthContext";

type Props = {
  role: number;
};

const Flex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const Title = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  justify-content: center;

  ${space}
  ${layout}
`;
const LoginBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Box = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Field = styled.div<SpaceProps | LayoutProps>`
  ${space}
  ${layout}
`;
const Label = styled.span<SpaceProps | ColorProps>`
  font-size: 12px;
  ${space}
  ${color}
`;
const Input = styled.input<BorderProps>`
  height: 45px;
  border-radius: 15px;
  border: 1px solid #d1d1d1;
  background: white;
  outline: none;
  width: 100%;
  padding-right: 10px;
  flex: 1 1;
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }

  ${border}
`;
const Links = styled.div`
  height: 70px;
  border-radius: 15px;
  border: 1px solid #d1d1d1;
  background: white;
  outline: none;
  width: 100%;
  padding-right: 10px;
  flex: 1 1;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RedButton = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 218px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 15px;
  border: none;
  @media (max-width: 576px) {
    width: 162px;
  }
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
const Img = styled.div`
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Login({ role }: Props) {
  const [message, setMessage] = useState("");
  const { setHasAccount, setMobile, mobile } = useContext(AuthContext);
  const { setStep: setRoute, setRedirectFrom, step } = useContext(AuthContext);
  let roleName = role === 2 ? "کارجو" : "کارفرما";

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

  const handleInputMobile = (e: any) => {
    const inputValue = e.target.value;
    if (setMobile) {
      setMobile(inputValue);
    }
  };

  const validation = () => {
    //@ts-ignore
    if (/^09[0-9]{9}$/.test(mobile)) return true;
    else return false;
  };
  function entry() {
    let type = "999-99901-2601";
    // console.log(validation(),'func')
    //@ts-ignore
    if (window && window?.rahnama) {
      //@ts-ignore
      if (window?.rahnama?.getDownloadType) {
        // @ts-ignore
        type = window?.rahnama?.getDownloadType();
      }
    }
    if (validation()) {
      setMessage("");
      if (mobile) {
        signUp({ mobile, role }, { map_code: type })
          .then((res: SignUpResult) => {
            if (res && !res.errors) {
              if (setHasAccount)
                res.page === "Verify"
                  ? setHasAccount(false)
                  : setHasAccount(true);

              if (setRoute) {
                res.page === "Verify"
                  ? setRoute("verify")
                  : setRoute("loginWithPassword");
              }
            } else if (
              res.errors[0].message === "bad inputs" ||
              res.errors[0].message ===
                "Error: Error: *** _011_auth: Process error - password is not valid"
            )
              setMessage("شماره موبایل صحیح نمی باشد");
          })
          .catch((err: any) => {
            if (
              err.message ==
                "Error: Error: *** _011_auth: Process error - mobile number is not valid" ||
              err.message == "signup bad inputs"
            )
              setMessage("فرآیند با خطا مواجه شد لطفا با پشتیبانی تماس بگیرید");
          });
      }
    } else {
      setMessage("شماره موبایل صحیح نمی باشد");
    }
  }

  return (
    <Box>
      <LoginBox>
        <Title display={"flex"} marginTop={"30px"} marginBottom={"50px"}>
          <Span fontSize={22} fontWeight={600} color={"#474546"}>
            ورود / ثبت نام
          </Span>
        </Title>
        <Flex>
          <Field>
            <Label color="#ACACAC">
              شماره موبایل یا ایمیل خود را وارد نمایید
            </Label>
            <Input
              value={mobile}
              onChange={handleInputMobile}
              onKeyPress={(e: any) => {
                if (e.key == "Enter") entry();
              }}
              onFocus={handleOnFocus}
              autoFocus
              maxLength={200}
              placeholder={"شماره موبایل یا ایمیل"}
            />
          </Field>
          <ErrorMessage message={message} />
          <Field>
            <RedButton
              onClick={entry}
              className="RedButton"
              disabled={!validation()}
              backgroundColor={validation() ? "lipstick" : "#B7B7B7"}
            >
              <Span fontSize={14}>ادامه</Span>
            </RedButton>
          </Field>
          {/* <Field>
            <Links className="Links">
              <Span fontSize={22}>ورود با </Span>
              <Img>
                <Image
                  src={"/icons/linkedin.svg"}
                  alt={"linkedin"}
                  width={30}
                  height={30}
                />
              </Img>
            </Links>
          </Field> */}
          {/* <Field>
            <Links className="Links">
              <Span fontSize={22}>ورود با </Span>
              <Img>
                <Image
                  src={"/icons/google.svg"}
                  alt={"google"}
                  width={30}
                  height={30}
                />
              </Img>
            </Links>
          </Field> */}
        </Flex>
      </LoginBox>
    </Box>
  );
}
