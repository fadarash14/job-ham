import React, { useState } from "react";
import styled from "styled-components";
import {
  LayoutProps,
  SpaceProps,
  space,
  layout,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
  color,
  fontSize,
  fontWeight,
  BorderProps,
  border,
  flex,
  flexDirection,
  FlexDirectionProps,
  PositionProps,
  position,
} from "styled-system";
import Address from "@/components/utility/Address";
import { useRouter } from "next/router";
import cookie from "cookie";
import Image from "next/image";
import {
  _BasicInfo,
  _CoursesInfo,
  _EducationalInfo,
  _JobRecords,
  _LanguagesInfo,
  _ResearchesInfo,
  _SkillsInfo,
} from "@/mock/_panel";
import Checkbox from "@/components/utility/CheckBox";
import Footer from "@/components/footer/Footer";
import ProfileTopBar from "@/components/profile/ProfileTopBar";
import ResumeStatus from "@/components/profile/ResumeStatus";
import PersonalResume from "@/components/profile/PersonalResume";
import AdditionalParts from "@/components/profile/AdditionalParts";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setLevel, setEdited } from "@/store/cv";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getCV, getFileResume } from "@/requests/cv";
import { convertCv } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  BaseInfo,
  Completeness,
  DegreesInfo,
  EducationalInfo,
  JobExperiences,
  LanguagesInfo,
  ResearchesInfo,
  SkillsInfo,
} from "../../../types";
import UploadProfile from "@/components/cv/UploadProfile";
type Sections =
  | "basicInfo"
  | "jobRecords"
  | "educationalInfo"
  | "languagesInfo"
  | "degreesInfo"
  | "skillsInfo"
  | "researchesInfo";

const BoxLayout = styled((props) => <Box {...props} />)<
  PositionProps | ColorProps
>(position, color);

const Box = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AddressWrapper = styled.div<LayoutProps | SpaceProps>`
  width: 90%;
  margin: 0 auto;
`;
const MainContent = styled.main`
  flex-grow: 1;
  max-height: 100vh;
  overflow: auto;
  @media (max-width: 768px) {
    max-height: initial;
    overflow: initial;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  white-space: nowrap;
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
const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid #d1d1d1;
  height: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
  position: relative;
  .edit {
    position: absolute;
    top: 20px;
    left: 0;
    cursor: pointer;
  }
  .plus {
    position: absolute;
    top: 20px;
    left: 25px;
    cursor: pointer;
  }
`;
const Section = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const Img = styled.div<SpaceProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  ${space}
`;
const Row = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  display: flex;
  margin: 10px 0px;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  /* @media (max-width: 870px) {
    flex-wrap: wrap;
  } */

  ${space}
  ${layout}
  ${flexDirection}
`;

const RowInside = styled(Row)`
  @media only screen and (max-width: 768px) {
    /* border: 2px solid red; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > :nth-child(odd):last-child {
      grid-column: 1 / -1;
    }
    @media only screen and (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }
`;
const InputParent = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  display: flex;
  flex-direction: row;
  padding: 4px;
  margin: 4px 10px;
  flex-grow: 1;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    min-height: 40px;
    font-size: 13px;
    margin: 2px 5px;
  }
  ${space}
  ${layout}
  ${flexDirection}
`;
const Div = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  ${space}
  ${layout}
  ${flex}
  ${flexDirection}
`;
const Label = styled.label<
  { showIcon?: boolean } & FontSizeProps &
    FontWeightProps &
    SpaceProps &
    LayoutProps &
    ColorProps
>`
  &::before {
    content: ${({ showIcon }) =>
      showIcon ? `url('/icons/flash.svg')` : "none"};
    margin-left: 3px;
    display: inline-block;
    vertical-align: middle;
  }
  &::after {
    content: " : ";
  }
  text-align: right;
  color: #acacac;
  font-size: 14px;
  white-space: nowrap;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Content = styled.div<SpaceProps>`
  display: flex;
  flex-direction: row;
  width: 95%;
  margin-top: 16px;
  height: 100vh;
  min-height: 100vh;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
  ${space};
`;
const LeftSide = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Record = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
`;
const Explain = styled.textarea<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: white;
  min-height: 150px;
  min-width: 400px;
  flex: 1 1 90%;
  padding: 10px;
  outline: none;
  resize: none;
  -webkit-user-select: text; /* Chrome, Opera, Safari */
  -moz-user-select: text; /* Firefox 2+ */
  -ms-user-select: text; /* IE 10+ */
  user-select: text; /* Standard syntax */
  &:hover {
    border: 1px solid #acacac;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::placeholder {
    color: #acacac;
  }
  @media only screen and (max-width: 768px) {
    min-width: 100%;
    font-size: 13px;
  }

  ${border}
`;
const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
interface IState {
  baseInfo: BaseInfo;
  jobExperiences: JobExperiences;
  educationCourses: EducationalInfo;
  languages: LanguagesInfo;
  degrees: DegreesInfo;
  skills: SkillsInfo;
  projects: ResearchesInfo;
  completeness: Completeness;
}
type Props = {
  convertedData: IState;
};
export default function MyResume({ convertedData }: Props) {
  const [image, setImage] = useState(
    convertedData.baseInfo.pictureId ? convertedData.baseInfo.pictureId : ""
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    // baseInfo,
    // projects,
    // skills,
    // educationCourses,
    // languages,
    // degrees,
    // jobExperiences,
    completeness: { missed },
  } = useAppSelector((state) => state.cvInfo);
  const token: string = Cookies.get("token")!;

  const { data, isFetched } = useQuery({
    queryKey: ["myResume", token],
    queryFn: () => getCV(token),
    placeholderData: convertedData,
    select: (res) => {
      const newData: IState = convertCv(res.data);

      return newData;
    },
  });
  const { data: fileResume, isLoading } = useQuery({
    queryKey: ["fileResume", token],
    queryFn: () => getFileResume(token),
  });
  if (!isLoading) {
    console.log(fileResume);
  }
  const routeSectionHandler = (section: Sections) => {
    const sectionLevels = {
      basicInfo: 1,
      jobRecords: 2,
      educationalInfo: 3,
      languagesInfo: 4,
      degreesInfo: 5,
      skillsInfo: 6,
      researchesInfo: 7,
    };
    dispatch(setEdited(true));
    const level = sectionLevels[section];
    if (level !== undefined) {
      dispatch(setLevel(level));
    }
    router.push("/cv-builder");
  };

  const isEmpty = (value: string) => {
    const index = data?.completeness?.missed.findIndex((x) => x === value);
    if (index === -1) {
      return true;
    }
    return false;
  };
  // console.log(image);

  return (
    <BoxLayout
      p={["0"]}
      // bg={"white"}
      minHeight={"100vh"}
      position={"static"}
      display={"flex"}
      flexDirection={"column"}
    >
      <ProfileTopBar icon={"/icons/myResume.svg"} title={"رزومه من"} />
      <AddressWrapper>
        <Address address={router.pathname} />
      </AddressWrapper>
      {isFetched ? (
        <>
          <ResumeStatus completness={data?.completeness!} className="Mobile" />
          <Content>
            <MainContent>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      اطلاعات پایه
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("basicInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  <InputParent display={"flex"} flexDirection={"row"}>
                    <Img marginX={"10px"}>
                      {/* {data?.baseInfo?.pictureId === "" ? (
                      <Image
                        alt=""
                        src={"/icons/profile.svg"}
                        height={50}
                        width={50}
                      />
                    ) : (
                      <Image
                        alt=""
                        src={data?.baseInfo?.pictureId!}
                        height={50}
                        width={50}
                      />
                    )} */}
                      <UploadProfile
                        setImage={setImage}
                        image={image}
                        cvId={+data?.baseInfo?.id!}
                      />
                    </Img>
                    <Div display={"flex"} flexDirection={"column"}>
                      <Span color={"black"} fontSize={18}>
                        {`${data?.baseInfo.name}  ${data?.baseInfo.family}`}
                      </Span>
                      <Span color={"#acacac"}>{data?.baseInfo.jobTitle}</Span>
                    </Div>
                  </InputParent>
                </Row>
                <RowInside>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      جنسیت
                    </Label>
                    <Span>{data?.baseInfo.sexId?.title}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      تاریخ تولد
                    </Label>
                    <Span>{`${data?.baseInfo.birthDate.Day}/${data?.baseInfo.birthDate.Month}/${data?.baseInfo.birthDate.Year}`}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      وضعیت تاهل
                    </Label>
                    <Span>{data?.baseInfo.isMarried?.title}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      وضعیت سربازی
                    </Label>
                    <Span>{data?.baseInfo.militaryServiceId?.title}</Span>
                  </InputParent>
                </RowInside>
                <RowInside>
                  <InputParent>
                    <Label>خلاصه رزومه </Label>
                    <Explain value={data?.baseInfo.description} />
                  </InputParent>
                </RowInside>
                <RowInside>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      شهر
                    </Label>
                    <Span>{data?.baseInfo.location?.city?.name}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      محله
                    </Label>
                    <Span>{data?.baseInfo.location?.area?.name}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      آدرس
                    </Label>
                    <Explain value={data?.baseInfo.address} />
                  </InputParent>
                </RowInside>
                <RowInside>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      ایمیل
                    </Label>
                    <Span>{data?.baseInfo.email}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      موبایل
                    </Label>
                    <Span>{data?.baseInfo.mobile}</Span>
                  </InputParent>
                  <InputParent>
                    <Label showIcon marginX={"5px"}>
                      تلفن
                    </Label>
                    <Span>{data?.baseInfo.phone}</Span>
                  </InputParent>
                </RowInside>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      سوابق شغلی
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("jobRecords")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("jobRecords")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  {isEmpty("jobExperiences") &&
                    data?.jobExperiences.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                عنوان شغل
                              </Label>
                              <Span>{record.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نوع همکاری
                              </Label>
                              <Span>{record.typeCooperations?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                شهر
                              </Label>
                              <Span>{record?.location?.city?.name}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                محله
                              </Label>
                              <Span>{record?.location?.area?.name}</Span>
                            </InputParent>

                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                عنوان موسسه یا شرکت محل کار
                              </Label>
                              <Span>{record.companyName}</Span>
                            </InputParent>
                          </RowInside>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                تاریخ شروع
                              </Label>
                              {record.startDate.Year !== 0 && (
                                <Span>{`${record.startDate.Month}/${record.startDate.Year}`}</Span>
                              )}
                            </InputParent>
                            {!record.stillWorking ? (
                              <InputParent>
                                <Label showIcon marginX={"5px"}>
                                  تاریخ پایان
                                </Label>
                                <Span>{`${record.endDate.Month}/${record.endDate.Year}`}</Span>
                              </InputParent>
                            ) : (
                              <InputParent>
                                <Label showIcon marginX={"5px"}>
                                  هم اکنون در شرکت هستم
                                </Label>
                                <Checkbox checked={record.stillWorking} />
                              </InputParent>
                            )}
                          </RowInside>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                وظایف / دستاورد ها
                              </Label>
                              <Explain value={record.achievements} />
                            </InputParent>
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      سوابق تحصیلی
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("educationalInfo")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("educationalInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  {isEmpty("degrees") &&
                    data?.degrees.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                رشته تحصیلی
                              </Label>
                              <Span>{record.fieldStudies?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نوع موسسه آموزشی
                              </Label>
                              <Span>{record.typeOwnerShips?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                عنوان موسسه آموزشی
                              </Label>
                              <Span>{record.institutionName}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                شهر
                              </Label>
                              <Span>{record.location?.city?.name}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                محله
                              </Label>
                              <Span>{record.location?.area?.name}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                مقطع تحصیلی
                              </Label>
                              <Span>{record.educationGrade?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                تخصص / گرایش
                              </Label>
                              <Span>{record.specialization}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                معدل
                              </Label>
                              <Span>{record.gpa}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                تاریخ شروع
                              </Label>
                              {record.startDate.Year !== 0 && (
                                <Span>{`${record.startDate.Month}/${record.startDate.Year}`}</Span>
                              )}
                            </InputParent>
                            {!record.stillLearning ? (
                              <InputParent>
                                <Label showIcon marginX={"5px"}>
                                  زمان فارغ التحصیل
                                </Label>
                                <Span>{`${record.endDate.Month}/${record.endDate.Year}`}</Span>
                              </InputParent>
                            ) : (
                              <InputParent>
                                <Label showIcon marginX={"5px"}>
                                  در حال تحصیل هستم
                                </Label>
                                <Checkbox checked={record.stillLearning} />
                              </InputParent>
                            )}
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      سطح زبان
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("languagesInfo")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("languagesInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  {isEmpty("languages") &&
                    data?.languages.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نام زبان
                              </Label>
                              <Span>{record.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                خواندن
                              </Label>
                              <Span>{record.reading?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                شنیداری
                              </Label>
                              <Span>{record.hearing?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نوشتن
                              </Label>
                              <Span>{record.writing?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                گفتاری
                              </Label>
                              <Span>{record.speaking?.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                سطح کلی
                              </Label>
                              <Span>{record.totalLevel?.title}</Span>
                            </InputParent>
                          </RowInside>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نوع و مدرک نمره
                              </Label>
                              <Explain value={record.explain} />
                            </InputParent>
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      دوره ها
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("degreesInfo")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("degreesInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  {isEmpty("educationCourses") &&
                    data?.educationCourses.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نام دوره
                              </Label>
                              <Span>{record.courseName}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                عنوان موسسه / مرکز آموزشی
                              </Label>
                              <Span>{record.instituteName}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                زمان شروع
                              </Label>
                              {record.startDate.Year !== 0 && (
                                <Span>{`${record.startDate.Month}/${record.startDate.Year}`}</Span>
                              )}
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                زمان پایان
                              </Label>
                              {record.endDate.Year !== 0 && (
                                <Span>{`${record.endDate.Month}/${record.endDate.Year}`}</Span>
                              )}
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                دارای گواهینامه
                              </Label>
                              <Checkbox checked={record.hasLicence} />
                            </InputParent>
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      مهارت ها
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("skillsInfo")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("skillsInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row display={"flex"} flexDirection={"column"}>
                  {isEmpty("skills") &&
                    data?.skills.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                نام مهارت
                              </Label>
                              <Span>{record.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                سطح
                              </Label>
                              <Span>{record.skillLevel?.title}</Span>
                            </InputParent>
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
              <Section>
                <Header>
                  <Title>
                    <Span color={"#474546"} fontSize={14}>
                      تحقیقات / پروژه
                    </Span>
                  </Title>
                  <Divider />
                  <Img
                    onClick={() => routeSectionHandler("researchesInfo")}
                    className="plus"
                  >
                    <Image
                      alt=""
                      src={"/icons/plus_squar_blak.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                  <Img
                    onClick={() => routeSectionHandler("researchesInfo")}
                    className="edit"
                  >
                    <Image
                      alt=""
                      src={"/icons/edit ads.svg"}
                      height={18}
                      width={18}
                    />
                  </Img>
                </Header>
                <Row>
                  {isEmpty("projects") &&
                    data?.projects.map((record, index) => {
                      return (
                        <Record key={index}>
                          <RowInside>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                عنوان
                              </Label>
                              <Span>{record.title}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                مرجع درخواست کننده
                              </Label>
                              <Span>{record.applicantReference}</Span>
                            </InputParent>
                            <InputParent>
                              <Label showIcon marginX={"5px"}>
                                لینک دوره
                              </Label>
                              <Span>{record.link}</Span>
                            </InputParent>
                          </RowInside>
                        </Record>
                      );
                    })}
                </Row>
              </Section>
            </MainContent>
            <LeftSide>
              <ResumeStatus
                completness={data?.completeness!}
                className="Desktop"
              />
              <PersonalResume fileResume={fileResume!}/>
              <AdditionalParts />
            </LeftSide>
          </Content>
        </>
      ) : (
        <ImageWrapper>
          <Image src={"/icons/loading_j.gif"} height={100} width={100} alt="" />
        </ImageWrapper>
      )}

      <Footer isProfile />
    </BoxLayout>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const defaultProps = {
    props: {
      baseInfo: [],
      projects: [],
      skills: [],
      educationCourses: [],
      languages: [],
      degrees: [],
      jobExperiences: [],
    },
  };
  let headers = context.req?.headers?.cookie
    ? cookie.parse(context.req?.headers?.cookie)
    : false;
  if (headers) {
    let _token = headers.token;
    const res = await getCV(_token);
    const convertedData: IState = convertCv(res.data);
    return {
      props: { convertedData },
    };
  }
  return {
    // props: {
    //   baseInfo: [],
    //   projects: [],
    //   skills: [],
    //   educationCourses: [],
    //   languages: [],
    //   degrees: [],
    //   jobExperiences: [],
    // },
    props: {},
  };
};
