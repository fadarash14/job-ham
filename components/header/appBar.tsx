import React, { PropsWithChildren, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Links = dynamic(() => import("./Links"), {
  ssr: false,
});
import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
  ZIndexProps,
} from "styled-system";
import Container from "../utility/Container";
import Box from "../utility/Box";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import SmallModal from "../mobile modals/SmallModal";
import ProfileShortageModal from "../profile/ProfileShortageModal";
import EditProfileModal from "../profile/EditProfileModal";
import {
  setshowTabletCategory,
  showLoginModal,
  showLogoutModal,
} from "../../store/pageConfig";
import Link from "next/link";
import InitialLogInTabletRedirect from "../log in/InitialLogInTabletRedirect";
import { setShowOnHeader } from "../../store/pageConfig";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface Props {
  bg?: string;
  color: string;
  line: string;
  logo: boolean;
  button: string;
  profilePage: boolean;
  classNames?: string;
  mainPage: boolean;
  onOpen: () => void;
}

const Bar = styled((props) => <Box {...props} />)<
  ColorProps | PositionProps | LayoutProps | ZIndexProps
>`
  will-change: transform;
  ${color}
  ${layout}
    ${position}
`;

const FlexBox = styled.div<
  | FlexboxProps
  | LayoutProps
  | SpaceProps
  | WidthProps
  | BorderProps
  | ColorProps
>`
  align-items: center;
  &:first-child {
    margin-left: 5px;
  }
  &.logo {
    cursor: pointer;
  }
  &.media {
    z-index: 5;
  }
  @media (max-width: 525px) {
    &.media {
      flex-direction: column;
      z-index: 2;
      & > div {
        margin: 5px px;
      }
    }
    &.not-logged {
      margin-top: auto;
    }
  }
  ${color}
  ${layout}
    ${flexbox}
    ${space}
    ${width}
    ${border}
`;

const FlexBoxOption = styled.button<
  | FlexboxProps
  | LayoutProps
  | SpaceProps
  | WidthProps
  | BorderProps
  | ColorProps
>`
  align-items: center;
  cursor: pointer;
  &:first-child {
    margin-left: 5px;
  }
  &.logo {
    cursor: pointer;
  }
  &.media {
    z-index: 5;
  }
  @media (max-width: 525px) {
    &.media {
      flex-direction: column;
      z-index: 2;
      & > div {
        margin: 5px px;
      }
    }
    &.not-logged {
      margin-top: auto;
    }
  }
  ${color}
  ${layout}
    ${flexbox}
    ${space}
    ${width}
    ${border}
`;

const FormToBeta = styled.div`
  display: none;
`;
const SubmitButton = styled.button`
  display: flex;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const FlexBoxOptionSubmit = styled.form<
  | FlexboxProps
  | LayoutProps
  | SpaceProps
  | WidthProps
  | BorderProps
  | ColorProps
>`
  align-items: center;
  cursor: pointer;
  &:first-child {
    margin-left: 5px;
  }
  &.logo {
    cursor: pointer;
  }
  &.media {
    z-index: 5;
  }
  @media (max-width: 525px) {
    &.media {
      flex-direction: column;
      z-index: 2;
      & > div {
        margin: 5px px;
      }
    }
    &.not-logged {
      margin-top: auto;
    }
  }
  ${color}
  ${layout}
    ${flexbox}
    ${space}
    ${width}
    ${border}
`;

const Typo = styled.p<TypographyProps | SpaceProps>`
  @media (max-width: 525px) {
    width: 206px;
    margin-right: 0;
  }
  ${typography}
  ${space}
`;
const Name = styled.div`
  font-size: 11px;
  color: rgba(71, 69, 70, 0.6);
`;

const NavBarBox = styled((props) => <Box {...props} />)<
  BorderProps | SpaceProps
>`
  @media (max-width: 525px) {
    border-bottom: none;
  }
  ${border}
  ${space}
`;

const Logo = styled("a")`
  margin-left: 5px;
  display: flex;
  flex: 0 0 33px;
  align-items: center;
`;
const ResponsiveLinks = styled.div`
  display: none;
  margin-top: 10px;
  z-index: 50;
  @media (max-width: 870px) {
    display: flex;
  }
  @media (max-width: 525px) {
    display: none;
  }
`;

const Img = styled.div<SpaceProps | LayoutProps>`
  margin: 0 5px;
  position: relative;
  ${layout}
  ${space}
`;
const SubtleLogo = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: block;
  @media all and (min-width: 1399px) and (max-width: 1610px) {
    display: none;
  }
`;
const ProfileShortage = styled.div`
  background: #fcc155;
  border-radius: 10px;
  padding: 5px 15px;
  color: black;
  margin-left: 5px;
  font-size: 14px;
  cursor: pointer;
`;
const LogOut = styled.div`
  background: white;
  border: 1px solid #707070;
  border-radius: 10px;
  padding: 5px 15px;
  color: black;
  font-size: 14px;
  cursor: pointer;
`;
const EditProfile = styled.div`
  background: #8886ec;
  border-radius: 10px;
  padding: 5px 15px;
  color: white;
  margin-left: 5px;
  font-size: 14px;
  cursor: pointer;
`;
const Button = styled.div`
  background: white;
  border: 1px solid #707070;
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 12px;
  cursor: pointer;
`;
const PhoneNo = styled.div`
  font-size: 14px;
  opacity: 46%;
`;
const AppBar = (props: PropsWithChildren<Props>) => {
  const [isToggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [shortage, setShortageModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const closeSmallModal = () => {
    console.log("closing");
  };

  const { showOnHeader } = useAppSelector((state) => state.pageConfig);
  const closeModal = () => {
    setToggle(!isToggle);
  };
  const { name, lastname, mobile, roles } = useAppSelector(
    (state) => state.sign
  );
  const token = Cookies.get("token");
  // @ts-ignore
  let tokens = props.profilePage && token;
  let validMobile;
  if (mobile)
    if (mobile.startsWith("0")) {
      validMobile = mobile;
    } else {
      validMobile = `0${mobile}`;
    }

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!router.pathname.includes("key")) {
      dispatch(setShowOnHeader(false));
    }
  }, [router.pathname]);

  const path = router.pathname;
  const roleName = roles == 2 ? "کارجو" : "کارفرما";

  return (
    <Bar display={["none", "flex"]} bg={props.bg} color={props.color}>
      <Container p={["0 10px"]} className={props.classNames}>
        <NavBarBox
          display={"flex"}
          pt={"24px"}
          pb={"13px"}
          justifyContent={"space-between"}
          borderBottom={showOnHeader ? "none" : props.line}
        >
          <FlexBox
            className={"logo"}
            flexBasis={"43%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            maxWidth={"229px"}
          >
            <Link href={"/"} passHref>
              {props.logo ? (
                <Image
                  width={33}
                  height={33}
                  src="/logo.svg"
                  alt="niazmandiha"
                />
              ) : (
                <Image
                  width={33}
                  height={33}
                  src="/icons/black logo.svg"
                  alt="niazmandiha"
                />
              )}
            </Link>

            <Link href={"/"} passHref>
              <Typo fontSize={"14px"} fontWeight={600} mr={10}>
                {"نیـــازمنــدی‌های هـمـشــــــهـری"}
              </Typo>
            </Link>
          </FlexBox>
          <Links
            logo={props.logo}
            button={props.button}
            color={props.color}
            profile={props.profilePage}
            mainPage={props.mainPage}
            route={router.pathname}
          />
          <ResponsiveLinks>
            <Img onClick={() => setToggle(!isToggle)}>
              {props.logo ? (
                <Image
                  height={30}
                  width={30}
                  src={"/icons/responsive icons2.svg"}
                  alt="icon"
                />
              ) : (
                <Image
                  height={30}
                  width={30}
                  src={"/icons/Group 1610.svg"}
                  alt="Group"
                />
              )}
              {isToggle && (
                <InitialLogInTabletRedirect
                  isToggle={isToggle}
                  closeSmallModal={closeModal}
                />
              )}
            </Img>
            <Img onClick={props.onOpen}>
              {props.logo ? (
                <Image
                  height={30}
                  width={30}
                  src={"/icons/responsive icons.svg"}
                  alt="icon"
                />
              ) : (
                <Image
                  height={30}
                  width={30}
                  src={"/icons/Group 1612.svg"}
                  alt="Group"
                />
              )}
              {show && <SmallModal closeModal={closeSmallModal} />}
            </Img>
          </ResponsiveLinks>
        </NavBarBox>
        {props.profilePage ? (
          tokens ? (
            <FlexBox
              mt={"5px"}
              mb={"5px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {roles !== 0 ? (
                <FlexBox className={"media"} display={"flex"}>
                  <Link href={"/user/profile/mywizard"}>
                    <FlexBox display={"flex"}>
                      <Img mr={0}>
                        <Image
                          src={"/icons/profile.svg"}
                          alt="پروفایل"
                          height={30}
                          width={30}
                        />
                      </Img>
                      <div>{name ? `${name} ${lastname}` : `${roleName}`}</div>
                    </FlexBox>
                  </Link>
                  <PhoneNo>{validMobile}</PhoneNo>
                </FlexBox>
              ) : (
                <FlexBox className={"media"} display={"flex"}>
                  <Link href={"/user/profile/mywizard"} passHref>
                    <FlexBoxOption
                      display={"flex"}
                      p={"8px"}
                      color={path.includes("/user/profile") ? "" : "#ACACAC"}
                      bg={
                        path.includes("/user/profile")
                          ? "transparent"
                          : "rgba(209,209,209,0.4)"
                      }
                      border={
                        path.includes("/user/profile")
                          ? "1px solid #DB143D"
                          : "1px solid rgba(209,209,209,0.4)"
                      }
                      borderRadius={"10px"}
                    >
                      <Img height={"30px"} mr={0}>
                        <Image
                          alt="پروفایل"
                          src={
                            path.includes("/user/profile")
                              ? "/icons/profile.svg"
                              : "/icons/inactive-customer.svg"
                          }
                          height={30}
                          width={30}
                        />
                      </Img>
                      <div>
                        <div>حسـاب شـخــصی</div>
                        <Name>
                          {name ? `${name} ${lastname}` : "کـاربر هـمشـهـری"}
                        </Name>
                      </div>
                    </FlexBoxOption>
                  </Link>
                </FlexBox>
              )}
              <ProfileShortageModal
                setEdit={setEdit}
                setShortageModal={setShortageModal}
                shortage={shortage}
              />
              <EditProfileModal
                setEditModal={setEditModal}
                editModal={editModal}
              />
            </FlexBox>
          ) : (
            <FlexBox
              className={"header"}
              mt={"5px"}
              mb={"5px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <FlexBox className={"media not-logged"} display={"flex"}>
                <FlexBox display={"flex"}>
                  <Img mr={0}>
                    <Image
                      src={"/icons/profile.svg"}
                      height={30}
                      width={30}
                      alt="پروفایل"
                    />
                  </Img>
                  <div>کـاربر هـمشـهـری</div>
                </FlexBox>
                <Button onClick={(e) => dispatch(showLoginModal(true))}>
                  ورود و ثـبـت نـام
                </Button>
              </FlexBox>
            </FlexBox>
          )
        ) : (
          ""
        )}
      </Container>
      {props.profilePage && (
        <SubtleLogo>
          <Image
            height={90}
            width={97}
            src={"/icons/white-he-profile.svg"}
            alt="white-he-profile"
          />
        </SubtleLogo>
      )}
    </Bar>
  );
};

AppBar.defaultProps = {
  classNames: "hi",
  mainPage: true,
};
export default AppBar;
