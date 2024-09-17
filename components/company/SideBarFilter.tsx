import React from "react";
import Filter from "./Filter";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
const Categories: ICategories = require("@/dictionaries/category.json");
const FilterData: ICategories = require("@/dictionaries/company-filters.json");
import Cities from "@/dictionaries/filterCity.json";

interface ICategories {
  [key: string]: {
    [key: string]: any;
  };
}
interface Option {
  id: number;
  title: string;
}

const Wrapper = styled.aside<LayoutProps | SpaceProps>`
  flex-basis: 25%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 870px) {
    display: none !important;
  }
  @media (max-width: 1300px) {
    flex-basis: 35%;
  }
  display: flex;
  flex-direction: row;
  max-height: 1000px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ${layout}
  ${space}
`;
const Jobs = Object.entries(Categories)
  .filter(([key, property]) => property.parent_id === 0)
  .map(([key, property]) => ({ id: property.id, title: property.name }));

const CompanyJobs: Option[] = FilterData.filters.find(
  (x: any) => x.id === 23
).options;
const CompanySize: Option[] = FilterData.filters.find(
  (x: any) => x.id === 27
).options;

export default function SideBarFilter() {
  return (
    <Wrapper display={["none", "none", "flex", "flex"]} ml={[0, "20px"]}>
      <Filter
        keyQuery={"industryId"}
        title="دسته بندی فعالیت شرکت ها"
        data={CompanyJobs}
      />
      <Filter keyQuery={"cityId"} title="شهر محل فعالیت" data={Cities} />
      {/* <Filter title="نوع مالکیت" data={OwnerShip} /> */}
      {/* <Filter title="اندازه سازمان" data={CompanySize} /> */}
    </Wrapper>
  );
}
