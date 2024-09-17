import ProgressBar from "@/components/utility/ProgressBar";
import { AllCvData } from "@/types";
import Image from "next/image";
import React, { MouseEventHandler, RefObject, forwardRef } from "react";
import { useAppSelector } from "@/store/hook";
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
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flex,
  JustifyContentProps,
  justifyContent,
  BorderProps,
  border,
} from "styled-system";
import { IState } from "@/store/cv";
type Data = Omit<IState, "isEdited" | "level">;
type Props = {
  ref: RefObject<HTMLDivElement>;
  className: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  data: Data;
};

const Form = styled.div`
  display: flex;
  // flex-direction: column;
  width: 100%;
  // max-width: 560px;
  // padding: 20px;
  // margin: 20px auto;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  @media print {
    & .rightDiv {
      width: 30%;
    }
    height: 100%;
    text-align: right;
    direction: rtl;
  }
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background: #3b3b3c;
`;
const LeftDiv = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background: white;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  & img {
    border-radius: 50%;
    margin: 20px auto;
  }
  & > div {
    margin-right: 26px;
  }
`;
const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 12px 8px 10px;
`;
const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px auto;
  justify-content: center;
  width: 100%;
  & > span {
    font-size: 12px;
  }
`;
const RightContentDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
  margin: 6px auto;
  & img {
    margin-left: 16px;
  }
`;
const LeftContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: start;
  padding: 0 10px;
  // margin: 6px 16px;
  // margin-right: 16px;
  // & img {
  // }
`;
const Explain = styled.textarea<BorderProps>`
  background: white;
  min-width: 100%;
  border: none;
  font-size: 10px;
  color: black;
  font-weight: 500;
  flex: 1 1 90%;
  padding: 10px;
  outline: none;
  resize: none;
  -webkit-user-select: text; /* Chrome, Opera, Safari */
  -moz-user-select: text; /* Firefox 2+ */
  -ms-user-select: text; /* IE 10+ */
  user-select: text; /* Standard syntax */
  &::-webkit-inner-spin-button {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    min-width: 100%;
  }

  @media only screen and (max-width: 576px) {
    min-width: 100%;
  }
  ${border}
`;
const Header = styled.h2``;
const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  jusitfy-content: center;
  margin: 40px 25px;
`;
const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  color: white;
  font-weight: bold;
  padding-bottom: 4px;
  border-bottom: 1px solid white;
`;
const LeftTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  color: black;
  font-weight: bold;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
`;
const Div = styled.div<
  SpaceProps | LayoutProps | FlexDirectionProps | JustifyContentProps
>`
  word-wrap: break-word;
  ${space}
  ${layout}
  ${flex}
  ${flexDirection}
  ${justifyContent}
`;
const Row = styled.div<
  SpaceProps | LayoutProps | FlexProps | JustifyContentProps
>`
  display: flex;
  width: 100%;
  margin: 4px 0;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 870px) {
    flex-wrap: wrap;
  }
  ${space}
  ${layout}
  ${flex}
  ${justifyContent}
`;
const Label = styled.label<
  FontSizeProps & FontWeightProps & SpaceProps & LayoutProps & ColorProps
>`
  &::before {
    margin-left: 3px;
    display: inline-block;
    vertical-align: middle;
  }
  &::after {
    content: " : ";
  }
  text-align: right;
  color: white;
  font-size: 12px;
  font-weight: 500;

  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  font-size: 10px;
  color: white;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const BSpan = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  font-size: 10px;
  color: black;
  align-self: flex-start;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Moderncv = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    baseInfo,
    projects,
    skills,
    educationCourses,
    languages,
    degrees,
    jobExperiences,
    completeness: { missed },
  } = props.data;
  const isEmpty = (value: string) => {
    const index =missed.findIndex((x) => x === value);
    if (index === -1) {
      return true;
    }
    return false;
  };
  const convertLevels = (id: number) => {
    return id * 20;
  };
  return (
    <Form onClick={props.onClick} className={props.className} ref={ref}>
      <RightDiv className="rightDiv">
        <Content>
          <Profile>
            {baseInfo.pictureId ? (
              <Image width={120} height={120} alt="" src={baseInfo.pictureId} />
            ) : baseInfo.sexId?.id === 2 ? (
              <Image
                width={120}
                height={120}
                alt=""
                src={"/icons/male-avatar.svg"}
              />
            ) : (
              <Image
                width={120}
                height={120}
                alt=""
                src={"/icons/female-avatar.svg"}
              />
            )}
            <Row>
              <Label>وضعیت تاهل</Label>
              <Span>{baseInfo.isMarried?.title}</Span>
            </Row>
            <Row>
              <Label>تاریخ تولد</Label>
              <Span>{`${baseInfo.birthDate.Day}/${baseInfo.birthDate.Month}/${baseInfo.birthDate.Year}`}</Span>
            </Row>
            <Row>
              <Label>وضعیت سربازی</Label>
              <Span>{baseInfo.militaryServiceId?.title}</Span>
            </Row>
          </Profile>
          <RightInfo>
            <Title>اطلاعات تماسی</Title>
            <RightContentDiv>
              <Image src={"/icons/phone.svg"} alt="" width={14} height={14} />
              <Div display={"flex"} flexDirection={"column"}>
                <Span fontWeight={"bold"}>موبایل</Span>
                <Span>{baseInfo.mobile}</Span>
              </Div>
            </RightContentDiv>
            <RightContentDiv>
              <Image src={"/icons/mail.svg"} alt="" width={14} height={14} />
              <Div display={"flex"} flexDirection={"column"}>
                <Span fontWeight={"bold"}>ایمیل</Span>
                <Span>{baseInfo.email}</Span>
              </Div>
            </RightContentDiv>
            <RightContentDiv>
              <Image
                src={"/icons/locations.svg"}
                alt=""
                width={14}
                height={14}
              />
              <Div width={200} display={"flex"} flexDirection={"column"}>
                <Span fontWeight={"bold"} width={200}>
                  آدرس
                </Span>
                <Span>{baseInfo.address}</Span>
              </Div>
            </RightContentDiv>
          </RightInfo>
          <RightInfo>
            <Title>مهارت ها</Title>
            {isEmpty("skills") && (
              <Div
                my={"10px"}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
              >
                {skills.map((record, index) => {
                  return (
                    <BarWrapper key={index}>
                      <Span>{record.title}</Span>
                      <ProgressBar
                        percentage={false}
                        background="#6D6E71"
                        color="#FFFFFF"
                        progress={convertLevels(
                          record.skillLevel?.id! as number
                        )}
                      />
                    </BarWrapper>
                  );
                })}
              </Div>
            )}
          </RightInfo>
          <RightInfo>
            <Title>زبان ها</Title>
            {isEmpty("languages") && (
              <Div
                my={"10px"}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
              >
                {languages.map((record, index) => {
                  return (
                    <BarWrapper key={index}>
                      <Span>{record?.title}</Span>
                      <ProgressBar
                        percentage={false}
                        background="#6D6E71"
                        color="#FFFFFF"
                        progress={convertLevels(
                          record.totalLevel?.id! as number
                        )}
                      />
                    </BarWrapper>
                  );
                })}
              </Div>
            )}
          </RightInfo>
        </Content>
      </RightDiv>
      <LeftDiv>
        <LeftInfo>
          <Header> {`${baseInfo.name}  ${baseInfo.family}`}</Header>
          <BSpan fontSize={18}>{baseInfo.jobTitle}</BSpan>
        </LeftInfo>
        <LeftContentDiv>
          <Row>
            <LeftTitle>
              <Image width={18} height={18} alt="" src={"/icons/profile.svg"} />
              درباره من
            </LeftTitle>
            <Explain value={baseInfo.description} />
          </Row>
          {isEmpty("jobExperiences") && (
            <Row>
              <LeftTitle>
                <Image
                  width={18}
                  height={18}
                  alt=""
                  src={"/icons/newestJobs.svg"}
                />
                سوابق شغلی
              </LeftTitle>
              {jobExperiences.map((record, index) => {
                const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
                const endDate = record.stillWorking
                  ? "اکنون"
                  : `${record.endDate.Month} ${record.endDate.Year}`;

                return (
                  <Div
                    margin={"10px 0"}
                    width={"100%"}
                    display={"flex"}
                    key={index}
                  >
                    <Div
                      width={"50%"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <BSpan fontWeight={"bold"} fontSize={14}>
                        {record.title}
                      </BSpan>
                      <BSpan fontSize={12}>{record.achievements}</BSpan>
                    </Div>
                    <Div display={"flex"} flexDirection={"column"}>
                      <BSpan fontWeight={400} fontSize={14}>
                        {record.companyName}
                      </BSpan>
                      <BSpan>{`${startDate} - ${endDate}`}</BSpan>
                    </Div>
                  </Div>
                );
              })}
            </Row>
          )}
          {isEmpty("degrees") && (
            <Row>
              <LeftTitle>
                <Image
                  width={18}
                  height={18}
                  alt=""
                  src={"/icons/newestJobs.svg"}
                />
                سوابق تحصیلی
              </LeftTitle>
              {degrees.map((record, index) => {
                const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
                const endDate = record.stillLearning
                  ? "اکنون"
                  : `${record.endDate.Month} ${record.endDate.Year}`;

                return (
                  <Div
                    margin={"10px 0"}
                    width={"100%"}
                    display={"flex"}
                    key={index}
                  >
                    <Div
                      width={"50%"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <BSpan fontWeight={"bold"} fontSize={14}>
                        {record.fieldStudies?.title}
                      </BSpan>
                      <BSpan>{`${startDate} - ${endDate}`}</BSpan>
                    </Div>
                    <Div display={"flex"} flexDirection={"column"}>
                      <BSpan fontWeight={400} fontSize={14}>
                        {record.institutionName}
                      </BSpan>
                      <BSpan fontSize={12}>{`معدل :${record.gpa}`}</BSpan>
                    </Div>
                  </Div>
                );
              })}
            </Row>
          )}
          {isEmpty("educationCourses") && (
            <Row>
              <LeftTitle>
                <Image
                  width={18}
                  height={18}
                  alt=""
                  src={"/icons/newestJobs.svg"}
                />
                دوره‌ها و گواهینامه‌ها
              </LeftTitle>
              {educationCourses.map((record, index) => {
                const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
                const endDate = `${record.endDate.Month} ${record.endDate.Year}`;

                return (
                  <Div
                    margin={"10px 0"}
                    width={"100%"}
                    display={"flex"}
                    key={index}
                  >
                    <Div
                      width={"50%"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <BSpan fontWeight={"bold"} fontSize={14}>
                        {record.instituteName}
                      </BSpan>
                      <BSpan>{`${startDate} - ${endDate}`}</BSpan>
                    </Div>
                    <Div display={"flex"} flexDirection={"column"}>
                      <BSpan fontWeight={400} fontSize={14}>
                        {record.courseName}
                      </BSpan>
                      <BSpan fontSize={12}>
                        {record.hasLicence ? "دارای گواهینامه" : ""}
                      </BSpan>
                    </Div>
                  </Div>
                );
              })}
            </Row>
          )}
          {isEmpty("projects") && (
            <Row>
              <LeftTitle>
                <Image
                  width={18}
                  height={18}
                  alt=""
                  src={"/icons/newestJobs.svg"}
                />
                تحقیقات و پروژه‌ها
              </LeftTitle>
              {projects.map((record, index) => {
                return (
                  <Div
                    margin={"10px 0"}
                    width={"100%"}
                    display={"flex"}
                    key={index}
                  >
                    <Div
                      width={"50%"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <BSpan fontWeight={"bold"} fontSize={14}>
                        {record.title}
                      </BSpan>
                      <BSpan>{record.applicantReference}</BSpan>
                    </Div>
                  </Div>
                );
              })}
            </Row>
          )}
        </LeftContentDiv>
      </LeftDiv>
    </Form>
  );
});
Moderncv.displayName = "Content";
export default Moderncv;
