import React, { useState, useEffect, useRef, Dispatch } from "react";
import styled from "styled-components";
import Image from "next/image";
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
  FlexboxProps,
  flexbox,
} from "styled-system";
import { useAppDispatch } from "@/store/hook";
import Select, { StylesConfig, OptionProps, components } from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IEditJob } from "../../types";
import SelectInput from "@/components/search/SelectInput";
import { CSSObject } from "@emotion/serialize";
import { levels } from "@/dictionaries/cv-filters.json";
import simpleFilters from "@/dictionaries/simple-filters.json";
import EditAdsMultiSelectModal from "./EditAdsMultiSelectModal";
import { updateAds } from "@/requests/wizard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import schema from "./Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import BelowMessage from "../addWizard/BelowMessage";
import Toast from "../Toast/Toast";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const IconTitle = styled.div<SpaceProps>`
  display: flex;
  align-items: center;
  > *:last-child {
    margin-right: 8.5px;
  }

  ${space}
`;
const Typography = styled.p<SpaceProps>`
  margin: 0;
  color: #474546;
  ${space}
`;
const TitleText = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  @media (max-width: 960px) {
    font-size: 16px;
  }
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
  @media (max-width: 960px) {
    margin-left: 6px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
${alignItems}
${space}
${width}
`;
const ContentText = styled(Typography)`
  white-space: nowrap;
  font-size: 16px;
  @media (max-width: 960px) {
    font-size: 14px;
  }
`;
const Input = styled.input<WidthProps | LayoutProps>`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  min-height: 40px;
  height: auto;
  background: white;
  //width:100%;
  /* min-width:110px;
    width: 190px; */
  ${width}
  ${layout}
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
const TextArea = styled.textarea<WidthProps | LayoutProps>`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  //min-height: 40px;
  height: 112px;
  background: white;
  overflow: hidden;
  resize: none;
  //width:100%;
  /* min-width:110px;
    width: 190px; */
  ${width}
  ${layout}
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
const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  &.remove {
    opacity: 0.5;
  }
  ${layout}
  ${flexbox}
  ${space}
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
const Submit = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  // width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: end;
`;
type Props = {
  allData: IEditJob;
  setData: Dispatch<any>;
  dictionary: (value: string) => string;
};

const EditAd = ({ allData, setData, dictionary }: Props) => {
  const [lang, setLang] = useState<
    { label: string; value: number; levelId: number }[]
  >([]);
  const [skill, setSkill] = useState<
    { label: string; value: number; levelId: number }[]
  >([]);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const dispatch = useAppDispatch();
  type IFormInput = IEditJob & { adsId: number };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: allData,
    //@ts-ignore
    resolver: yupResolver(schema),
  });
  const customStyles: StylesConfig<any, any> = {
    indicatorsContainer: () => ({
      position: "relative",
      left: "0",
      top: "3px",
      display: "flex",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    container: () => ({
      flex: "1 1 100%",
      position: "relative",
    }),
    option: (
      base: CSSObject,
      { options, isSelected, isFocused }: OptionProps<any, any, any>
    ): CSSObject => ({
      ...base,
      background: isSelected
        ? "rgba(246,164,5,0.7)"
        : isFocused
        ? "#e8e8ec"
        : "",
    }),
    control: () => ({
      minHeight: "40px",
      height: "auto",
      background: "transparent",
      // @ts-ignore
      border: "1px solid #d1d1d1",
      borderRadius: "12px",
      fontsize: "14px",
      position: "relative",
      //alignItems: "center",
      paddingRight: "10px",
      display: "flex",
      cursor: "pointer",
      zIndex: 3,
      maxWidth: 350,
      minWidth: 270,
      backgroundColor: "hsl(0, 0%, 100%)",
      "&:hover": {
        border: "1px solid #acacac",
      },
      "&::focus": {},
      "&:focus-within": {
        boxShadow: "rgb(108 108 108 / 50%) 0px 4px 20px -3px",
      },
    }),
    placeholder: () => ({
      fontSize: "14px",
      color: "#acacac",
      position: "relative",
      bottom: "10px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0",
      width: "100%",
      overflow: "inherit",
      "& > div": {
        display: "flex",
        zIndex: 3,
      },
    }),
    input: () => ({
      color: "#474546",
      fontSize: "14px",
      position: "absolute",
      top: "0",
      margin: "0px 0",
      //padding:0
    }),
    // singleValue: () => ({
    //   margin: "auto 0",
    //   fontSize: "14px",
    //   overflow: "none",
    //   Width: "max-content",
    //   color: "#474546",
    // }),
    multiValue: () => ({
      border: allData.advantageIds ? "1px solid #00C39C" : "1px solid #d1d1d1",
      borderRadius: "15px",
      margin: "2px 2px",
      padding: "2px",
    }),
    menu: (base: CSSObject): CSSObject => ({
      ...base,
      color: "#474546",
      background: "white",
      fontSize: "12px",
      zIndex: 2,
      margin: "-2px 1px",
      borderBottomLeftRadius: "14px",
      borderBottomRightRadius: "14px",
      boxShadow: "3px 5px 6px 0 rgba(112, 112, 112, 0.24)",
      paddingTop: "10px",
      position: "absolute",
      width: "99%",
      // position: "relative",
      // top: "-10px",
      //top: "100%",
      // width: "96%"
    }),
    menuPortal: (base) => ({ ...base, zIndex: 3 }),
    // multiValueRemove: () => ({ display: "none" }),
    // menuList: () => ({
    //   overflowY: "scroll",
    //   maxHeight: "200px",
    //   marginRight: "0px",
    //   paddingRight: "0px",
    //   width: "auto",
    //   "&::-webkit-scrollbar": {
    //     display: "none !important",
    //   },
    // }),
  };
  const inputRef = useRef<any>(null);
  useEffect(() => {
    let _langs: any = [];
    let _skills: any = [];
    allData.languages?.map((item) => {
      if (item.levelId) {
        let level = levels.find((level) => level.id === item.levelId)!;
        let _item = {
          label: `${item.label} - ${level.title}`,
          value: item.id,
          levelId: level.id,
        };

        _langs.push(_item);
      } else {
        let level = levels.find((level) => level.id === item.levelId)!;
        let _item = {
          label: `${item.label}`,
          value: item.id,
          levelId: level.id,
        };
        _langs.push(_item);
      }
    });
    allData.skills?.map((item) => {
      if (item.levelId) {
        let level = levels.find((level) => level.id === item.levelId)!;
        let _item = {
          label: `${item.label} - ${level.title}`,
          value: item.id,
          levelId: level.id,
        };

        _skills.push(_item);
      } else {
        let level = levels.find((level) => level.id === item.levelId)!;
        let _item = {
          label: `${item.label}`,
          value: item.id,
          levelId: level.id,
        };
        _skills.push(_item);
      }
    });

    setLang(_langs);
    setSkill(_skills);
  }, []);
  const MultiValueRemove = (props: any) => {
    console.log(props.selectProps.inputId);

    return (
      <components.MultiValueRemove {...props}>
        <Img
          onClick={() =>
            removeHandler(props.data.value, props.selectProps.inputId)
          }
        >
          <Image src={"/icons/remove_X.svg"} height={10} width={10} alt="" />
        </Img>
      </components.MultiValueRemove>
    );
  };
  const removeHandler = (id: number, inputId: string) => {
    console.log(id);
    let _values: { label: string; value: number; levelId: number }[] | null =
      [];
    if (inputId === "aria-example-input2") {
      if (skill !== null) {
        _values = [...skill];
      }
    } else {
      if (lang !== null) {
        _values = [...lang];
      }
    }
    const newValues = _values.filter(
      (item: { label: string; value: number; levelId: number }) =>
        item.value !== id
    );
    console.log(newValues);
    if (inputId === "aria-example-input2") {
      setSkill(newValues);
    } else {
      setLang(newValues);
    }
  };
  console.log(allData);
  console.log(lang);
  console.log(skill);
  const router = useRouter();
  const languagesOption = simpleFilters.filters
    .filter((items) => items.key === "languages")[0]
    .options?.map((item) => ({ value: item.id, label: item.title }));
  const skillOption = simpleFilters.filters
    .filter((items) => items.key === "skills")[0]
    .options?.map((item) => ({ value: item.id, label: item.title }));
  const options: any = {
    languages: {
      option: languagesOption,
      filter: simpleFilters.filters.filter(
        (items) => items.key === "languages"
      )[0],
    },
    skills: {
      option: skillOption,
      filter: simpleFilters.filters.filter(
        (items) => items.key === "skills"
      )[0],
    },
  };
  const option = (key: string) => {
    return simpleFilters.filters.filter((items) => items.key === key)[0]
      .options!;
  };
  const handleInput = (event: any): any => {
    event.target.style.height = "112px";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  const transformData = (data: any) => {
    const newObj: any = {};
    for (const key in data) {
      if (data[key].id) {
        newObj[key] = data[key].id;
      } else if (key === "id") {
        newObj.adsId = +data[key];
      } else if (key === "location") {
        newObj[key] = `${data[key].lat}/${data[key].lon}`;
      } else if (key === "advantageIds") {
        newObj[key] = data[key].map(
          (item: { id: number; title: string }) => item.id
        );
      } else if (key === "languages") {
        newObj[key] = data[key].map((item: any) => ({
          levelId: item.levelId,
          id: item.value,
          label: item.label.split(" - ")[0],
        }));
      } else if (key === "skills") {
        newObj[key] = data[key].map((item: any) => ({
          levelId: item.levelId,
          id: item.value,
          label: item.label.split(" - ")[0],
        }));
      } else {
        newObj[key] = data[key];
      }
    }
    let {
      areaString,
      cityName,
      company,
      contact,
      modifiedAt,
      releasedAt,
      submitedAt,
      ...other
    } = newObj;
    return other;
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updatedData = { ...data, skills: skill, languages: lang };
    const newData = transformData(updatedData);
    console.log(newData);
    let token = Cookies.get("token")!;
    if (lang.length > 0 && skill.length > 0) {
      const res = await updateAds(newData, token);
      console.log(res);

      if (!res.errorCode) {
        setToast({
          show: true,
          message: "درخواست شما با موفقیت ثبت شد.",
          type: "success",
        });
        setTimeout(() => {
          router.push("/user");
        }, 1000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <IconTitle>
          <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
          <TitleText>اطلاعات شغلی</TitleText>
        </IconTitle>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Type of cooperation.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("typeCooperationId")}</ContentText>
            </IconTitle>
            <Controller
              name="typeCooperationId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={[
                    { id: 1, title: "تمام وقت" },
                    { id: 2, title: "پاره وقت" },
                    { id: 3, title: "دورکاری" },
                    { id: 4, title: "تمام وقت و پاره وقت" },
                    { id: 5, title: "کارآموزی" },
                  ]}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={"نوع همکاری"}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.typeCooperationId && (
              <BelowMessage message={errors.typeCooperationId.message} />
            )}
          </Stack>

          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Day and Time.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("workHour")}</ContentText>
            </IconTitle>
            <Controller
              name="workDay"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"روز و ساعت کاری"}
                  value={value}
                  onChange={onChange}
                  minWidth={"110px"}
                  width={"190px"}
                />
              )}
            />
            {errors.workDay && (
              <BelowMessage message={errors.workDay.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/business trips.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("businessTrips")}</ContentText>
            </IconTitle>
            <Controller
              name="businessTrips"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={"سفر های کاری"}
                  value={value}
                  onChange={onChange}
                  minWidth={"110px"}
                  width={"190px"}
                />
              )}
            />
            {errors.businessTrips && (
              <BelowMessage message={errors.businessTrips.message} />
            )}
          </Stack>

          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/salary.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("salaryId")}</ContentText>
            </IconTitle>
            <Controller
              name="salaryId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("salaryId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("salaryId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.salaryId && (
              <BelowMessage message={errors.salaryId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/salary.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("organizationPostId")}</ContentText>
            </IconTitle>
            <Controller
              name="organizationPostId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={[
                    {
                      title: "کارگر",
                      id: 7,
                    },
                    {
                      title: "کارمند",
                      id: 6,
                    },
                    {
                      title: "کارشناس",
                      id: 5,
                    },
                    {
                      title: "کارشناس ارشد",
                      id: 4,
                    },
                    {
                      title: "مدیر میانی",
                      id: 3,
                    },
                    {
                      title: "معاونت",
                      id: 2,
                    },
                    {
                      title: "مدیر ارشد",
                      id: 1,
                    },
                  ]}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("organizationPostId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.organizationPostId && (
              <BelowMessage message={errors.organizationPostId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Facilities.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("advantageId")}</ContentText>
            </IconTitle>
            <Controller
              name="advantageIds"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  defaultValue={value}
                  isMulti={true}
                  isClearable={true}
                  isSearchable={false}
                  options={option("advantageIds")}
                  onChange={onChange}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.title}
                  styles={customStyles}
                  placeholder={dictionary("advantageId")}
                />
              )}
            />
            {errors.advantageIds && (
              <BelowMessage message={errors.advantageIds.message} />
            )}
          </Stack>
        </Stack>
        <Stack flexDirection={"column"} width={"100%"} mt={25.75}>
          <IconTitle mb={8.5}>
            <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
            <TitleText>{dictionary("jobDescription")}</TitleText>
          </IconTitle>
          <Controller
            name="jobDescription"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder={dictionary("jobDescription")}
                value={value}
                onChange={onChange}
                width={"100%"}
                onInput={handleInput}
              />
            )}
          />
          {errors.jobDescription && (
            <BelowMessage message={errors.jobDescription.message} />
          )}
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
          <Controller
            name="skillDescription"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder={dictionary("skillDescription")}
                value={value}
                onChange={onChange}
                width={"100%"}
                onInput={handleInput}
              />
            )}
          />
          {errors.skillDescription && (
            <BelowMessage message={errors.skillDescription.message} />
          )}
        </Stack>

        <IconTitle mt={25.75}>
          <Image src={"/icons/Job.svg"} alt="Job" width={19} height={19} />
          <TitleText>احراز شغلی</TitleText>
        </IconTitle>
        <Stack flexWrap={"wrap"} justifyContent={"flex-start"} width={"100%"}>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Gender.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("sexId")}</ContentText>
            </IconTitle>
            <Controller
              name="sexId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={[
                    { id: 1, title: "زن" },
                    { id: 2, title: "مرد" },
                    { id: 3, title: "فرقی ندارد" },
                  ]}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("sexId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.sexId && <BelowMessage message={errors.sexId.message} />}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/work experience.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("experienceId")}</ContentText>
            </IconTitle>
            <Controller
              name="experienceId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("experienceId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("experienceId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.experienceId && (
              <BelowMessage message={errors.experienceId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Education.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("fieldStudyId")}</ContentText>
            </IconTitle>
            <Controller
              name="fieldStudyId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("fieldStudyId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("fieldStudyId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.fieldStudyId && (
              <BelowMessage message={errors.fieldStudyId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Degree.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("gradeId")}</ContentText>
            </IconTitle>
            <Controller
              name="gradeId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("gradeId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("gradeId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.gradeId && (
              <BelowMessage message={errors.gradeId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image src={"/icons/Age.svg"} width={16} height={16} alt="icon" />
              <ContentText>{dictionary("ageMinId")}</ContentText>
            </IconTitle>
            <Controller
              name="ageMinId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("ageMinId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("ageMinId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.ageMinId && (
              <BelowMessage message={errors.ageMinId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image src={"/icons/Age.svg"} width={16} height={16} alt="icon" />
              <ContentText>{dictionary("ageMaxId")}</ContentText>
            </IconTitle>
            <Controller
              name="ageMaxId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={option("ageMaxId")}
                  maxWidth={"190px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={dictionary("ageMaxId")}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
            {errors.ageMaxId && (
              <BelowMessage message={errors.ageMaxId.message} />
            )}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Language.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("languages")}</ContentText>
            </IconTitle>
            <Controller
              name="languages"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  ref={inputRef}
                  styles={customStyles}
                  aria-labelledby="aria-label1"
                  inputId="aria-example-input1"
                  name="aria-live-color1"
                  value={lang}
                  onChange={onChange}
                  options={languagesOption}
                  placeholder={dictionary("languages")}
                  //filterOption={filterOptions}
                  // onBlur={() => {
                  //   setTouched(true);
                  //   setMessage(" ");
                  // }}
                  isMulti={true}
                  isClearable={false}
                  components={{ MultiValueRemove }}
                  isSearchable={false}
                  onMenuOpen={() =>
                    setShowModal(() => ({ show: true, type: "languages" }))
                  }
                  menuIsOpen={false}
                />
              )}
            />
            {!(lang?.length > 0) ? (
              <BelowMessage message={"تکمـیل این مـورد اجبـاری می باشـد."} />
            ) : null}
          </Stack>
          <Stack mt={10.5} ml={4} flexDirection={"column"}>
            {" "}
            <IconTitle mb={8.5}>
              <Image
                src={"/icons/Skill_02.svg"}
                width={16}
                height={16}
                alt="icon"
              />
              <ContentText>{dictionary("skillDescription")}</ContentText>
            </IconTitle>
            <Controller
              name="skills"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  ref={inputRef}
                  styles={customStyles}
                  aria-labelledby="aria-label1"
                  inputId="aria-example-input2"
                  name="aria-live-color1"
                  value={skill}
                  onChange={onChange}
                  options={skillOption}
                  placeholder={dictionary("skillDescription")}
                  //filterOption={filterOptions}
                  // onBlur={() => {
                  //   setTouched(true);
                  //   setMessage(" ");
                  // }}
                  isMulti={true}
                  isClearable={false}
                  components={{ MultiValueRemove }}
                  isSearchable={false}
                  onMenuOpen={() =>
                    setShowModal(() => ({ show: true, type: "skills" }))
                  }
                  menuIsOpen={false}
                />
              )}
            />
            {!(skill?.length > 0) ? (
              <BelowMessage message={"تکمـیل این مـورد اجبـاری می باشـد."} />
            ) : null}
          </Stack>
        </Stack>

        <Submit>
          <Button className="Button" backgroundColor={"lipstick"} type="submit">
            <Span color={"white"} fontWeight={400} fontSize={14}>
              ویرایش اگهی
            </Span>
          </Button>
        </Submit>
        {showModal.show && (
          <>
            <EditAdsMultiSelectModal
              closeModal={() =>
                setShowModal((prev) => ({ ...prev, show: false }))
              }
              options={options[showModal.type].option}
              label={
                options[showModal.type].filter.key === "languages"
                  ? dictionary("languages")
                  : dictionary("skillDescription")
              }
              filters={options[showModal.type].filter}
              allData={allData}
              setData={setData}
              value={showModal.type === "languages" ? lang : skill}
              setValue={showModal.type === "languages" ? setLang : setSkill}
            />
          </>
        )}
      </Container>
      {toast.show && (
        <Toast
          setIsHovering={(e) => setToast((prev) => ({ ...prev, show: false }))}
          isHovering={toast.show}
          type={toast.type}
          text={toast.message}
        />
      )}
    </form>
  );
};

export default EditAd;
