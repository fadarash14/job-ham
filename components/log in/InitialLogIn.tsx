import React, {
  Dispatch,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { showLoginModal, showLogoutModal } from "@/store/pageConfig";
import { fadeIn } from "react-animations";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Link from "next/link";
import Cookies from "js-cookie";

const fadeInAnimation = keyframes`${fadeIn}`;

const Log = styled.div<any>`
  position: absolute;
  width: 312px;
  border-radius: 20px;
  padding: 22.5px 18px;
  top: 120%;
  left: 0;
  background: white;
  direction: rtl;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 5px 10px 50px 0 rgba(71, 69, 70, 0.65);
  @media (max-width: 425px) {
    width: 235px;
  }
  animation: 1s ${fadeInAnimation};
`;

const Portfolio = styled.div<ColorProps>`
  font-size: 14px;
  color: #474546;
  font-weight: 500;
  margin: -22.5px -18px;
  border-radius: 20px;
  padding: 22.5px 18px;
  ${color}
`;

const Flex = styled.div<SpaceProps>`
  display: flex;
  position: relative;
  align-items: Center;
  &.cursor {
    cursor: pointer;
  }
  ${space}
`;
const LogInButton = styled.div`
  cursor: pointer;
  border: 1px solid #707070;
  font-size: 12px;
  margin-right: auto;
  padding: 2px 11px;
  width: 100px;
  border-radius: 8px;
  text-align: center;
  background: white;
`;
const move = keyframes`
 0% { margin-left:0px }
 50% { margin-left:5px}
 100% { margin-left:0px }
`;

const Div = styled.div<SpaceProps>`
  margin-right: auto;
  animation-name: ${move};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  ${space}
`;
const LoginFlex = styled.div`
  display: flex;
  justify-content: space-evenly;

  & .manager {
    @media (min-width: 1024px) {
      display: none;
    }
  }
  & .jobFinder {
    @media (min-width: 1024px) {
      display: none;
    }
  }
`;

const Whole = styled.div<LayoutProps>`
  z-index: 10000;
  @media (max-width: 870px) {
    position: relative;
    display: flex;
    z-index: 10000;
    top: 0px;
  }
  ${layout}
`;

export default function InitialLogIn(
  props: PropsWithChildren<{
    closeSmallModal: Dispatch<any>;
    isToggle: boolean;
  }>
) {
  const [hover, setHover] = useState(false);
  const token = Cookies.get("token");
  const { name, lastname, mobile } = useAppSelector((state) => state.sign);
  let validMobile;
  if (mobile)
    if (mobile?.startsWith("0")) {
      validMobile = mobile;
    } else {
      validMobile = `0${mobile}`;
    }
  const escape = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (event: any) => {
      // @ts-ignore
      if (
        escape.current &&
        !escape.current.contains(event.target) &&
        props.isToggle
      ) {
        props.closeSmallModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const onShow1 = (e: Event) => {
    e.stopPropagation();
    if (token) {
      dispatch(showLogoutModal(true));
    } else {
      dispatch(showLoginModal(true));
    }
  };
  const dispatch = useAppDispatch();
  return (
    <Whole>
      <Log
        ref={escape}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Portfolio bg={hover ? "rgba(219,20,61,5%)" : "#f5f6fa"}>
          <Flex className={"cursor"}>
            <Link href={"/user"}>
              <div>
                <Flex>
                  <div>
                    <Image
                      alt="پروفایل"
                      src={"/icons/profile.svg"}
                      height={26}
                      width={26}
                    />
                  </div>
                  {name ? `${name} ${lastname} عزیز` : "کاربر میهمان"}
                </Flex>
                {validMobile && <div>{validMobile}</div>}
              </div>
            </Link>
            {hover && (
              <Div>
                <Image
                  alt="red-arrow"
                  src={"/icons/red-left-arrow.svg"}
                  height={7}
                  width={6}
                />
              </Div>
            )}
          </Flex>
          <LoginFlex>
            {!token && (
              <LogInButton className="normal">
                <Link onClick={() => props.closeSmallModal(true)} href="/login">
                  {"ورود و ثبت نام"}
                </Link>
              </LogInButton>
            )}
          </LoginFlex>
          {token && (
            //@ts-ignore
            <LogInButton onClick={onShow1}>خروج</LogInButton>
          )}
        </Portfolio>
        {props.children}
      </Log>
    </Whole>
  );
}
