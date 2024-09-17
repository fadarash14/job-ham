import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  FontWeightProps,
  fontWeight,
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  BorderProps,
  backgroundColor,
  border,
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
} from "styled-system";
import SelectInput from "@/components/search/SelectInput";
import {
  _EducationGrade,
  _EducationalInstitution,
  _Genders,
  _MaritalStatus,
  _MilitaryService,
  _SocialMedia,
  _StudyField,
} from "@/mock/_cv";
import CalenderModal from "@/components/cv/CalenderModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import LocationInfo from "@/components/cv/LocationInfo";
import Checkbox from "../utility/CheckBox";
import Image from "next/image";
import {
  setCompeletness,
  setEdited,
  setJobExperiences,
  setLevel,
  updateCVInfo,
} from "@/store/cv";
import { _workType } from "@/mock/_jobs";
import { JobExperience, JobExperiences, Option } from "@/types";
import { dateSchema } from "./Schema";
import BelowMessage from "../addWizard/BelowMessage";
import useScrollToElement from "@/hooks/useScrollToElement";
import ArrowButtons from "./ArrowButtons";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
const CV = styled.form`
  width: 80%;
  margin: 0 auto;
`;

const BaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
`;

const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: center;
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
`;
const Row = styled.div`
  display: flex;
  margin: 10px 0px;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 870px) {
    flex-wrap: wrap;
  }
`;
const Input = styled.input`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 40px;
  background: white;
  width: 100%;
  min-width: 125px;
  &.onFocus {
    &:focus {
      text-align: right;
      direction: ltr;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;
const BirthInput = styled.div`
  display: flex;
  font-size: 14px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 40px;
  background: white;
  width: 100%;
`;
const DateInput = styled.div`
  outline: none;
  padding: 5px 10px;
  border: none;
  background: white;
  width: 100%;
  cursor: pointer;
  color: #acacac;
`;
const InputParent = styled.div<
  SpaceProps | LayoutProps | AlignItemsProps | JustifyContentProps
>`
  flex: 1 1 50%;
  padding: 4px;
  ${space}
  ${layout}
  ${alignItems}
  ${justifyContent}
`;
const Label = styled.label<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
const Button = styled.button<LayoutProps | ColorProps | BorderProps>`
  border: 1px solid #f5f6fa3c;
  border-radius: 12px;
  color: black;
  justify-content: center;
  text-align: center;
  min-width: 110px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: none;
  ${layout}
  ${color}
  ${border}
  ${backgroundColor}
`;
const Div = styled.div`
  display: flex;
  width: 100%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px 28px;
`;
const AddRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: center;
  cursor: pointer;
`;
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
`;
const Submit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-left: 10px;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
`;
const ExplainFlex = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  ${space};
`;
const Explain = styled.textarea<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  background: white;
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

  ${border}
`;
type IJobExperiences = Omit<JobExperience, "id" | "title"> & {
  job: Option;
};
interface IFormInput {
  jobExperiences: IJobExperiences[];
}
type Props = {
  data: {
    typeCooperations: Option[];
    jobs: Option[];
  };
};

export default function JobsRecords({ data }: Props) {
  const [showStartDateCalender, setShowStartDateCalender] = useState(false);
  const [showEndDateCalender, setShowEndDateCalender] = useState(false);
  const [calIndex, setCalIndex] = useState(0);
  const [dateType, setDateType] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const queryClient = useQueryClient();
  const token = Cookies.get("token")!;
  const {
    jobExperiences: baseInfo,
    isEdited,
    completeness,
  } = useAppSelector((state) => state.cvInfo);
  const defaultValues: IJobExperiences[] = baseInfo.map((x) => {
    const { id, title, ...rest } = x;
    return {
      ...rest,
      job: id !== 0 ? { id, title } : null,
    };
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    setValue,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { jobExperiences: defaultValues },
    //@ts-ignore
    resolver: yupResolver(dateSchema),
  });

  const { fields, append, remove, swap } = useFieldArray<IFormInput>({
    name: "jobExperiences",
    control,
  });
  let scrl = useRef<HTMLDivElement | null>(null);
  useScrollToElement(scrl, "smooth", [fields.length, scrl.current], true);
  const watchstillWorking = (id: number) => {
    const watchItem = watch(`jobExperiences.${id}.stillWorking`, false);
    return watchItem;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let convertedData: JobExperience[] = [];
    data.jobExperiences.map((x) => {
      const { job, ...othervalues } = x;
      convertedData.push({
        ...othervalues,
        title: job?.title || "",
        id: job?.id ? (job?.id as number) : (0 as number),
      });
    });
    convertedData.map((item) => {
      if (item.stillWorking) {
        item.endDate = { Day: 0, Month: "", Year: 0 };
      }
      const index = convertedData.findIndex((x) => x === item);
      if (index !== -1 && baseInfo[index]) {
        if (baseInfo[index]?.location !== null && item.location === null) {
          item.location = baseInfo[index].location;
          //@ts-ignore
          item.areaId = baseInfo[index].location.area.id;
          //@ts-ignore
          item.cityId = baseInfo[index].location.city.id;
        }
      } else if (!baseInfo[index]) {
        if (item.location === null) {
          //@ts-ignore
          item.cityId = -1;
          //@ts-ignore
          item.areaId = -1;
        } else {
          //@ts-ignore
          item.cityId = item.location.city.id;
          //@ts-ignore
          item.areaId = item.location.area.id;
        }
      }
    });
    console.log(convertedData);
    if (isEdited) {
      const filteredData=convertedData.filter((item: any) => item.title !== "");
      dispatch(
        updateCVInfo({ data: filteredData, key: "jobExperiences", token })
      )
        .then(() => {
          setToast({
            show: true,
            message: "درخواست شما با موفقیت ثبت شد.",
            type: "success",
          });
          queryClient.invalidateQueries({ queryKey: ["myResume"] });
          setTimeout(() => {
            router.push("/user/my-resume");
            dispatch(setEdited(false));
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
          setToast({
            show: true,
            message: "در ثبت درخواست شما مشکلی بوجود امده است",
            type: "error",
          });
        });
    } else {
      // setValue("jobExperiences", convertedData);
      dispatch(setJobExperiences(convertedData));
      dispatch(setLevel(3));
    }
  };
  const handleToggle = (
    e: any,
    type: { calender: string; section: string },
    id: number
  ) => {
    e.preventDefault();
    if (type.calender === "startDate") {
      setCalIndex(id);
      setDateType(type.section);
      setShowStartDateCalender((prevState) => !prevState);
    }
    if (type.calender === "endDate") {
      setCalIndex(id);
      setDateType(type.section);
      setShowEndDateCalender((prevState) => !prevState);
    }
  };
  const closeSmallModal = () => {
    setShowStartDateCalender(false);
    setShowEndDateCalender(false);
  };
  const plusRecordHandler = () => {
    append({
      job: null,
      companyName: "",
      location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
      typeCooperations: null,
      startDate: { Day: 0, Month: "", Year: 0 },
      endDate: { Day: 0, Month: "", Year: 0 },
      stillWorking: false,
      achievements: "",
    });
  };
  const handleSwap = (indexA: number, indexB: number) => {
    swap(indexA, indexB);
  };

  const routeHandler = () => {
    isEdited
      ? (router.push("/user/my-resume"), dispatch(setEdited(false)))
      : dispatch(setLevel(1));
  };
  return (
    <CV onSubmit={handleSubmit(onSubmit)}>
      <BaseInfo>
        <Header>
          <Title>
            <Span color={"#474546"} fontSize={14}>
              سوابق شغلی
            </Span>
          </Title>
          <Divider></Divider>
        </Header>
        {fields.map((item, index: number) => (
          <Div ref={scrl} key={item.id}>
            <ArrowButtons
              onRemove={() => remove(index)}
              onMoveUp={() => index !== 0 && handleSwap(index, index - 1)}
              onMoveDown={() =>
                fields.length > index + 1 && handleSwap(index, index + 1)
              }
            />
            <Form>
              <Row>
                <InputParent>
                  <Label>عنوان شغل</Label>
                  <Controller
                    name={`jobExperiences.${index}.job`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.jobs}
                        maxWidth={"200px"}
                        minWidth={"150px"}
                        mobile={false}
                        placeHolder={"عنوان شغل"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>عنوان موسسه یا شرکت</Label>
                  <Controller
                    name={`jobExperiences.${index}.companyName` as const}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder={"عنوان موسسه یا شرکت"}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Controller
                    name={`jobExperiences.${index}.location` as const}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <LocationInfo
                        // @ts-ignore
                        value={value}
                        setLocation={(e) => onChange(e)}
                      />
                    )}
                  />
                </InputParent>
              </Row>
              <Row>
                <InputParent>
                  <Label>نوع همکاری</Label>
                  <Controller
                    name={`jobExperiences.${index}.typeCooperations` as const}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectInput
                        options={data.typeCooperations}
                        maxWidth={"180px"}
                        minWidth={"110px"}
                        mobile={false}
                        placeHolder={"نوع همکاری"}
                        value={value}
                        onChange={onChange}
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                </InputParent>
                <InputParent>
                  <Label>تاریخ شروع</Label>
                  <BirthInput>
                    <DateInput
                      onClick={(e) =>
                        handleToggle(
                          e,
                          {
                            calender: "startDate",
                            section: "Month",
                          },
                          index
                        )
                      }
                    >
                      {getValues(`jobExperiences.${index}.startDate.Month`) ? (
                        <Span color={"black"}>
                          {getValues(`jobExperiences.${index}.startDate.Month`)}
                        </Span>
                      ) : (
                        "ماه"
                      )}
                    </DateInput>
                    <DateInput
                      onClick={(e) =>
                        handleToggle(
                          e,
                          {
                            calender: "startDate",
                            section: "Year",
                          },
                          index
                        )
                      }
                    >
                      {getValues(`jobExperiences.${index}.startDate.Year`) ? (
                        <Span color={"black"}>
                          {getValues(`jobExperiences.${index}.startDate.Year`)}
                        </Span>
                      ) : (
                        "سال"
                      )}
                    </DateInput>
                  </BirthInput>
                </InputParent>
                <InputParent>
                  {!watchstillWorking(index) &&
                    !getValues(`jobExperiences.${index}.stillWorking`) && (
                      <>
                        <Label>تاریخ پایان</Label>
                        <BirthInput>
                          <DateInput
                            onClick={(e) =>
                              handleToggle(
                                e,
                                {
                                  calender: "endDate",
                                  section: "Month",
                                },
                                index
                              )
                            }
                          >
                            {getValues(
                              `jobExperiences.${index}.endDate.Month`
                            ) ? (
                              <Span color={"black"}>
                                {getValues(
                                  `jobExperiences.${index}.endDate.Month`
                                )}
                              </Span>
                            ) : (
                              "ماه"
                            )}
                          </DateInput>
                          <DateInput
                            onClick={(e) =>
                              handleToggle(
                                e,
                                {
                                  calender: "endDate",
                                  section: "Year",
                                },
                                index
                              )
                            }
                          >
                            {getValues(
                              `jobExperiences.${index}.endDate.Year`
                            ) ? (
                              <Span color={"black"}>
                                {getValues(
                                  `jobExperiences.${index}.endDate.Year`
                                )}
                              </Span>
                            ) : (
                              "سال"
                            )}
                          </DateInput>
                        </BirthInput>
                        {errors?.jobExperiences?.[index] && (
                          <BelowMessage
                            message={errors.jobExperiences[index]?.message}
                          />
                        )}
                      </>
                    )}
                </InputParent>
                <InputParent
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Label width={"100%"}>
                    همچنان در این مجموعه فعالیت میکنم
                  </Label>
                  <Controller
                    name={`jobExperiences.${index}.stillWorking` as const}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value}
                        onChange={(e: any) => onChange(!e.target.checked)}
                      />
                    )}
                  />
                </InputParent>
              </Row>
              <Row>
                <ExplainFlex>
                  <Label> خلاصه ی رزومه</Label>
                  <Controller
                    name={`jobExperiences.${index}.achievements` as const}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Explain onChange={onChange} value={value} />
                    )}
                  />
                </ExplainFlex>
              </Row>
              {showStartDateCalender && calIndex === index && (
                <Controller
                  name={`jobExperiences.${index}.startDate` as const}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CalenderModal
                      type={dateType}
                      closeModal={closeSmallModal}
                      setMonth={(e: string) => onChange({ ...value, Month: e })}
                      setYear={(e: number) => onChange({ ...value, Year: e })}
                    />
                  )}
                />
              )}
              {showEndDateCalender && calIndex === index && (
                <Controller
                  name={`jobExperiences.${index}.endDate` as const}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CalenderModal
                      type={dateType}
                      closeModal={closeSmallModal}
                      setMonth={(e: string) => onChange({ ...value, Month: e })}
                      setYear={(e: number) => {
                        onChange({ ...value, Year: e });
                      }}
                    />
                  )}
                />
              )}
            </Form>
          </Div>
        ))}
        <AddRow onClick={plusRecordHandler}>
          <Title>
            <Span color={"#acacac"} fontSize={16} fontWeight={500}>
              اضافه کردن سابقه شغلی
            </Span>
          </Title>
          <Img>
            <Image
              src={"icons/plus_squar_blak.svg"}
              width={20}
              height={20}
              alt="plus"
            />
          </Img>
        </AddRow>
      </BaseInfo>
      <Submit>
        <Button
          className="Button"
          backgroundColor={"paleGrey"}
          onClick={routeHandler}
        >
          <Span color={"black"} fontWeight={400} fontSize={14}>
            بازگشت
          </Span>
        </Button>
        <Button className="Button" backgroundColor={"lipstick"} type="submit">
          <Span color={"white"} fontWeight={400} fontSize={14}>
            {isEdited ? "تایید" : "ادامه"}
          </Span>
        </Button>
      </Submit>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </CV>
  );
}
