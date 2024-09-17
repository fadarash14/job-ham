import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";
import simpleFilters from "@/dictionaries/simple-filters.json";
import companyFilters from "@/dictionaries/company-filters.json";
import AdsSideBarSection from "../sidebar/blocks/AdsSection";
import AdsUploadContext from "./AdsUploadContext";
import steps from "./AdsUploadConfig";
import { SelectedCategory } from "../../types";
import Toast from "../Toast/Toast";
import AdsCategoryFinder from "./AdsCategoryFinder";
import AdsCategoryDefaultFilters from "./AdsCategoryDefaultFilters";
import company, { setCompanyId } from "@/store/company";
import { useAppDispatch } from "@/store/hook";
type FilterKeys =
  | "category"
  | "sex"
  | "typeCooperations"
  | "organizationPosts"
  | "company";

type Filters = {
  [K in FilterKeys]: K extends "category"
    ? SelectedCategory | null
    : number & string;
};

const Ul = styled.ul<LayoutProps>`
  list-style-type: none;
  direction: ltr;
  padding-right: 0;
  flex-direction: column;
  margin: 0;
  // max-height: 550px;
  // overflow-y: scroll;
  background: white;
  border-radius: 21px;
  padding: 15px;
  ::-webkit-scrollbar {
    display: none;
  }
  ${layout}
`;

export default function AdsCategoryBuilder() {
  const [level, setLevel] = useState(0);
  const [selectedJob, setSelectedJob] = useState<SelectedCategory | null>(null);
  const {
    setStep,
    setCategory,
    setFilter,
    setSelectedFilter,
    paused,
    setPaused,
    editMode,
    setSex,
    setTypeCooperations,
    setOrganizationPost,
  } = useContext(AdsUploadContext);
  const setJobIdHandler = (job: SelectedCategory) => {
    setSelectedJob(job);
    console.log(job);
    setLevel(1);
  };
  const backToFindJob = () => {
    setLevel(0);
  };
  const dispatch = useAppDispatch();
  const setFilterValuesHandler = (filters: Filters) => {
    let selected_filter: any = {};
    //@ts-ignore
    const totalFilters = simpleFilters.filters.concat(companyFilters.filters);
    for (const key in totalFilters) {
      let i = parseInt(key);
      selected_filter[i + 1] = "";
    }
    setCategory(selectedJob as SelectedCategory);
    //@ts-ignore
    setFilter(totalFilters);
    setSelectedFilter(selected_filter);
    setOrganizationPost(filters.organizationPosts);
    setTypeCooperations(filters.typeCooperations);
    setSex(filters.sex);
    setStep(steps["ads_form"]);
    console.log(filters);
    dispatch(setCompanyId(filters.company));
  };

  return (
    <Fragment>
      <AdsSideBarSection
        title={"معرفی شغل"}
        icon={"../../public/icons/iconly_light_outline_category.svg"}
      >
        <Ul>
          {level === 0 ? (
            <AdsCategoryFinder setJob={setJobIdHandler} />
          ) : (
            <AdsCategoryDefaultFilters
              setFilterValues={setFilterValuesHandler}
              setGoBack={backToFindJob}
            />
          )}
        </Ul>
      </AdsSideBarSection>
      <Toast
        onCancel={() => setPaused(2)}
        confirm
        onConfirm={() => setPaused(-1)}
        isHovering={paused === 1 && !editMode}
        setIsHovering={(e) => setPaused(2)}
        text={"شما یک اگهی نا تمام دارید آیا مایل به ادامه ثبت آن هستید؟ "}
        type={"warning"}
      />
    </Fragment>
  );
}
