import React, { useState } from "react";
import styled from "styled-components";
import SelectInput from "../search/SelectInput";
const FilterData: ICategories = require("@/dictionaries/company-filters.json");
import Cities from "@/dictionaries/filterCity.json";
import { useRouter } from "next/router";
interface ICategories {
  [key: string]: {
    [key: string]: any;
  };
}
interface Option {
  id: number;
  title: string;
}
const CompanyJobs: Option[] = FilterData.filters.find(
  (x: any) => x.id === 23
).options;
const MobileFilters = () => {
  return (
    <WrapFilterSelective>
      <FilterSelectItem
        title="دسته بندی فعالیت شرکت‌ها"
        keyQuery="industryId"
        options={CompanyJobs}
      />
      <FilterSelectItem
        title="شهر محل فعالیت"
        keyQuery="cityId"
        options={Cities}
      />
    </WrapFilterSelective>
  );
};

export default MobileFilters;

const WrapFilterSelective = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* min-height: 100%; */
`;

interface IPropsItem {
  keyQuery: string;
  options: Option[];
  title: string;
}

const FilterSelectItem = ({ keyQuery, options, title }: IPropsItem) => {
  const router = useRouter();

  const keyQueryRouter = router.query[keyQuery];
  const defaultState = keyQueryRouter
    ? options.find((i) => i.id === parseInt(keyQueryRouter as string)) || null
    : null;

  const [selectedItem, setSelectedItem] = useState<Option | null>(defaultState);

  const handleChange = (item: Option) => {
    const selectedId = item.id.toString();
    setSelectedItem(item);
    router.push(
      { query: { ...router.query, [keyQuery]: selectedId } },
      undefined,
      { shallow: true }
    );
  };
  const handleClear = () => {
    setSelectedItem(null);
    const { [keyQuery]: deletedQuery, ...newQuery } = router.query;
    router.push({ query: newQuery }, undefined, { shallow: true });
  };

  return (
    <SelectContainer>
      <Label>{title}</Label>
      <SelectInput
        mobile={true}
        placeHolder=""
        options={options}
        value={selectedItem}
        onChange={handleChange}
        minWidth={"160px"}
        maxWidth={"160px"}
        onClear={handleClear}
      />
    </SelectContainer>
  );
};

const Label = styled.label`
  font-size: 12px;
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 5px;
`;
