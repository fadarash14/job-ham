import Image from "next/image";
import styled from "styled-components";
import {
  backgroundColor,
  border,
  borderBottom,
  BorderProps,
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showLogoutModal, showSupportModal } from "../../store/pageConfig";

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

export default function ManagerSideBarContext({
  activePath,
  onClose,
  token,
}: Props) {
  const dispatch = useAppDispatch();
  const myCompanies = useAppSelector((state) => state.companyInfo.data);
  return (
    <>
      <Section>
        <Li>
          <Link href="/user" onClick={onClose}>
            <ListInside className={activePath == "/user" ? "active" : ""}>
              <Image
                src={"/icons/adsList.svg"}
                height={30}
                width={30}
                alt="Group 1610"
              />
              <SideTitle>لیست آگهی ها</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt="لیست آگهی ها"
              />
            </ListInside>
          </Link>
        </Li>
        <Li>
          <Link href="/wizard" onClick={onClose}>
            <ListInside className={activePath == "/wizard" ? "active" : ""}>
              <Image src={"/icons/newAds.svg"} height={30} width={30} alt="" />
              <SideTitle>ایجاد آگهی استخدام</SideTitle>
              <Image
                src={"/icons/Pointer.svg"}
                height={12}
                width={12}
                className={"pointer"}
                alt=""
              />
            </ListInside>
          </Link>
        </Li>
        {myCompanies.length > 1 && (
          <Li>
            <Link href="/login/verifyCompany" onClick={onClose}>
              <ListInside
                className={activePath == "/login/verifyCompany" ? "active" : ""}
              >
                <Image
                  src={"/icons/Group 7974.svg"}
                  height={30}
                  width={30}
                  alt=""
                />
                <SideTitle>تغییر شرکت</SideTitle>
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
        )}

        <Li>
          <Link href="/user/profile/invoicehistory" onClick={onClose}>
            <ListInside
              className={
                activePath == "/user/profile/invoicehistory" ? "active" : ""
              }
            >
              <Image
                src={"/icons/resumeFolder.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>پوشه های رزومه</SideTitle>
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
          <Link href="/resumeBank" onClick={onClose}>
            <ListInside className={activePath == "/resumeBank" ? "active" : ""}>
              <Image
                src={"/icons/resumeBank.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>بانک رزومه </SideTitle>
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
          <Link href="/user/company-profile" onClick={onClose}>
            <ListInside
              className={activePath == "/user/company-profile" ? "active" : ""}
            >
              <Image
                src={"/icons/companyProfile.svg"}
                height={30}
                width={30}
                alt=""
              />
              <SideTitle>پروفایل شرکت</SideTitle>
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
        {/* <Li>
          <Link href="/tariff"  onClick={onClose} >
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
          <Link href="/user/pw" onClick={onClose}>
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
          <Link href="/jobs"  onClick={onClose} >
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
        <Li onClick={() => dispatch(showSupportModal(true))}>
          <ListInside className={activePath == "/support" ? "active" : ""}>
            <Image
              src={"/icons/SupportIcon.svg"}
              height={30}
              width={30}
              alt="supports"
            />
            {/*<Link href="/support">*/}
            <SideTitle>پشتیبانی</SideTitle>
            {/*</Link>*/}
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
    </>
  );
}
