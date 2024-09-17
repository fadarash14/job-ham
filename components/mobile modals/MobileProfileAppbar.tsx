import React, { PropsWithChildren, useState } from "react";
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
  margin,
  marginLeft,
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
import ProfileShortageModal from "../profile/ProfileShortageModal";
import EditProfileModal from "../profile/EditProfileModal";
import { showLoginModal, showLogoutModal } from "../../store/pageConfig";
import Link from "next/link";
import Cookies from "js-cookie";

interface Props {
  bg: string;
  color: string;
  line: string;
  logo: boolean;
  button: string;
  profilePage: boolean;
  pro: boolean;
}

const Bar = styled((props) => <Box {...props} />)<
  ColorProps | PositionProps | LayoutProps | ZIndexProps
>`
  ${color}
  ${layout}
${position}
`;
const Mobile = styled.div`
  font-size: 16px;
  opacity: 46%;
`;
const Name = styled.div`
  font-size: 11px;
  color: rgba(71, 69, 70, 0.6);
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

const FlexBox = styled.div<
  FlexboxProps | LayoutProps | SpaceProps | WidthProps | BorderProps
>`
  align-items: center;
  z-index: 12;
  display: flex !important;
  ${border}
  ${layout}
    ${flexbox}
    ${space}
    ${width}
`;
const FlexBoxRow = styled.div<
  FlexboxProps | LayoutProps | SpaceProps | WidthProps | BorderProps
>`
  align-items: center;
  z-index: 12;
  display: flex !important;
  border-bottom: 1px solid #db143d !important;
  border-left: 1px solid rgba(204, 204, 207, 0.33);
  ${border}
  ${layout}
    ${flexbox}
    ${space}
    ${width}
`;

const Typo = styled.div<TypographyProps | SpaceProps>`
  @media (max-width: 525px) {
    width: 206px;
    margin-right: 0;
  }
  ${typography}
  ${space}
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
  margin-left: 17px;
  display: flex;
  flex: 0 0 33px;
  align-items: center;
`;

const Img = styled.div<SpaceProps | LayoutProps>`
  cursor: pointer;
  margin: 0 5px;
  position: relative;
  &.panels {
    z-index: 10;
    padding: 0 10px 0 0 !important;
    margin: 0 !important;
    border-right: 1px solid rgba(204, 204, 207, 0.33);
  }
  ${layout}
  ${space}
`;

const FormToBeta = styled.div`
  display: none;
`;

const ImgButton = styled.button<SpaceProps | LayoutProps>`
  cursor: pointer;
  position: relative;
  border: 1px solid #e8e8ec;
  border-radius: 5px;
  text-align: center;
  background: #e8e8ec;
  display: flex;
  &.panels {
    z-index: 10;
    padding: 8px;
    margin-right: 8px !important;
  }
  ${layout}
  ${space}
`;
const SubtleLogo = styled.div<LayoutProps>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: block;
  @media all and (min-width: 1399px) and (max-width: 1610px) {
    display: none;
  }
  ${layout}
`;
const ProfileShortage = styled.button`
  color: #fcc155;
  padding-left: 15px;
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  margin-right: auto !important;
`;
const LogOut = styled.button`
  background: white;
  border: 1px solid #707070;
  border-radius: 10px;
  padding: 5px 15px;
  color: black;
  font-size: 14px;
  cursor: pointer;
  margin-right: auto;
  margin-left: 8px;
`;
const EditProfile = styled.button`
  color: #8886ec;
  padding-left: 15px;
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  margin-right: auto !important;
`;
const Button = styled.button`
  background: white;
  border: 1px solid #707070;
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 12px;
  z-index: 20;
`;
const Flex = styled.div<SpaceProps>`
  display: flex;
  align-items: center;
  ${space}
`;
const FlexRow = styled.div<SpaceProps | FlexboxProps>`
  display: flex;
  align-items: center;
  ${flexbox}
  ${space}
`;
const Close = styled.div`
  margin-right: auto;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
export const MobileProfileAppBar = (props: PropsWithChildren<Props>) => {
  const [shortage, setShortageModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { showOnHeader } = useAppSelector((state) => state.pageConfig);
  const { name, lastname, mobile, roles } = useAppSelector(
    (state) => state.sign
  );
  let token = Cookies.get("token");
  const dispatch = useAppDispatch();
  let validMobile;
  if (mobile)
    if (mobile?.startsWith("0")) {
      validMobile = mobile;
    } else {
      validMobile = `0${mobile}`;
    }

  let tokens = props.profilePage && token;

  const condition =
    (!edit && name === null) || name === undefined || name === "";

  return (
    <Bar
      bg={props.bg}
      position={"sticky"}
      color={props.color}
      // @ts-ignore
      zIndex={"sticky"}
      top={0}
      height={"160px"}
    >
      <Container
        p={["0 10px"]}
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
      >
        <NavBarBox
          display={"flex"}
          pt={"24px"}
          pb={"13px"}
          justifyContent={"space-between"}
          borderBottom={showOnHeader ? "none" : props.line}
        >
          <FlexBox
            width={"100%"}
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Link href={"/"}>
              <Flex>
                <Logo>
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
                </Logo>
                <Typo fontSize={"1em"} fontWeight={500} mr={10}>
                  {"نیـــازمنــدی‌های هـمـشــــــهـری"}
                </Typo>
              </Flex>
            </Link>
            {token && (
              <LogOut onClick={(e) => dispatch(showLogoutModal(true))}>
                خروج
              </LogOut>
            )}
            {props.pro && (
              <Link href={"/"}>
                <Close>
                  <Image
                    src={"/icons/remove.svg"}
                    height={25}
                    width={25}
                    alt={"remove"}
                  />
                </Close>
              </Link>
            )}
          </FlexBox>
        </NavBarBox>
        {props.profilePage ? (
          tokens ? (
            <FlexRow id={"that"} key={"that"} mt={"auto"}>
              <FlexBoxRow flex={"1 1"} width={"100%"} mt={"5px"}>
                <Img height={"30px"} mr={0}>
                  <Image
                    src={"/icons/profile.svg"}
                    height={30}
                    width={30}
                    alt={"profile"}
                  />
                </Img>
                <div>
                  <div>حـسـاب شخــصـی</div>
                  <Name>
                    {name && lastname
                      ? `${name} ${lastname} عزیز`
                      : "کاربر همشهری"}
                  </Name>
                </div>
                {condition ? (
                  <ProfileShortage onClick={() => setShortageModal(true)}>
                    تکمیل پروفایل
                  </ProfileShortage>
                ) : (
                  <EditProfile onClick={() => setEditModal(true)}>
                    ویـرایش
                  </EditProfile>
                )}
              </FlexBoxRow>
              <div>
                {roles && roles.length > 1 && roles.length !== 0 && (
                  <>
                    {roles?.includes("businessOwner") && (
                      <FlexBoxOptionSubmit
                        action={"https://beta.rahnama.com/panels/menu"}
                        method={"post"}
                        display={"flex"}
                      >
                        <FormToBeta>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={`${mobile}`}
                          />
                          <input
                            type="text"
                            id="token"
                            name="token"
                            value={`${token}`}
                          />
                        </FormToBeta>
                        <ImgButton type={"submit"} className={"panels"}>
                          فـروشـگاهـی
                        </ImgButton>
                      </FlexBoxOptionSubmit>
                    )}
                    {roles?.includes("marketer") && (
                      <FlexBoxOptionSubmit
                        action={"https://beta.rahnama.com/marketers/menu"}
                        method={"post"}
                        display={"flex"}
                      >
                        <FormToBeta>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={`${mobile}`}
                          />
                          <input
                            type="text"
                            id="token"
                            name="token"
                            value={`${token}`}
                          />
                        </FormToBeta>
                        <ImgButton type={"submit"} className={"panels"}>
                          مشـاور
                        </ImgButton>
                      </FlexBoxOptionSubmit>
                    )}
                  </>
                )}
              </div>
            </FlexRow>
          ) : (
            <FlexRow flex={"1 1"} id={"this"} key={"this"} mt={"auto"}>
              <FlexBox flex={"1 1"}>
                <Img mr={0}>
                  <Image
                    src={"/icons/profile.svg"}
                    height={30}
                    width={30}
                    alt={"profile"}
                  />
                </Img>
                <div>کاربر همشهری</div>
              </FlexBox>
              <Button onClick={(e) => dispatch(showLoginModal(true))}>
                ورود و ثبت نام
              </Button>
            </FlexRow>
          )
        ) : (
          ""
        )}
      </Container>
      {props.profilePage ? (
        <SubtleLogo display={["block", "none"]}>
          <Image
            height={130}
            width={110}
            src={"/icons/white-he-profile.svg"}
            alt={"profile"}
          />
        </SubtleLogo>
      ) : null}
      <ProfileShortageModal
        setEdit={setEdit}
        setShortageModal={setShortageModal}
        shortage={shortage}
      />
      <EditProfileModal setEditModal={setEditModal} editModal={editModal} />
    </Bar>
  );
};
