import React, { useMemo, useRef } from "react";
import SelectInput from "@/components/search/SelectInput";
import SearchInput from "../search/SearchInput";
import styled from "styled-components";
import Box from "../utility/Box";
import Container from "../utility/Container";
import {
  background,
  color,
  BackgroundProps,
  border,
  ColorProps,
  SpaceProps,
  space,
} from "styled-system";
import Image from "next/image";
import { Option, QueryKeys } from "@/types";
import Cities from "@/dictionaries/filterCity.json";
import useUrlMaker from "@/hooks/useUrlMaker";
import { useAppDispatch } from "@/store/hook";
import { OpenJobsFiltersModal } from "@/store/pageConfig";
import Badge from "../utility/badge";
const Categories: ICategories = require("@/dictionaries/category.json");
interface ICategories {
  [key: string]: {
    [key: string]: any;
  };
}
const Jobs = Object.entries(Categories)
  .filter(([key, property]) => property.parent_id === 0)
  .map(([key, property]) => ({ id: property.id, title: property.name }));

const SearchArea = styled((props) => <Box {...props} />)<
  BackgroundProps | ColorProps
>`
  ${background}
  ${color}
`;

const Content = styled.div<SpaceProps>`
  margin: auto 0;
  & .selects {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  & .yellowButton {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  ${space}
`;
const Selects = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Div = styled.div`
  display: none;
  justify-content: flex-end;
  position: relative;
  @media (max-width: 1200px) {
    display: flex;
    margin-right: 10px;
  }
`;

type Props = {
  color: string;
  bg: string;
};
export default function TopSearchJobs(props: Props) {
  const topSearchRef = useRef<HTMLDivElement | null>(null);
  const [urlStates, updateUrl] = useUrlMaker();
  const dispatch = useAppDispatch();
  const onChangeHandler = (key: QueryKeys, value: Option) => {
    updateUrl({
      [key]: value?.id,
    });
  };
  const currentJobFilter = Jobs.find((x) => {
    if (x.id == urlStates.jobId) {
      return x;
    }
    return null;
  });
  const currentCityFilter = Cities.find((x) => {
    if (x.id == urlStates.cityIds) {
      return x;
    }
    return null;
  });
  const openFilterJobModalHandler = () => {
    dispatch(OpenJobsFiltersModal(true));
  };
  const filtersCounter = useMemo(() => {
    const { sort, skip, limit, text, ...filtersItem } = urlStates;
    let count = 0;
    const values = Object.values(filtersItem);
    for (const key of values) {
      if (key && key.length > 0) {
        count++;
      }
    }
    return count;
  }, [urlStates]);
  console.log(urlStates);

  return (
    <SearchArea
      display={["flex", "flex", "flex"]}
      flexDirection={"column"}
      bg={props.bg}
      backgroundImage={"url('/bg/Path 135.svg')"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"contain"}
      height={"70px"}
      ref={topSearchRef}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundPosition={"0px 0px"}
    >
      <Container
        paddingLeft={"10px"}
        paddingRight={"10px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Content>
          <Box
            mb={10}
            mt={"15px"}
            display={"flex"}
            width={"100%"}
            height={"50px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SearchInput
              values={urlStates.text}
              maxWidth={"100%"}
              minWidth={"250px"}
              fullSize
              bg={"paleGrey"}
              mobile={false}
              onClear={() => onChangeHandler(QueryKeys.Text, null)}
            />
            <Selects className="selects">
              <SelectInput
                placeHolder={"دسته بندی شغلی"}
                options={Jobs}
                maxWidth={"230px"}
                minWidth={"150px"}
                mobile={false}
                value={currentJobFilter}
                onChange={(e: Option) => onChangeHandler(QueryKeys.JobId, e)}
                onClear={() => onChangeHandler(QueryKeys.JobId, null)}
              />
              <SelectInput
                placeHolder={"انتخاب استان"}
                options={Cities}
                maxWidth={"230px"}
                minWidth={"150px"}
                mobile={false}
                value={currentCityFilter}
                onChange={(e: Option) => onChangeHandler(QueryKeys.CityIds, e)}
                onClear={() => onChangeHandler(QueryKeys.CityIds, null)}
              />
            </Selects>
            <Div onClick={openFilterJobModalHandler}>
              <Image
                src={"/icons/filters.svg"}
                width={30}
                height={30}
                alt="فیلتر"
              />
              <Badge count={filtersCounter} />
            </Div>
          </Box>
        </Content>
      </Container>
    </SearchArea>
  );
}
