import React, {
  Dispatch,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { fadeIn } from "react-animations";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showLoginModal, showLogoutModal } from "../../store/pageConfig";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const fadeInAnimation = keyframes`${fadeIn}`;

const Log = styled.div<any>`
  position: absolute;
  width: 312px;
  border-radius: 20px;
  padding: 22.5px 18px;
  top: 40%;
  left: 0;
  background: white;
  direction: rtl;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 5px 10px 50px 0 rgba(71, 69, 70, 0.65);
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
  ${space}
`;
const Name = styled.div<SpaceProps>`
  margin-right: 5px;
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

export default function InitialLogInTabletRedirect(
  props: PropsWithChildren<{
    isToggle: boolean;
    closeSmallModal: Dispatch<any>;
  }>
) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const onShow1 = (e: Event) => {
    e.stopPropagation();
    router.push("/login");
    props.closeSmallModal(true);
  };

  const escape = useRef<HTMLDivElement>(null);
  const { name, lastname } = useAppSelector((state) => state.sign);
  const token = Cookies.get("token");

  return (
    <Whole>
      <Log
        ref={escape}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Portfolio bg={hover ? "rgba(219,20,61,5%)" : "#f5f6fa"}>
          <Flex>
            <Flex
              onClick={() => {
                router.push("/user");
              }}
            >
              <div>
                <Image
                  src={"/icons/profile.svg"}
                  height={26}
                  width={26}
                  alt="پروفایل"
                />
              </div>
              <Name>{name ? `${name} ${lastname} عزیز` : "کاربر میهمان"}</Name>
            </Flex>
            {hover && (
              <Div>
                <Image
                  src={"/icons/red-left-arrow.svg"}
                  height={7}
                  width={6}
                  alt="left-arrow"
                />
              </Div>
            )}
          </Flex>
          {
            //@ts-ignore
            <LogInButton onClick={onShow1}>
              {token ? "خروج" : "ورود و ثبت نام"}
            </LogInButton>
          }
        </Portfolio>
        {props.children}
      </Log>
    </Whole>
  );
}
