import React, { useCallback, useEffect, useRef } from "react";
import Box from "../utility/Box";
import styled from "styled-components";
import {
  background,
  color,
  BackgroundProps,
  ColorProps,
  SpaceProps,
  space,
} from "styled-system";
import SearchInput from "./SearchInput";
import _ from "lodash";
import { useAppDispatch } from "@/store/hook";
import { setShowOnHeader } from "../../store/pageConfig";
import Container from "../utility/Container";
import useUrlMaker from "@/hooks/useUrlMaker";
import { useRouter } from "next/router";
import Cities from "@/dictionaries/filterCity.json";
import SelectInput from "./SelectInput";
import { Option, QueryKeys } from "@/types";
const Categories: ICategories = require("@/dictionaries/category.json");
const Jobs = Object.entries(Categories)
  .filter(([key, property]) => property.parent_id === 0)
  .map(([key, property]) => ({ id: property.id, title: property.name }));

interface ICategories {
  [key: string]: {
    [key: string]: any;
  };
}

interface Props {
  color: string;
  bg: string;
}

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
const Title = styled.div`
  color: white;
  margin: auto 0;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  & span {
    font-size: 24px;
  }
`;
const Selects = styled.div`
  display: flex;
  flex: 1 1 100%;
  max-width: 480px;
  min-width: 300px;
  justify-content: center;
`;

const TopSearch: React.FC<Props> = (props: { color: string; bg: string }) => {
  const dispatch = useAppDispatch();
  const [urlStates, updateUrl] = useUrlMaker();
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

  const topSearchRef = useRef<HTMLDivElement | null>(null);

  const showSearchOnHeader = useCallback(
    _.throttle((e: any) => {
      if (window.scrollY > 295) {
        dispatch(setShowOnHeader(true));
      } else {
        dispatch(setShowOnHeader(false));
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", showSearchOnHeader);

    return () => {
      window.removeEventListener("scroll", showSearchOnHeader);
    };
  }, [showSearchOnHeader]);

  return (
    <SearchArea
      display={["none", "flex"]}
      flexDirection={"column"}
      bg={props.bg}
      backgroundImage={"url('/bg/Path 135.svg')"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"contain"}
      height={"265px"}
      ref={topSearchRef}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundPosition={"0px 0px"}
    >
      <Container display={"flex"} flexDirection={"column"}>
        <Content>
          <Title>
            <span>معتبرترین مرجع آگهی‌های استخدام ایران</span>
          </Title>
          <Box
            mb={60}
            mt={"15px"}
            display={"flex"}
            width={"100%"}
            height={"50px"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <SearchInput
              values={urlStates.text}
              maxWidth={"500px"}
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
          </Box>
        </Content>
      </Container>
    </SearchArea>
  );
};
export default TopSearch;
