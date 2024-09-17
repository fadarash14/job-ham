import React, { useCallback } from "react";
import styled from "styled-components";
import SelectInput from "@/components/search/SelectInput";
import { Option, QueryKeys } from "@/types";
import CvFilters from "@/dictionaries/cv-filters.json";
import AdFilters from "@/dictionaries/simple-filters.json";
import useUrlMaker from "@/hooks/useUrlMaker";

interface IFilters {
  organizationPosts: Option;
  typeCooperations: Option;
  experiences: Option;
  salaries: Option;
  advantages: Option;
  otherOptions: Option;
}
type IState = {
  [key in QueryKeys]: any;
};

const SelectsDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const filterOptions: {
  options: Option[];
  property: QueryKeys;
  placeholder: string;
  currentValue: (urlState: IState) => Option;
}[] = [
  {
    options: CvFilters.organizationPosts,
    property: QueryKeys.OrganizationPostIds,
    placeholder: "پست سازمانی",
    currentValue: function (urlStates) {
      return findCurrentValue(urlStates, this.options, this.property);
    },
  },
  {
    options: CvFilters.typeCooperations,
    property: QueryKeys.TypeCooperationIds,
    placeholder: "نوع همکاری",
    currentValue: function (urlStates) {
      return findCurrentValue(urlStates, this.options, this.property);
    },
  },
  {
    options: CvFilters.experiences,
    property: QueryKeys.ExperienceId,
    placeholder: "سابقه کار",
    currentValue: function (urlStates) {
      return findCurrentValue(urlStates, this.options, this.property);
    },
  },
  {
    options: CvFilters.salaries,
    property: QueryKeys.SalaryId,
    placeholder: "حقوق",
    currentValue: function (urlStates) {
      return findCurrentValue(urlStates, this.options, this.property);
    },
  },
  {
    options: AdFilters.filters[2].options!,
    property: QueryKeys.AdvantageIds,
    placeholder: "مزایا و تسهیلات",
    currentValue: function (urlStates) {
      return findCurrentValue(urlStates, this.options, this.property);
    },
  },
];
function findCurrentValue(
  urlStates: IState,
  options: Option[],
  property: QueryKeys
) {
  const id = urlStates[property];
  return options.find((x) => x?.id == id) || null;
}

export const JobSearchFilters = () => {
  const [urlStates, updateUrl] = useUrlMaker();
  const onChangeHandler = useCallback(
    (value: Option, property: QueryKeys) => {
      updateUrl({
        [property]: [value?.id],
      });
    },
    [updateUrl]
  );

  const onClearHandler = useCallback(
    (property: QueryKeys) => {
      updateUrl({
        [property]: null,
      });
    },
    [updateUrl]
  );
  return (
    <SelectsDiv className="container">
      {filterOptions.map((filterOption, index) => (
        <SelectInput
          key={index}
          options={filterOption.options}
          maxWidth="100%"
          minWidth="200px"
          mobile={false}
          placeHolder={filterOption.placeholder}
          value={filterOption.currentValue(urlStates)}
          onChange={(e: Option) => onChangeHandler(e, filterOption.property)}
          onClear={() => onClearHandler(filterOption.property)}
        />
      ))}
    </SelectsDiv>
  );
};
