import { Step } from "@/components/utility/VerticalSteps";
import { AllCvData } from "@/types";
import Image from "next/image";
import React, {
  MouseEventHandler,
  RefObject,
  forwardRef,
  useState,
} from "react";
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
  flex-direction: column;
  width: 100%;
  // padding: 20px;
  // margin: 20px auto;
  height: 100%;
  background: #f0f0ef;
  overflow: hidden;
  cursor: pointer;
  & .body {
    margin-right: 26px;
  }
  @media print {
    & .body {
      width: 80%;
    }
    height: 100%;
    text-align: right;
    direction: rtl;
  }
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
  justify-content: space-around;
  border-bottom: 1px solid black;
`;
const Row = styled.div<
  SpaceProps | LayoutProps | FlexProps | JustifyContentProps
>`
  display: flex;
  width: 100%;
  margin: 10px 0;
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
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;
const Profile = styled.div`
  display: flex;
  width: 40%;
  & img {
    border-radius: 50%;
    margin: auto auto;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px auto;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  // min-width: 20px;
  //   white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Div = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  ${space}
  ${layout}
  ${flex}
  ${flexDirection}
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
  color: #acacac;
  font-size: 14px;
  white-space: nowrap;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const RecordLabel = styled.span`
  list-style-type: circle;
  display: list-item;
  font-size: 18px;
  font-weight: 500;
`;

const SimpleCv = forwardRef<HTMLDivElement, Props>((props, ref) => {
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
    const index = missed.findIndex((x) => x === value);
    if (index === -1) {
      return true;
    }
    return false;
  };
  return (
    <Form onClick={props.onClick} className={props.className} ref={ref}>
      <Header>
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
        </Profile>
        <Info>
          <Row justifyContent={"space-evenly"}>
            <Span fontSize={30} fontWeight={500}>
              {`${baseInfo.name}  ${baseInfo.family}`}
            </Span>
          </Row>
          <Row justifyContent={"flex-start"}>
            <Div width={"50%"}>
              <Image src={"/icons/phone.svg"} alt="" width={14} height={14} />
              <Span fontWeight={500}>{baseInfo.mobile}</Span>
            </Div>
            <Div width={"50%"}>
              <Label>وضعیت تاهل</Label>
              <Span fontWeight={500}>{baseInfo.isMarried?.title}</Span>
            </Div>
          </Row>
          <Row justifyContent={"flex-start"}>
            {baseInfo.email !== "" && (
              <Div>
                <Image src={"/icons/mail.svg"} alt="" width={14} height={14} />
                <Span fontWeight={500}>{baseInfo.email}</Span>
              </Div>
            )}
            <Div width={"50%"}>
              <Label>تاریخ تولد</Label>
              <Span>{`${baseInfo.birthDate.Day}/${baseInfo.birthDate.Month}/${baseInfo.birthDate.Year}`}</Span>
            </Div>
          </Row>
          <Row justifyContent={"flex-start"}>
            <Div width={"50%"}>
              <Image
                src={"/icons/locations.svg"}
                alt=""
                width={14}
                height={14}
              />
              <Label>آدرس </Label>
              <Span>{baseInfo.address}</Span>
            </Div>
          </Row>
        </Info>
      </Header>
      <Body className="body">
        <Step label="درباره من">{baseInfo.description}</Step>
        {isEmpty("jobExperiences") && (
          <Step label="سوابق شغلی">
            {jobExperiences.map((record, index) => {
              const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
              const endDate = record.stillWorking
                ? "اکنون"
                : `${record.endDate.Month} ${record.endDate.Year}`;

              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record.title}</RecordLabel>
                  <Span
                    fontWeight={400}
                  >{`${record.companyName} / ${startDate} - ${endDate}`}</Span>
                  <Span fontSize={12}>{record.achievements}</Span>
                </Div>
              );
            })}
          </Step>
        )}
        {isEmpty("degrees") && (
          <Step label="سوابق تحصیلی">
            {degrees.map((record, index) => {
              const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
              const endDate = record.stillLearning
                ? "اکنون"
                : `${record.endDate.Month} ${record.endDate.Year}`;

              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record.fieldStudies?.title}</RecordLabel>
                  <Span
                    fontWeight={400}
                  >{`${record.institutionName} / ${startDate} - ${endDate}`}</Span>
                  <Span fontSize={12}>{`معدل :${record.gpa}`}</Span>
                </Div>
              );
            })}
          </Step>
        )}

        {isEmpty("skills") && (
          <Step label="مهارت ها">
            {skills.map((record, index) => {
              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record.title}</RecordLabel>
                </Div>
              );
            })}
          </Step>
        )}
        {isEmpty("languages") && (
          <Step label="زبان ها">
            {languages.map((record, index) => {
              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record?.title}</RecordLabel>
                </Div>
              );
            })}
          </Step>
        )}
        {isEmpty("educationCourses") && (
          <Step label="دوره‌ها و گواهینامه‌ها">
            {educationCourses.map((record, index) => {
              const startDate = `${record.startDate.Month} ${record.startDate.Year}`;
              const endDate = `${record.endDate.Month} ${record.endDate.Year}`;
              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record.courseName}</RecordLabel>
                  <Span
                    fontWeight={400}
                  >{`${record.instituteName} / ${startDate} - ${endDate}`}</Span>
                </Div>
              );
            })}
          </Step>
        )}
        {isEmpty("projects") && (
          <Step label="تحقیقات و پروژه‌ها">
            {projects.map((record, index) => {
              return (
                <Div
                  margin={"10px 0"}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <RecordLabel>{record.title}</RecordLabel>
                  <Span fontWeight={400}>{`${record.applicantReference}`}</Span>
                </Div>
              );
            })}
          </Step>
        )}
      </Body>
    </Form>
  );
});
SimpleCv.displayName = "Content";
export default SimpleCv;
