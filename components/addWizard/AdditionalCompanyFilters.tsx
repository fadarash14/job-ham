import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AdsUploadContext from "./AdsUploadContext";
import CheckBoxFilterAds from "./adsUploadFilter/Checkbox";
import NumberFilterAdsUpload from "./adsUploadFilter/Number";
import LineCheck from "./adsUploadFilter/lineCheck";
import BooleanFilter from "./adsUploadFilter/Boolean";
import SimpleInput from "./Input";
import simpleFilters from "@/dictionaries/company-filters.json";
import MultiSelect from "./adsUploadFilter/MultiSelect";
import MultiSelectModal from "./adsUploadFilter/MultiSelectModal";
import ExplainInput from "./ExplainInput";
import Box from "../utility/Box";
import {
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  border,
} from "styled-system";
import CompanyCityAreaModal from "./CompanyCityAreaModal";
import UploadProfile from "../cv/UploadProfile";

const Title = styled.div`
  color: #474546;
  font-weight: 450;
  margin-bottom: 10px;
`;
const Hint = styled.div`
  color: #db143d;
  font-size: 12px;
  margin-bottom: 10px;
`;
const FlexInput = styled.div<FlexboxProps | SpaceProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 360px;
  ${flexbox}
  ${space}
`;
const Topic = styled.div<BorderProps>`
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  flex: 1 1 90%;
  height: 40px;
  ${border}
`;

const Div = styled.div<LayoutProps>`
  margin-top: 40px;
  &::before {
    content: "";
    display: block;
    height: 1px;
    background: #d1d1d1;
    margin: 20px 0;
    width: 100%;
  }
  ${layout}
`;
const TickPos = styled.div<LayoutProps>`
  display: flex;
  min-width: fit-content;
  ${layout}
`;
const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  &.map {
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    width: 20px;
    position: absolute;
  }
  ${layout}
  ${flexbox}
    ${space}
`;
const Tick = styled.div<LayoutProps>`
  margin: auto 10px auto 0;
  ${layout}
`;
const UploadWrapper = styled.div`
  width: 400px;
  @media (max-width: 470px) {
    width: 200px;
  }
  & .image-item {
    // display: none;
  }
`;
const Text = styled.div`
  font-size: 11px;
  color: #707070;
  align-items: center;
  margin-bottom: 8px;
  display: flex;
`;
const Span = styled.div`
  font-size: 14px;
  color: #474546;
  margin-bottom: 8px;
`;

export default function AdditionalCompanyFilters({
  main,
  label,
  proceed,
  message,
}: {
  main: boolean;
  label: string;
  proceed: boolean;
  message: string;
}) {
  const [show, setShow] = useState(false);
  const [validity, setValidity] = useState(false);
  const [profile, setProfile] = useState<string>("");
  const { selectedFilter, level, setSelectedFilter, companyArea, companycity } =
    useContext(AdsUploadContext);
  const onShow = () => {
    setShow(true);
  };
  const filters = simpleFilters.filters;
  let filter: any[] = [];
  const handleProfile = useCallback(
    (value: string) => {
      setProfile(value);
      setSelectedFilter({ ...selectedFilter, [30]: value });
    },
    [setProfile, setSelectedFilter]
  );

  if (filters) {
    filters
      .filter((f: any) => f["is_additional"])
      .map((_filter: any, i: number) => {
        if (_filter.id === 30) {
          filter.push(
            <>
              <Span>تصویر لوگو شرکت</Span>
              <UploadWrapper>
                <UploadProfile
                  setImage={handleProfile}
                  image={profile!}
                  // proceed={validity}
                  // message={message}
                  key={i}
                />
              </UploadWrapper>
            </>
          );
        }
        switch (_filter.type) {
          case "radio":
          case "checkbox":
            filter.push(
              <CheckBoxFilterAds
                //@ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
                continue={proceed}
                //@ts-ignore
                message={message}
              />
            );
            break;

          case "multiradio":
            filter.push(
              <MultiSelect
                //@ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
                continue={proceed}
                //@ts-ignore
                message={message}
              />
            );
            break;
          case "modalradio":
            filter.push(
              <MultiSelectModal
                //@ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
                continue={proceed}
                //@ts-ignore
                message={message}
              />
            );
            break;

          case "number":
          case "suggestionnumber":
            filter.push(
              <NumberFilterAdsUpload
                // @ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
                continue={proceed}
                message={message}
              />
            );
            break;
          case "boolean":
            filter.push(
              <BooleanFilter
                // @ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
              />
            );
            break;

          case "suggestionstring":
            filter.push(
              <SimpleInput
                filters={_filter}
                continue={proceed}
                message={message}
                key={i}
                // @ts-ignore
                val={selectedFilter[_filter.id]}
              />
            );
            break;

          case "textArea":
            filter.push(
              <ExplainInput
                filters={_filter}
                continue={proceed}
                message={message}
                placeHolder={_filter?.placeholder}
                key={i}
                // @ts-ignore
                val={selectedFilter[_filter.id]}
              />
            );
            break;

          case "lineradio":
          case "linecheck":
            filter.push(
              <LineCheck
                //@ts-ignore
                val={selectedFilter[_filter.id]}
                filters={_filter}
                key={i}
                continue={proceed}
                //@ts-ignore
                message={message}
              />
            );
            break;
        }
      });
  }
  // console.log(filter);

  return (
    <Div display="block">
      <Title>{label}</Title>
      {filter}
      {!main && (
        <Hint>هیچ یک از اطلاعات ثبت شده به کارجویان نمایش داده نمی شود</Hint>
      )}
      <CompanyCityAreaModal show={show} setshow={setShow} />
    </Div>
  );
}

AdditionalCompanyFilters.defaultProps = {
  proceed: false,
};
