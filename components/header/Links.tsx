import React from "react";
import styled from "styled-components";
import {
  color,
  layout,
  flex,
  flexbox,
  border,
  space,
  typography,
  FlexboxProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
  borderColor,
} from "styled-system";
import Image from "next/image";
import InitialLogIn from "../log in/InitialLogIn";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showLoginModal, showLogoutModal } from "@/store/pageConfig";
import { getCV } from "@/requests/cv";

const Box = styled.div<FlexboxProps | LayoutProps | ColorProps>`
  display: flex;
  flex: 1 1 100%;
  z-index: 10;
  & > div {
    min-width: fit-content;
  }
  @media (max-width: 870px) {
    display: none;
  }

  ${flexbox}
  ${layout}
    ${color}
`;

const ButtonTextLink = styled.span<any | LayoutProps | FlexboxProps>`
  font-size: 14px;
  font-weight: 500;
  font-family: dana;
  margin-right: 5px;
  display: flex;
  align-items: center;

  & > div {
    text-align: right;
    font-size: 12px;
  }

  &:before {
    content: "|";
    margin-left: 15px;
    margin-top: 5px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
  @media (min-width: 1024px) {
    &.addads {
      width: auto !important;
    }
  }
  @media (max-width: 1024px) {
    &.profile {
      display: none;
    }
  }
  ${layout}
  ${flexbox}
`;

const Img = styled.div<FlexboxProps | LayoutProps | ColorProps>`
  border-radius: 17px;
  width: 28px;
  height: 28px;
  @media (max-width: 1400px) {
    &.big {
      display: none;
    }
  }
  ${layout} ${color} ${flex}${typography} ${flexbox} ${border} ${space}
`;
const TextLink = styled("span")<any>(
  {
    fontFamily: "dana",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 400,
    position: "relative",
    fontStretch: "extra-expanded",
    flex: "1 1 100%",
    maxWidth: "fit-content",
  },
  space,
  typography,
  flex,
  flexbox,
  layout,
  color
);

interface Props {
  button: string;
  logo: boolean;
  color: string;
  profile: boolean;
  mainPage: boolean;
  route?: string;
}
const ProPro = styled.div`
  position: relative;
`;
const ProResIco = styled.div<SpaceProps>`
  height: 30px;
  width: 30px;
  display: none;
  position: relative;
  cursor: pointer;
  @media (max-width: 1400px) {
    display: block;
  }
  ${space}
`;
const LeftLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  & .managerLink {
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;
const Button = styled("div")<any>(
  {
    backdropFilter: "blur",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    padding: "7px 15.4px 7px 16px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(245,246,250,24%)",
    maxWidth: "fit-content",
    borderRadius: "14px",
    cursor: "pointer",
    "@media(max-width:1200px)": {
      padding: "0px",
    },
  },
  layout,
  color,
  flex,
  typography,
  borderColor,
  flexbox,
  border,
  space
);

const Links: React.FC<Props> = (props) => {
  const token = Cookies.get("token");
  const { roles: role } = useAppSelector((state) => state.sign);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathName = router.pathname;
  const roleName = role == 2 ? "کارجو" : "کارفرما";
  const loginHandler = () => {
    token ? router.push("/user") : router.push("/login");
  };
  const handlecvBuilder = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const token = Cookies.get("token");
    if (!token) {
      event.preventDefault();
      dispatch(showLoginModal(true));
    }
    const res = await getCV(token!);
    if (token && res.data !== null) {
      router.push("/user/my-resume");
    }
  };
  const TextLinkPro = ({
    logo,
    mainPage,
  }: {
    logo: boolean;
    onClick: any;
    mainPage: boolean;
  }) => {
    return (
      <ProPro>
        <TextLink
          color={props.color}
          display={"flex"}
          alignItems={"center"}
          textAlign={["center", "center", "center", "left"]}
          mr={"10px"}
          onClick={loginHandler}
        >
          <Img className={"big"}>
            {logo ? (
              <Image
                src={"/icons/Iconly_Curved_Profile.svg"}
                width={26}
                height={26}
                className={"icon"}
                alt="پروفایل"
              />
            ) : (
              <Image
                src={"/icons/black avatar.svg"}
                width={26}
                height={26}
                className={"icon"}
                alt="پروفایل"
              />
            )}
          </Img>
          <ProResIco>
            {/* {pathName !== "/login" ? (
              <ButtonTextLink className={"profile"} width={"145px"}>
                {token ? (
                  <div onClick={() => router.push("/user")}>{roleName}</div>
                ) : (
                  <div onClick={loginHandler}>ورود و ثبت نام</div>
                )}
              </ButtonTextLink>
            ) : null}
            {mainPage ? (
              <Image
                alt="Group"
                src={"/icons/Group 1610.svg"}
                height={30}
                width={30}
              />
            ) : (
              <Image
                alt="پروفایل"
                src={"/icons/profile-avatar.svg"}
                height={30}
                width={30}
              />
            )} */}
          </ProResIco>
          {pathName !== "/login" ? (
            <ButtonTextLink className={"profile"} width={"145px"}>
              {token ? <div>{roleName}</div> : <div>ورود و ثبت نام</div>}
            </ButtonTextLink>
          ) : null}
        </TextLink>
        {isToggle && (
          <InitialLogIn isToggle={isToggle} closeSmallModal={closeModal} />
        )}
      </ProPro>
    );
  };

  const [isToggle, setToggle] = useState(false);

  const closeModal = () => {
    setToggle(!isToggle);
  };
  if (role == 1 && token) {
    return (
      <Box
        flex={["1 1", "1 1", "1 1", "1 1"]}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"space-evenly"}
        color={"white"}
      >
        <Link href={"/wizard"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"ثبت آگهی جدید"}
          </TextLink>
        </Link>
        <Link href={"/user"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"لیست آگهی ها"}
          </TextLink>
        </Link>
        <Link href={"/resumeBank"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"بانک رزومه"}
          </TextLink>
        </Link>
        <Link href={"/salary-calculation"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"محاسبه حقوق دستمزد"}
          </TextLink>
        </Link>
        <LeftLinks>
          <TextLinkPro
            logo={props.logo}
            onClick={() => setToggle(!isToggle)}
            mainPage={props.mainPage}
          />
          <Button
            color={props.color}
            onClick={() => dispatch(showLogoutModal(true))}
            borderRadius={"12px"}
            height={40}
            minWidth={68}
            textAlign={"center"}
            justifyContent={"center"}
          >
            خروج
          </Button>
        </LeftLinks>
      </Box>
    );
  }
  if (role == 2 && token) {
    return (
      <Box
        flex={["1 1", "1 1", "1 1", "1 1"]}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"space-evenly"}
        color={"white"}
      >
        <Link href={"/jobs"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"فرصت های شغلی"}
          </TextLink>
        </Link>
        <Link href={"/cv-builder"} passHref>
          <TextLink
            onClick={handlecvBuilder}
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"رزومه ساز"}
          </TextLink>
        </Link>
        <Link href={"/companies"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"معرفی شرکت ها"}
          </TextLink>
        </Link>
        <Link href={"/salary-calculation"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"محاسبه حقوق دستمزد"}
          </TextLink>
        </Link>
        <LeftLinks>
          <TextLinkPro
            logo={props.logo}
            onClick={() => setToggle(!isToggle)}
            mainPage={props.mainPage}
          />
          <Button
            color={props.color}
            onClick={() => dispatch(showLogoutModal(true))}
            borderRadius={"12px"}
            height={40}
            minWidth={68}
            textAlign={"center"}
            justifyContent={"center"}
          >
            خروج
          </Button>
        </LeftLinks>
      </Box>
    );
  }

  return (
    <Box
      flex={["1 1", "1 1", "1 1", "1 1"]}
      alignItems={"center"}
      display={"flex"}
      justifyContent={"space-evenly"}
      color={"white"}
    >
      <Link href={"/jobs"} passHref>
        <TextLink
          color={props.color}
          textAlign={["center", "center", "center", "left"]}
          mr={"10px"}
        >
          {"فرصت های شغلی"}
        </TextLink>
      </Link>
      {props.route !== "/employer" && (
        <Link href={"/cv-builder"} passHref>
          <TextLink
            onClick={handlecvBuilder}
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"رزومه ساز"}
          </TextLink>
        </Link>
      )}

      <Link href={"/companies"} passHref>
        <TextLink
          color={props.color}
          textAlign={["center", "center", "center", "left"]}
          mr={"10px"}
        >
          {"معرفی شرکت ها"}
        </TextLink>
      </Link>
      {props.route === "/employer" && (
        <Link href={"/resumeBank"} passHref>
          <TextLink
            onClick={handlecvBuilder}
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"بانک رزومه"}
          </TextLink>
        </Link>
      )}
      {props.route === "/employer" && (
        <Link href={"/salary-calculation"} passHref>
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {"محاسبه حقوق دستمزد"}
          </TextLink>
        </Link>
      )}

      <LeftLinks>
        <TextLinkPro
          logo={props.logo}
          onClick={() => setToggle(!isToggle)}
          mainPage={props.mainPage}
        />
        <Link
          className="managerLink"
          href={props.route === "/employer" ? "/" : "/employer"}
          passHref
        >
          <TextLink
            color={props.color}
            textAlign={["center", "center", "center", "left"]}
            mr={"10px"}
          >
            {props.route === "/employer" ? "کارجویان" : "کارفرمایان"}
          </TextLink>
        </Link>
      </LeftLinks>
    </Box>
  );
};
export default Links;
