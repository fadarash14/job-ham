import { AllCvData, Company, IAdJob, Option, Post } from "@/types";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  fontWeight,
  fontSize,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  FontSizeProps,
  color,
  ColorProps,
  border,
  backgroundColor,
  BorderProps,
  flexDirection,
  justifyContent,
  alignItems,
  FlexDirectionProps,
  JustifyContentProps,
  AlignItemsProps,
  width,
  WidthProps,
  FlexWrapProps,
  flexWrap,
} from "styled-system";
import Link from "next/link";
import Location from "../../public/icons/Location.svg";
import moment from "jalali-moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showLoginModal } from "@/store/pageConfig";
import { sendCvToCompany } from "@/requests/cv";
import cv from "@/store/cv";
import SubmitMessage from "../utility/SubmitMessage";
import AdsRandomError from "../addWizard/AdsRandomError";
import Cookies from "js-cookie";
import { setSingleId } from "@/store/cvList";

interface Props {
  post: IAdJob;
  faveWizard?: Function;
  isLogged: boolean;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 90vh;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Header = styled.div`
  color: #474546;
  padding: 10px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  // display: -webkit-box;
  max-width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.2s ease;
  .company-name:hover {
    text-decoration: underline;
    color: #fba303;
    transition: all 0.2s ease;
  }
`;

const Where = styled.label`
  color: black;
  margin-right: 5px;
  font-size: 12px;
`;

const Main1 = styled.div<LayoutProps | SpaceProps>`
  display: flex;
  align-items: center;
  margin-top: 5px;
  ${space}
  ${layout}
`;

const Icons = styled.div<SpaceProps>`
  height: 25px;
  ${space}
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
  ${color}
`;
const Buttons = styled.div`
  display: flex;
  margin: 15px;
`;
const Img = styled.div`
  cursor: pointer;
  height: 30px;
`;
const SendResume = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #1abc9c;
  // border-radius: 12px;
  color: white;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  min-width: 154px;
  height: 33px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: none;
  & > span {
    font-size: 12px;
    font-weight: 500;
  }
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Typography = styled.p<SpaceProps>`
  margin: 0;
  color: #474546;
  ${space}
`;

const Divider = styled.div`
  height: 1px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  background: #d5d5d5;
`;
const TitleText = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
`;
const ContentText = styled(Typography)`
  white-space: nowrap;
  font-size: 16px;
`;
const Stack = styled.div<
  | FlexDirectionProps
  | WidthProps
  | JustifyContentProps
  | AlignItemsProps
  | SpaceProps
  | FlexWrapProps
>`
  display: flex;
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
${alignItems}
${space}
${width}
`;
const IconTitle = styled.div<SpaceProps>`
  display: flex;
  align-items: center;
  /* margin-bottom: 8.5px; */
  > *:last-child {
    margin-right: 8.5px;
  }
  ${space}
`;
const BoxText = styled(Typography)`
  color: #676666;
  display: inline-block;
  border: 1px solid #d5d5d5;
  font-size: 14px;
  min-width: 97px;
  max-width: fit-content;
  text-align: center;
  border-radius: 6px;
  padding: 0px 6px;
  white-space: normal;
  background: white;
`;
const DescriptionText = styled(BoxText)`
  font-size: 14px;
  min-width: 100%;
  // height: 90px;
  text-align: justify;
  line-height: 1.8;
  padding: 8px;
  border-radius: 18px;
`;
const Icon = styled.span`
  font-size: 16px;
  ${(props: { size?: "small" | "big" }) =>
    props.size === "small" &&
    css`
      font-size: 12px;
    `}

  ${(props: { size?: "small" | "big" }) =>
    props.size === "big" &&
    css`
      font-size: 24px;
    `}
`;
const Descript = styled.div`
  color: #474546;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const InstantBadge = styled.span`
  background: #fcc155;
  padding: 0.5px 11.6px 0.5px 11.5px;
  border-radius: 8px;
  line-height: 18px;
  height: 18px;
  color: black;
`;
const dictionary = (val: keyof typeof changer): string => {
  const changer: Record<string, string> = {
    typeCooperationId: "نوع همکاری",
    workHour: "روز و ساعت کاری",
    businessTrips: "سفرهای کاری",
    salaryId: "حقوق",
    advantageId: "مزایا و تسهیلات",
    jobDescription: "شرح شغل",
    description: "درباره شرکت",
    industryId: "صنعت",
    sizeCompanyId: "اندازه سازمان",
    typeOwnerShipId: "نوع مالکیت",
    typeActivityCompanyId: "نوع فعالیت",
    establishedYear: "سال تاسیس",
    descriptionServices: "محصولات و خدمات",
    skillDescription: "مهارت های مورد نیاز",
    sexId: "جنسیت",
    experienceId: "حداقل سابقه کار",
    fieldStudyId: "رشته تحصیلی",
    gradeId: "حداقل مدرک تحصیلی",
    languages: "زبان",
    ageMinId: "حداقل سن متقاضی",
    ageMaxId: "حداکثر سن متقاضی",
  };
  return changer[val] || "";
};

const Field = ({
  title,
  icon,
  value,
  multiple = false,
}: {
  title: string;
  icon: any;
  value: string | string[] | undefined;
  multiple?: boolean;
}) => {
  return (
    <Stack mt={10.5} ml={4} flexDirection={"column"}>
      <IconTitle mb={8.5}>
        <Image src={`/${icon}`} width={16} height={16} alt="icon" />
        <ContentText>{dictionary(title)}</ContentText>
      </IconTitle>
      {multiple && Array.isArray(value) ? (
        value?.map((v, index: number) => {
          return <BoxText key={index}>{v}</BoxText>;
        })
      ) : typeof value === "string" ? (
        <BoxText>{value}</BoxText>
      ) : (
        <BoxText>{"ندارد"}</BoxText>
      )}
    </Stack>
  );
};

export default function JobDetails(props: Props) {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"success" | "fail" | "pending" | "">("");
  moment.locale("fa");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const invisible_icon = ["/user/profile/marks"];
  let hide_fav_icon = invisible_icon.find((i) => router.pathname.startsWith(i));
  const { baseInfo } = useAppSelector(
    // @ts-ignore
    (state) => state.cvInfo
  ) as AllCvData;
  //@ts-ignore
  const { idList } = useAppSelector((state) => state.cvList) as {
    idList: string[];
  };

  const SendResumeHandler = async () => {
    setShowModal(true);
    setStatus("pending");
    const { id: cv_id } = baseInfo;
    const adv_id = parseInt(props.post.id);
    const company_id = parseInt(props.post.company.id);
    const token = Cookies.get("token")!;
    const response = await sendCvToCompany(
      parseInt(cv_id),
      company_id,
      adv_id,
      token
    );
    console.log(response);
    if (!response.errorCode) {
      setMessage("درخواست شما با موفقیت ارسال شد");
      dispatch(setSingleId(props.post.id));
      setStatus("success");
      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        setStatus("");
      }, 2000);
    } else {
      setStatus("fail");
    }
  };
  const sendStatus = idList.includes(props.post.id)
    ? { active: false, message: "رزومه ارسال شده است" }
    : { active: true, message: "ارسال رزومه" };
  const onClickHandler = () => {
    const setError = () => {
      setMessage("رزومه شما قبلا ارسال شده است.");
      setStatus("fail");
      setShowModal(true);
    };
    !props.isLogged
      ? dispatch(showLoginModal(true))
      : sendStatus.active
      ? SendResumeHandler()
      : setError();
  };
  const renderSubmitButton = () => {
    return (
      <SendResume
        onClick={onClickHandler}
        disabled={!sendStatus.active}
        className="sendResume"
        backgroundColor={sendStatus.active ? "green" : "very_light_pink"}
      >
        <Span fontSize={16} fontWeight={600}>
          {sendStatus.message}
        </Span>
      </SendResume>
    );
  };

  return (
    <Card>
      <Box>
        <Header>
          <Span
            color={"#474546"}
            marginBottom={"15px"}
            fontSize={20}
            fontWeight={600}
          >
            {props.post.jobTitle}
          </Span>

          <div>
            <div>
              <Link href={`/companies/${props.post.company.id} `}>
                <Span
                  className="company-name"
                  dir="rtl"
                >{`${props.post.company.nameCompany}`}</Span>
              </Link>
              <Span dir="rtl" fontWeight={400} fontSize={14}>
                -{" "}
                {moment(
                  String(props.post?.releasedAt).length < 11
                    ? props.post?.releasedAt * 1000
                    : props.post?.releasedAt
                ).fromNow()}
              </Span>
            </div>
            {props.post?.releasedAt && (
              <Descript className="description">
                <Main1>
                  {/* {instant && (
                    <InstantBadge>{`${t("wizard.instant")}`}</InstantBadge>
                  )} */}
                  {hide_fav_icon && props.faveWizard && (
                    <Main1 height={"25px"} mr={"auto"}>
                      <Icons
                        mr={"5px"}
                        onClick={(e) => {
                          e.preventDefault();
                          if (props.faveWizard)
                            props.faveWizard(props.post?.id);
                        }}
                      >
                        <Image
                          width={25}
                          height={25}
                          src={"/icons/save_done.svg"}
                          alt="saved"
                        />
                      </Icons>
                    </Main1>
                  )}
                </Main1>
              </Descript>
            )}
            <Main1>
              <Image
                src={"/icons/Location.svg"}
                alt="location"
                width={12}
                height={12}
              />
              <Where>
                <Span fontWeight={400} fontSize={14}>
                  {props.post.areaString
                    ? props.post.areaString.replace("/", "،")
                    : props.post.cityName}
                </Span>
              </Where>
            </Main1>
          </div>
        </Header>
        <Buttons>
          <Img>
            <Image
              src={"/icons/sharing.svg"}
              alt="اشتراک گذاشتن"
              width={30}
              height={30}
            />
          </Img>
          {renderSubmitButton()}
        </Buttons>
      </Box>
      <Divider />
      <BoxContent>
        <IconTitle>
          <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
          <TitleText>اطلاعات شغلی</TitleText>
        </IconTitle>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Field
            value={props.post.typeCooperationId?.title}
            title={"typeCooperationId"}
            icon={"icons/Type of cooperation.svg"}
          />
          <Field
            value={props.post.workDay}
            title={"workHour"}
            icon={"icons/Day and Time.svg"}
          />
          {/* I dont find it from data in backend */}
          <Field
            value={undefined}
            title={"businessTrips"}
            icon={"icons/business trips.svg"}
          />
          <Field
            value={props.post.salaryId?.title}
            title={"salaryId"}
            icon={"icons/salary.svg"}
          />

          <Field
            multiple
            //@ts-ignore
            value={props.post.advantageIds.map((item: Option) => item?.title)}
            title={"advantageId"}
            icon={"icons/Facilities.svg"}
          />
        </Stack>

        <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
          <IconTitle mb={8.5}>
            <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
            <TitleText>{dictionary("jobDescription")}</TitleText>
          </IconTitle>
          <DescriptionText>{props.post.jobDescription}</DescriptionText>
        </Stack>
        <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
          <IconTitle mb={8.5}>
            <Image
              src={"/icons/About Company.svg"}
              alt="aboutCompany"
              width={19}
              height={19}
            />
            <TitleText>{dictionary("description")}</TitleText>
          </IconTitle>
          <DescriptionText>{props.post.company.description}</DescriptionText>
        </Stack>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Field
            //@ts-ignore
            value={props.post.company.industryId.title}
            title={"industryId"}
            icon={"icons/Industry.svg"}
          />
          <Field
            //@ts-ignore
            value={props.post.company.sizeCompanyId.title}
            title={"sizeCompanyId"}
            icon={"icons/Organization Size.svg"}
          />
          <Field
            //@ts-ignore
            value={props.post.company.typeOwnerShipId.title}
            title={"typeOwnerShipId"}
            icon={"icons/Ownership.svg"}
          />
          <Field
            //@ts-ignore
            value={props.post.company.typeActivityCompanyId.title}
            title={"typeActivityCompanyId"}
            icon={"icons/Type of Activity.svg"}
          />
          <Field
            //@ts-ignore
            value={props.post.company.establishedYear}
            title={"establishedYear"}
            icon={"icons/Established year.svg"}
          />
        </Stack>
        <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
          <IconTitle mb={8.5}>
            <Image
              src={"/icons/Skill_02.svg"}
              alt="skillDescription"
              width={19}
              height={19}
            />
            <TitleText>{dictionary("descriptionServices")}</TitleText>
          </IconTitle>
          <DescriptionText>
            {props.post.company.descriptionServices}
          </DescriptionText>
        </Stack>
        <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
          <IconTitle mb={8.5}>
            <Image
              src={"/icons/Skill_1.svg"}
              alt="skillDescription"
              width={19}
              height={19}
            />
            <TitleText>{dictionary("skillDescription")}</TitleText>
          </IconTitle>
          <DescriptionText>{props.post.skillDescription}</DescriptionText>
        </Stack>
        <IconTitle mt={25.75}>
          <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
          <TitleText>احراز شغلی</TitleText>
        </IconTitle>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Field
            value={props.post.sexId?.title}
            title={"sexId"}
            icon={"icons/Gender.svg"}
          />
          <Field
            value={props.post.experienceId?.title}
            title={"experienceId"}
            icon={"icons/work experience.svg"}
          />
          <Field
            value={props.post.fieldStudyId?.title}
            title={"fieldStudyId"}
            icon={"icons/Education.svg"}
          />
          <Field
            value={props.post.gradeId?.title}
            title={"gradeId"}
            icon={"icons/Degree.svg"}
          />
          <Field
            multiple
            //@ts-ignore
            value={props.post.languages.map((item: Option) => item?.label)}
            title={"languages"}
            icon={"icons/Language.svg"}
          />
          <Field
            value={props.post.ageMaxId?.title}
            title={"ageMinId"}
            icon={"icons/Age.svg"}
          />
          <Field
            value={props.post.ageMinId?.title}
            title={"ageMaxId"}
            icon={"icons/Age.svg"}
          />
        </Stack>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Field
            multiple
            //@ts-ignore
            value={props.post.skills.map((item: Option) => item?.label)}
            title={"skillDescription"}
            icon={"icons/Skill_02.svg"}
          />
        </Stack>
      </BoxContent>
      {showModal && (
        <SubmitMessage
          status={status}
          message={message}
          setShow={setShowModal}
        />
      )}
    </Card>
  );
}
