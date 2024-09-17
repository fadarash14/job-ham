import React from "react";
import {
  changeDateToText,
  convertStringtoDate,
  getAreaNameById,
  getCityNameById,
  getMarriedStatusByBoolean,
  getMilitaryStatusById,
  getSexById,
} from "@/utils/helper";
import Image from "next/image";
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
  flexDirection,
  FlexDirectionProps,
} from "styled-system";
import { ResultCV } from "@/types";
import _ from "lodash";

const filterEmpty = (arr: any[], emptySample: Object) => {
  const result = arr.filter(
    (i) => !_.isEqual(i, emptySample) && !_.isNull(i.id)
  );
  return {
    result,
    resultSize: result.length,
  };
};

const CvDetail = ({ data }: { data: ResultCV }) => {
  const {
    address,
    jobExperiences,
    degrees,
    pictureId,
    name,
    family,
    mobile,
    email,
    sexId,
    jobTitle,
    militaryServiceId,
    areaId,
    cityId,
    birthDate,
    isMarried,
    description,
    phone,
    webSiteUrl,
    languages,
    educationCourses,
    skills,
    projects,
  } = data || {};
  const jobExperiencesFiltered = filterEmpty(
    jobExperiences,
    jobExperiencesEmptySample
  );
  const degreesFiltered = filterEmpty(degrees, degreeEmptySample);
  const languagesFiltered = filterEmpty(languages, languageEmptySample);
  const educationCoursesFiltered = filterEmpty(
    educationCourses,
    educationCoursesEmptySample
  );
  const skillsFiltered = filterEmpty(skills, skillsEmptySample);
  const projectsFiltered = filterEmpty(projects, projectsEmptySample);
  console.log(degreesFiltered.result);
  return (
    <WrapDetail>
      <Top>
        <Circle>
          <Image
            src={
              pictureId
                ? pictureId
                : sexId === 1
                ? "/icons/female-avatar.svg"
                : "/icons/male-avatar.svg"
            }
            fill={true}
            alt=""
          />
        </Circle>
        <div>
          <div className="name">
            {name} {family}
          </div>
          <div className="sub">{jobTitle}</div>
        </div>
      </Top>
      <Sub>
        <Row>
          <InputParent>
            <Image
              src={"/icons/Icon awesome-phone.svg"}
              alt=""
              width={14}
              height={14}
            />
            <Label fontSize={18}>موبایل:</Label>
            <Span fontSize={18}>0{mobile}</Span>
          </InputParent>
          <InputParent>
            <Image
              src={"/icons/Icon ionic-ios-mail.svg"}
              alt=""
              width={14}
              height={14}
            />
            <Label fontSize={18}>ایمیل:</Label>
            <Span fontSize={18}>{email}</Span>
          </InputParent>
          <InputParent></InputParent>
        </Row>
      </Sub>
      <HeaderDivider />
      <BodyContent>
        <Row>
          <InputParent>
            <Label showIcon>جنسیت:</Label>
            <Span>{getSexById(sexId!)?.title}</Span>
          </InputParent>
          <InputParent>
            <Label showIcon>تاریخ تولد:</Label>
            <Span>{convertStringtoDate(birthDate!)}</Span>
          </InputParent>
          <InputParent>
            <Label showIcon>وضعیت تاهل:</Label>
            <Span>{getMarriedStatusByBoolean(isMarried!)}</Span>
          </InputParent>
          <InputParent>
            <Label showIcon>وضعیت سربازی:</Label>
            <Span>{getMilitaryStatusById(militaryServiceId!)?.title}</Span>
          </InputParent>
          <Row>
            <InputParent>
              <Label>خلاصه رزومه:</Label>
              <Explain readOnly disabled defaultValue={description} />
            </InputParent>
          </Row>
          <Row>
            <InputParent>
              <Label showIcon>شهر:</Label>
              <Span>{getCityNameById(cityId!)}</Span>
            </InputParent>
            <InputParent>
              <Label showIcon>محل:</Label>
              <Span>{getAreaNameById(cityId!, areaId!)}</Span>
            </InputParent>
            <InputParent>
              <Label showIcon>آدرس:</Label>
              <Span>{address || "-"}</Span>
            </InputParent>
            <InputParent>
              <Label showIcon>تلفن:</Label>
              <Span>{phone || "-"}</Span>
            </InputParent>
            <InputParent>
              <Label showIcon>وب سایت:</Label>
              <Span>{webSiteUrl || "-"}</Span>
            </InputParent>
          </Row>
        </Row>

        <Title>
          سوابق شغلی<Divider></Divider>
        </Title>
        {jobExperiencesFiltered.resultSize > 0 &&
          [...jobExperiencesFiltered.result].map((job, index) => (
            <Row key={index}>
              <Row>
                <InputParent>
                  <Label showIcon>عنوان شغل:</Label>
                  <Span>{job.title}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>عنوان موسسه یا شرکت محل کار:</Label>
                  <Span>{job.companyName}</Span>
                </InputParent>

                <InputParent>
                  <Label showIcon>شهر:</Label>
                  <Span>{job.cityId ? getCityNameById(job.cityId) : "-"}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>محله:</Label>
                  <Span>
                    {job.cityId && job.areaId
                      ? getAreaNameById(job.cityId, job.areaId)
                      : "-"}
                  </Span>
                </InputParent>

                <InputParent>
                  <Label showIcon>نوع همکاری:</Label>
                  <Span>{job.typeCooperations?.title}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>مدت همکاری:</Label>
                  <Span>
                    {changeDateToText(
                      job?.startDate,
                      job?.endDate,
                      job?.stillWorking,
                      "job"
                    )}
                  </Span>
                </InputParent>
              </Row>
              <Row>
                <InputParent>
                  <Label>وظایف / دستاورد ها:</Label>
                  <Explain readOnly disabled defaultValue={job.achievements} />
                </InputParent>
              </Row>
            </Row>
          ))}

        <Title>
          سوابق تحصیلی<Divider></Divider>
        </Title>
        {degreesFiltered.resultSize > 0 &&
          [...degreesFiltered.result].map((deg, index) => (
            <Row key={index}>
              <Row>
                <InputParent>
                  <Label showIcon>رشته تحصیلی:</Label>
                  <Span>{deg.fieldStudies?.title}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>نوع موسسه آموزشی:</Label>
                  <Span>{deg.typeOwnerShips?.title}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>عنوان موسسه آموزشی:</Label>
                  <Span>{deg.institutionName}</Span>
                </InputParent>

                <InputParent>
                  <Label showIcon>شهر:</Label>
                  <Span>{getCityNameById(deg?.cityId ? deg.cityId : 0)}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>محله:</Label>
                  <Span>
                    {deg?.cityId &&
                      deg?.areaId &&
                      getAreaNameById(deg.cityId, deg.areaId)}
                  </Span>
                </InputParent>

                <InputParent>
                  <Label showIcon>مقطع تحصیلی:</Label>
                  <Span>{deg.educationGrade?.title}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>تخصص/گرایش:</Label>
                  <Span>{deg.specialization}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>معدل:</Label>
                  <Span>{deg.gpa}</Span>
                </InputParent>
                <InputParent>
                  <Label showIcon>مدت زمان تحصیل:</Label>
                  <Span>
                    {" "}
                    {changeDateToText(
                      deg?.startDate,
                      deg?.endDate,
                      deg?.stillLearning,
                      "deg"
                    )}{" "}
                  </Span>
                </InputParent>
              </Row>
            </Row>
          ))}

        <Title>
          سطح زبان<Divider></Divider>
        </Title>
        {languagesFiltered.resultSize > 0 &&
          [...languagesFiltered.result].map((lang, index) => (
            <Row key={index}>
              <InputParent>
                <Label showIcon>نام زبان:</Label>
                <Span>{lang.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>مهارت شنیداری:</Label>
                <Span>{lang.hearing?.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>مهارت نوشتن:</Label>
                <Span>{lang.writing?.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>مهارت خواندن:</Label>
                <Span>{lang.reading?.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>مهارت گفتاری:</Label>
                <Span>{lang.speaking?.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>سطح کلی:</Label>
                <Span>{lang.totalLevel?.title}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>توضیحات:</Label>
                <Span>{lang.explain}</Span>
              </InputParent>
            </Row>
          ))}

        <Title>
          دوره ها<Divider></Divider>
        </Title>
        {educationCoursesFiltered.resultSize > 0 &&
          [...educationCoursesFiltered.result].map((edu, index) => (
            <Row key={index}>
              <InputParent>
                <Label showIcon>نام دوره:</Label>
                <Span>{edu.courseName || "-"}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>عنوان موسسه / مرکز آموزش:</Label>
                <Span>{edu.instituteName || "-"}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>زمان برگزاری دوره:</Label>
                <Span>
                  {edu.startDate.Year
                    ? changeDateToText(edu.startDate, edu.endDate)
                    : "-"}
                </Span>
              </InputParent>
              <InputParent>
                <Label showIcon>دارای گواهینامه:</Label>
                <Span>{edu.hasLicence ? "بله" : "خیر"}</Span>
              </InputParent>
            </Row>
          ))}

        <Title>
          مهارت ها<Divider></Divider>
        </Title>
        <Row flexDirection={"column"}>
          {skillsFiltered.resultSize > 0 &&
            [...skillsFiltered.result].map((skill, index) => (
              <InputParent key={index} className="skills">
                <Image src={"/icons/flash.svg"} width={9} height={9} alt="" />{" "}
                <Span>
                  {skill.title} - {skill.skillLevel?.title}
                </Span>
              </InputParent>
            ))}
        </Row>

        <Title>
          تحقیقات / پروژه<Divider></Divider>
        </Title>
        {projectsFiltered.resultSize > 0 &&
          [...projectsFiltered.result].map((project, index) => (
            <Row key={index}>
              <InputParent>
                <Label showIcon>عنوان:</Label>
                <Span>{project.title || "-"}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>مرجع درخواست کننده:</Label>
                <Span>{project.applicantReference || "-"}</Span>
              </InputParent>
              <InputParent>
                <Label showIcon>لینک دوره:</Label>
                <Span>{project.link || "-"}</Span>
              </InputParent>
            </Row>
          ))}
      </BodyContent>
    </WrapDetail>
  );
};

export default CvDetail;

const WrapDetail = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #d1d1d1;
  border-radius: 100%;
  background-color: transparent;
  position: relative;
  margin-left: 10px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;
const Sub = styled.div`
  width: 100%;
`;
const BodyContent = styled.div`
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Row = styled.div<SpaceProps | LayoutProps | FlexDirectionProps>`
  display: flex;
  margin: 10px 0px;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 870px) {
    flex-wrap: wrap;
  }
  ${space}
  ${layout}
  ${flexDirection}
  img {
    margin-left: 4px;
  }
  .skills {
    display: flex;
    align-items: center;
    img {
      margin-left: 0px;
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
  align-items: center;
  ${space}
  ${layout}
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
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  // min-width: 20px;
  white-space: nowrap;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 300;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Divider = styled.div`
  border-bottom: 1px solid #d1d1d1;
  width: 90%;
`;
const Explain = styled.textarea<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: transparent;
  min-height: 100px;
  min-width: 100%;
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
  }

  @media only screen and (max-width: 576px) {
    min-width: 100%;
  }

  ${border}
`;
const Title = styled.div`
  font-size: 13px;
  color: #474546;
  margin-top: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const HeaderDivider = styled(Divider)`
  width: 100%;
`;

const jobExperiencesEmptySample = {
  id: "undefined",
  title: "",
  areaId: -1,
  cityId: -1,
  endDate: {
    Day: 0,
    Year: 0,
    Month: "",
  },
  location: {
    area: {
      id: -1,
      name: "",
    },
    city: {
      id: -1,
      name: "",
    },
  },
  startDate: {
    Day: 0,
    Year: 0,
    Month: "",
  },
  companyName: "",
  achievements: "",
  stillWorking: false,
  typeCooperations: null,
};
const degreeEmptySample = {
  areaId: -1,
  cityId: -1,
  fieldStudies: null,
  typeOwnerShips: null,
  institutionName: "",
  // location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
  educationGrade: null,
  specialization: "",
  gpa: "",
  startDate: { Day: 0, Month: "", Year: 0 },
  endDate: { Day: 0, Month: "", Year: 0 },
  stillLearning: false,
};

const languageEmptySample = {
  id: "undefined",
  title: "",
  reading: null,
  hearing: null,
  writing: null,
  speaking: null,
  totalLevel: null,
  explain: "",
};
const educationCoursesEmptySample = {
  courseName: "",
  instituteName: "",
  startDate: { Day: 0, Month: "", Year: 0 },
  endDate: { Day: 0, Month: "", Year: 0 },
  courseLink: "",
  hasLicence: false,
};
const skillsEmptySample = {
  id: "undefined",
  title: "",
  skillLevel: null,
};
const projectsEmptySample = { title: "", applicantReference: "", link: "" };
