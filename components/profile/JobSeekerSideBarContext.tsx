import Image from "next/image";
import styled from "styled-components";
import {
  borderBottom,
  BorderProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  showLoginModal,
  showLogoutModal,
  showSupportModal,
} from "../../store/pageConfig";
import { getCV } from "@/requests/cv";
import { setMyCv } from "@/store/cv";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "../Toast/Toast";
type Props = {
  activePath: string;
  token?: string;
  onClose: () => void;
};

const Section = styled.ul<TypographyProps | SpaceProps>`
  list-style-type: none;
  background-color: rgba(245, 246, 250, 0.4);
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 20px;
  ${typography}
  ${space}
`;
const Li = styled.li<BorderProps>`
  padding: 5px 0px;
  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: rgb(231, 231, 232);
    margin-top: 10px;
  }
  ${borderBottom}
`;
const ListInside = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 8px;
  cursor: pointer;
  .pointer {
    opacity: 0;
  }
  &:hover {
    background-color: RGBA(219, 20, 61, 5%);
    border-radius: 15px;
    .pointer {
      opacity: 1;
    }
  }
  &.active {
    background-color: RGBA(219, 20, 61, 5%);
    border-radius: 15px;
    .pointer {
      opacity: 1;
    }
  }
`;
const SideTitle = styled.div`
  color: RGB(71, 69, 70);
  padding-right: 12px;
  margin-left: auto;
`;

export default function JobSeekerSideBarContext({
  activePath,
  onClose,
  token,
}: Props) {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleMYResumeRoute = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    getCV(token!).then((result) => {
      if (result.data !== null) {
        dispatch(setMyCv(result.data));
        router.push("/user/my-resume");
      } else {
        router.push("/cv-builder");
      }
    });
  };
  return (
    <>
      <Section>
        <Li>
          <Link href="/user" onClick={onClose}>
            <ListInside className={activePath == "/user" ? "active" : ""}>
              <Image
                src={"/icons/SentResumes.svg"}
                height={30}
                width={30}
                alt="SentResumes"
              />
              <SideTitle>رزومه های ارسال شده</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="رزومه های ارسال شده"
              />
            </ListInside>
          </Link>
        </Li>
        {/* <Li>
          <Link href="/user/profile/marks">
            <ListInside
              className={
                activePath == "/user/profile/marks" ? "active" : ""
              }
            >
              <Image
                src={"/icons/suggestJobs.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>مشاغل پیشنهادی</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li> */}
        <Li>
          <Link href="/salaryAndIncome" onClick={onClose}>
            <ListInside
              className={activePath == "/salaryAndIncome" ? "active" : ""}
            >
              <Image
                src={"/icons/salaryAndIncome.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>حقوق دستمزد</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li>
        <Li>
          <Link href="/companies" onClick={onClose}>
            <ListInside className={activePath == "/companies" ? "active" : ""}>
              <Image
                src={"/icons/companies.svg"}
                height={30}
                width={30}
                alt="jobs"
              />
              <SideTitle>معرفی شرکت ها</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li>
        {/* <Li>
          <Link href="/user/favorites">
            <ListInside
              className={activePath == "/user/favorites" ? "active" : ""}
            >
              <Image
                src={"/icons/MarkedJobs.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>مشاغل نشان شده</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li> */}

        <Li>
          <Link href="/user/my-resume" onClick={onClose}>
            <ListInside
              onClick={handleMYResumeRoute}
              className={activePath == "/user/my-resume" ? "active" : ""}
            >
              <Image
                src={"/icons/myResume.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>رزومه من</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li>

        <Li>
          <Link shallow href="/user/pw" onClick={onClose}>
            <ListInside className={activePath == "/user/pw" ? "active" : ""}>
              <Image
                src={"/icons/PasswordIcon.svg"}
                height={30}
                width={30}
                alt="messages"
              />
              <SideTitle>رمز عبور</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="messages"
              />
            </ListInside>
          </Link>
        </Li>
      </Section>

      <Section>
        {/* <Li>
          <Link href="/employer">
            <ListInside
              className={activePath == "/employer" ? "active" : ""}
            >
              <Image
                src={"/icons/Group 1610.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>بخش کارفرمایان</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li> */}
        <Li>
          <Link href="/jobs" onClick={onClose}>
            <ListInside className={activePath == "/jobs" ? "active" : ""}>
              <Image
                src={"/icons/newestJobs.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>جدیدترین مشاغل</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=" "
              />
            </ListInside>
          </Link>
        </Li>
        {/* <Li>
          <Link href="/tariff">
            <ListInside
              className={activePath == "/tariff" ? "active" : ""}
            >
              <Image
                src={"/icons/TariffsIcon.svg"}
                height={30}
                width={30}
                alt="jobs"
              />
              <SideTitle>تنظیمات حساب کاربری</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="jobs"
              />
            </ListInside>
          </Link>
        </Li> */}
        <Li>
          <Link href="/rules" onClick={onClose}>
            <ListInside className={activePath == "/rules" ? "active" : ""}>
              <Image
                src={"/icons/RuleIcon.svg"}
                height={30}
                width={30}
                alt="rules"
              />
              <SideTitle>قوانین و مقررات</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="rules"
              />
            </ListInside>
          </Link>
        </Li>
        <Li>
          <Link href="/about" onClick={onClose}>
            <ListInside className={activePath == "/about" ? "active" : ""}>
              <Image
                src={"/icons/AboutIcon.svg"}
                height={30}
                width={30}
                alt="about"
              />
              <SideTitle>درباره همشهری</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="about"
              />
            </ListInside>
          </Link>
        </Li>
      </Section>
      <Section>
        <Li
          onClick={() => {
            dispatch(showSupportModal(true));
            onClose;
          }}
        >
          <ListInside className={activePath == "/support" ? "active" : ""}>
            <Image
              src={"/icons/SupportIcon.svg"}
              height={30}
              width={30}
              alt="supports"
            />
            <SideTitle>پشتیبانی</SideTitle>
            <Image
              src={"/icons/Pointer.svg"}
              height={12}
              width={12}
              className={"pointer"}
              alt="supports"
            />
          </ListInside>
        </Li>
        <Li
          onClick={() => {
            dispatch(showLogoutModal(true));
            onClose();
          }}
        >
          <ListInside className={activePath == "/support" ? "active" : ""}>
            <Image
              src={"/icons/logOut.svg"}
              height={30}
              width={30}
              alt="supports"
            />
            <SideTitle>خروج</SideTitle>
            <Image
              src={"/icons/logOut.svg"}
              height={12}
              width={12}
              className={"pointer"}
              alt="supports"
            />
          </ListInside>
        </Li>
      </Section>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </>
  );
}
