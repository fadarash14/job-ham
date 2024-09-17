import React, { useState } from "react";
import styled from "styled-components";
import SelectInput from "@/components/search/SelectInput";
import { Option, ResumeBankKeys } from "@/types";
import CvFilters from "@/dictionaries/cv-filters.json";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SearchKeywords from "./SearchKeywords";
import Checkbox from "../utility/CheckBox";
const Categories: ICategories = require("@/dictionaries/category.json");
import Cities from "@/dictionaries/filterCity.json";
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexProps,
  JustifyContentProps,
  LayoutProps,
  OpacityProps,
  SpaceProps,
  TextAlignProps,
  alignItems,
  flexDirection,
  justifyContent,
  layout,
  opacity,
  space,
  textAlign,
} from "styled-system";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
interface ICategories {
  [key: string]: {
    [key: string]: any;
  };
}

const Jobs = Object.entries(Categories)
  .filter(([key, property]) => property.parent_id === 0)
  .map(([key, property]) => ({ id: property.id, title: property.name }));

type Select = {
  id: number;
  title: string;
};

type Range = {
  from: Select | null;
  toEnd: Select | null;
};

interface IFormInput {
  text: string;
  cityId?: Select;
  name?: string;
  family?: string;
  jobTitle?: string;
  sexIds?: Select;
  militaryServiceIds?: Select;
  skillIds?: Select[];
  educationCourseIds?: Select[];
  languageIds?: Select[];
  salaryId?: Select;
  jobExperienceIds?: Range;
  degreeIds?: Select[];
  fromBirthDate?: Select;
  toBirthDate?: Select;
  withoutExperience?: boolean;
}

export type SearchCVQuery = {
  text: string;
  cityId?: string;
  name?: string;
  family?: string;
  jobTitle?: string;
  sexIds?: string;
  militaryServiceIds?: string;
  skillIds?: string;
  jobExperienceIds?: string;
  educationCourseIds?: string;
  languageIds?: string;
  degreeIds?: string;
  fromBirthDate?: string;
  toBirthDate?: string;
  salaryId?: string;
};

const Form = styled.form`
  display: flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const InputParent = styled.div<
  | SpaceProps
  | LayoutProps
  | AlignItemsProps
  | JustifyContentProps
  | FlexDirectionProps
  | OpacityProps
>`
  display: flex;
  padding: 4px;
  flex-direction: column;
  // margin-left: 30px;
  // flex-grow: 1;
  ${space}
  ${layout}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${opacity}
`;
const Label = styled.label<TextAlignProps | SpaceProps>`
  text-align: right;
  color: #acacac;
  font-size: 14px;
  margin-bottom: 4px;
  ${textAlign}
  ${space}
`;
const DoubleInput = styled.div`
  display: flex;
  align-items: center;
  & .To {
    display: flex;
    color: #d1d1d1;
    font-size: 14px;
    margin-top: 8px;
  }
`;
const SubmitButton = styled.button`
  width: 114px;
  height: 36px;
  background: ${({ disabled }) => (disabled ? "#c1c1c1" : "#db143d")};
  border-radius: 15px;
  color: #f5f6fa;
  outline: none;
  border: none;
  cursor: pointer;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  margin-left: 8px;
  margin-top: 24px;
  justify-content: flex-end;
`;

const Input = styled.input<SpaceProps | LayoutProps>`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  height: 40px;
  background: white;
  width: 100%;
  min-width: 125px;
  max-width: 310px;
  &.onFocus {
    &:focus {
      text-align: right;
      direction: ltr;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
  ${space}
  ${layout}
`;
const StyledButton = styled.button`
  --main-focus: #2d8cf0;
  --font-color: #323232;
  --bg-color-sub: #dedede;
  --bg-color: #eee;
  --main-color: #323232;
  position: relative;
  width: 120px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #acacac;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button__text {
    transform: translateX(-3px);
    color: var(--font-color);
    font-weight: 600;
  }

  .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: var(--bg-color-sub);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svg {
    width: 20px;
    fill: var(--main-color);
  }

  &:hover {
    background: var(--bg-color);

    .button__text {
      color: transparent;
    }

    .button__icon {
      width: 148px;
      transform: translateX(24px);
    }
  }
`;

const SearchKeywordsContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100%;
  margin: 30px auto;
`;
const StyledButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      <span className="button__text">جستجوی پیشرفته</span>
      <span className="button__icon">
        <svg
          className="svg"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" x2="12" y1="5" y2="19"></line>
          <line x1="5" x2="19" y1="12" y2="12"></line>
        </svg>
      </span>
    </StyledButton>
  );
};

export default function ResumeFilters() {
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    // setValue,
    // formState: { errors },
  } = useForm<IFormInput>({
    // defaultValues: {},
    //@ts-ignore
    // resolver: yupResolver(schema),
  });
  // const isWithoutExperience = () => {
  //   const watchItem = watch(ResumeBankKeys.WithoutExperience, false);
  //   return watchItem;
  // };
  const advanceSearchHandler = () => setShowAdvanceSearch((show) => !show);

  const route = useRouter();
  const onSubmit = async (data: IFormInput) => {
    const input = convertToSearchCVQuery(data);
    const queryString = new URLSearchParams(input).toString();
    route.push(`/resumeBank/search-list?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SearchKeywordsContainer>
        <Controller
          name={ResumeBankKeys.Text}
          control={control}
          render={({ field: { value, onChange } }) => (
            <SearchKeywords
              maxWidth={"100%"}
              minWidth={"250px"}
              fullSize
              bg={"paleGrey"}
              mobile={false}
              onChange={onChange}
            />
          )}
        />
      </SearchKeywordsContainer>
      <InputParent>
        <Label>عنوان شغلی کارجو</Label>
        <Controller
          name={ResumeBankKeys.JobTitle}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              minWidth={"310px"}
              maxWidth={"340px"}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </InputParent>
      <InputParent>
        <Label>شهر محل سکونت کارجو</Label>
        <Controller
          name={ResumeBankKeys.CityId}
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              options={Cities}
              maxWidth={"310px"}
              minWidth={"110px"}
              mobile={false}
              placeHolder={""}
              value={value}
              onChange={onChange}
              onClear={() => onChange(null)}
            />
          )}
        />
      </InputParent>

      {/* <InputParent opacity={isWithoutExperience() ? "0.5" : "1"}>
        <Label textAlign={"center"}>سابقه کاری در زمینه کاری مورد نظر </Label>
        <DoubleInput>
          <Controller
            name={`${ResumeBankKeys.JobExperienceIds}.from`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                isDisabled={isWithoutExperience()}
                options={CvFilters.experiences}
                maxWidth={"110px"}
                minWidth={"80px"}
                mobile={false}
                placeHolder={""}
                value={value}
                onChange={onChange}
                onClear={() => onChange(null)}
              />
            )}
          />
          <span className="To">تا</span>
          <Controller
            name={`${ResumeBankKeys.JobExperienceIds}.toEnd`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                isDisabled={isWithoutExperience()}
                options={CvFilters.experiences}
                maxWidth={"110px"}
                minWidth={"80px"}
                mobile={false}
                placeHolder={""}
                value={value}
                onChange={onChange}
                onClear={() => onChange(null)}
              />
            )}
          />
        </DoubleInput>
      </InputParent>
      <InputParent
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"24px"}
      >
        <Label mb={"0px"}>بدون سابقه کار</Label>
        <Controller
          name={ResumeBankKeys.WithoutExperience}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              checked={value!}
              onChange={(e: any) => {
                const check = !e.target.checked;
                if (check) {
                  setValue(`${ResumeBankKeys.JobExperienceIds}.from`, null);
                  setValue(`${ResumeBankKeys.JobExperienceIds}.toEnd`, null);
                }
                onChange(check);
              }}
            />
          )}
        />
      </InputParent> */}

      {!showAdvanceSearch ? (
        <InputParent mt={"24px"}>
          <StyledButtonComponent onClick={advanceSearchHandler} />
        </InputParent>
      ) : (
        <>
          {/* <InputParent>
            <Label textAlign={"right"}>حقوق درخواستی</Label>
            <Controller
              name={ResumeBankKeys.SalaryId}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.salaries}
                  maxWidth={"340px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent> */}
          <InputParent>
            <Label>نام</Label>
            <Controller
              name={ResumeBankKeys.Name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  minWidth={"310px"}
                  maxWidth={"340px"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>نام خانوادگی</Label>
            <Controller
              name={ResumeBankKeys.Family}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  minWidth={"310px"}
                  maxWidth={"340px"}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>جنسیت</Label>
            <Controller
              name={ResumeBankKeys.SexIds}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.sex}
                  maxWidth={"150px"}
                  minWidth={"140px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label textAlign={"right"}>سن</Label>
            <DoubleInput>
              <Controller
                name={ResumeBankKeys.FromBirthDate}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={CvFilters.ages}
                    maxWidth={"110px"}
                    minWidth={"80px"}
                    mobile={false}
                    placeHolder={""}
                    value={value}
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
              <span className="To">تا</span>
              <Controller
                name={ResumeBankKeys.ToBirthDate}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={CvFilters.ages}
                    maxWidth={"110px"}
                    minWidth={"80px"}
                    mobile={false}
                    placeHolder={""}
                    value={value}
                    onChange={onChange}
                    onClear={() => onChange(null)}
                  />
                )}
              />
            </DoubleInput>
          </InputParent>

          <InputParent>
            <Label>رشته تحصیلی</Label>
            <Controller
              name={ResumeBankKeys.EducationCourseIds}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.fieldStudies}
                  maxWidth={"310px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  isMulti
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>مهارت ها و نرم افزارهای مورد نیاز</Label>
            <Controller
              name={ResumeBankKeys.SkillIds}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.skills}
                  maxWidth={"310px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  isMulti
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>وضعیت نظام وظیفه</Label>
            <Controller
              name={ResumeBankKeys.MilitaryServiceIds}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.militaryServices}
                  maxWidth={"310px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  onChange={onChange}
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
          <InputParent>
            <Label>مهارت زبان</Label>
            <Controller
              name={ResumeBankKeys.LanguageIds}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  options={CvFilters.languages}
                  maxWidth={"310px"}
                  minWidth={"110px"}
                  mobile={false}
                  placeHolder={""}
                  value={value}
                  onChange={onChange}
                  isMulti
                  onClear={() => onChange(null)}
                />
              )}
            />
          </InputParent>
        </>
      )}
      <Div>
        <SubmitButton
          type="submit"
          disabled={!Object.values(watch()).some(Boolean)}
        >
          جستجو
        </SubmitButton>
      </Div>
    </Form>
  );
}

function convertToSearchCVQuery(data: IFormInput): Partial<SearchCVQuery> {
  const {
    text,
    cityId,
    name,
    family,
    jobTitle,
    sexIds,
    militaryServiceIds,
    skillIds,
    jobExperienceIds,
    educationCourseIds,
    languageIds,
    fromBirthDate,
    toBirthDate,
    salaryId,
    withoutExperience,
  } = data || {};
  const result: Partial<SearchCVQuery> = {
    text,
    cityId: cityId?.id.toString(),
    name: name,
    family: family,
    jobTitle: jobTitle,
    jobExperienceIds:
      jobExperienceIds?.from && jobExperienceIds?.toEnd && !withoutExperience
        ? getRange(jobExperienceIds.from.id, jobExperienceIds.toEnd.id).join(
            ","
          )
        : undefined,
    sexIds: sexIds?.id.toString(),
    fromBirthDate: fromBirthDate?.id.toString(),
    toBirthDate: toBirthDate?.id.toString(),
    salaryId: salaryId?.id.toString(),
    educationCourseIds: educationCourseIds
      ?.map((item) => item.id.toString())
      .join(","),
    skillIds: skillIds?.map((item) => item.id.toString()).join(","),
    militaryServiceIds: militaryServiceIds?.id.toString(),
    languageIds: languageIds?.map((item) => item.id.toString()).join(","),
  };
  // Remove properties with undefined values
  const filteredInput = Object.fromEntries(
    Object.entries(result).filter(([_, value]) => value !== undefined)
  );
  return filteredInput;
}

function getRange(start: number, end: number) {
  var ret = [];
  for (let i = start; i <= end; i++) {
    ret.push(i);
  }
  return ret;
}
