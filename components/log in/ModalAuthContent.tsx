import Login from "./Login";
import DisposablePassword from "./DisposablePassword";
import LoginWithPassword from "./LoginWithPassword";
import Forgot from "./Forgot";
import Verify from "./Verify";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import styled from "styled-components";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";
import Footer from "../footer/Footer";

const Box = styled.div`
  min-height: 90vh;
`;

const Roles = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 512px;
  justify-content: space-between;
  margin: 50px auto 10px auto;
  @media (max-width: 576px) {
    margin: 50px auto 10px auto;
  }
  & .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 576px) {
      justify-content: space-evenly;
    }
  }
  & .hintDiv {
    margin-top: 15px;
    @media (max-width: 576px) {
      width: 90%;
      margin: 15px auto;
      justify-content: space-evenly;
    }
  }
`;
const RoleBox = styled.div<{ isClicked: boolean; isLocked: boolean }>`
  display: flex;
  width: 100%;
  max-width: 235px;
  height: 100%;
  min-height: 105px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
  & img {
    position: absolute;
    right: 12px;
    top: 8px;
  }
  background: ${({ isLocked, isClicked }) =>
    isClicked ? "#FFFFFF" : "#7E8395"};
  cursor: ${({ isLocked }) => (isLocked ? "not-allowed" : "pointer")};
  color: ${({ isClicked, isLocked }) => (isClicked ? "#7E8395" : "#FFFFFF")};
  @media (max-width: 576px) {
    max-width: 165px;
    max-height: 72px;
  }
`;
const Hint = styled.span`
  font-size: 12px;

  margin-right: 6px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

export default function ModalAuthContent(props: PropsWithChildren<any>) {
  const { step, setStep, role, setRole } = useContext(AuthContext);
  //@ts-ignore
  const { showLoginModal: show } = useAppSelector((state) => state.pageConfig);
  useEffect(() => {
    if (!show) {
      if (setStep) {
        setStep("login");
      }
    }
  }, [show]);

  const handleRole = (role: number) => {
    if (setRole && setStep) {
      setRole(role);
      setStep("login");
    }
  };

  let bg: string | undefined = {
    login: "#db143d",
    disposablePassword: "#db143d",
    loginWithPassword: "#8886ec",
    forgot: "#8886ec",
    // @ts-ignore
  }[step];
  bg = bg ?? "#db143d";

  return (
    <React.Fragment>
      <Box>
        <Roles>
          <div className="row">
            <RoleBox
              onClick={() => step === "login" && handleRole(2)}
              isClicked={role === 0 ? false : role === 2 ? true : false}
              isLocked={step !== "login"}
            >
              {role == 2 && (
                <Image
                  src={"/icons/successTick.svg"}
                  alt="tick"
                  width={20}
                  height={20}
                />
              )}
              کارجو
            </RoleBox>
            <RoleBox
              onClick={() => step === "login" && handleRole(1)}
              isLocked={step !== "login"}
              isClicked={role === 0 ? false : role === 2 ? false : true}
            >
              {role == 1 && (
                <Image
                  src={"/icons/successTick.svg"}
                  alt="tick"
                  width={20}
                  height={20}
                />
              )}
              کارفرما
            </RoleBox>
          </div>
          {step !== "" && (
            <div className="hintDiv">
              <Image
                src={"/icons/left-arrow-yellow.svg"}
                alt=""
                width={6}
                height={6}
              />
              <Hint>برای ورود / ثبت یکی از بخش ها را انتخاب کنید</Hint>
            </div>
          )}
        </Roles>
        <Content>
          {step &&
            role !== 0 &&
            {
              login: <Login role={role!} />,
              disposablePassword: <DisposablePassword />,
              loginWithPassword: <LoginWithPassword />,
              forgot: <Forgot />,
              verify: <Verify />,
            }[step]}
        </Content>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
