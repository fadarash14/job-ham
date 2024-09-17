import React, { useContext } from "react";
import styled from "styled-components";
import AdsUploadContext from "./AdsUploadContext";
import CheckBoxFilterAds from "./adsUploadFilter/Checkbox";
import NumberFilterAdsUpload from "./adsUploadFilter/Number";
import LineCheck from "./adsUploadFilter/lineCheck";
import BooleanFilter from "./adsUploadFilter/Boolean";
import { layout, LayoutProps } from "styled-system";
import SimpleInput from "./Input";
import simpleFilters from "@/dictionaries/simple-filters.json";
import MultiSelect from "./adsUploadFilter/MultiSelect";
import MultiSelectModal from "./adsUploadFilter/MultiSelectModal";
import ExplainInput from "./ExplainInput";

const Title = styled.div`
  color: #474546;
  font-weight: 450;
  margin-bottom: 10px;
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
export default function MainFilters({
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
  const { setLevel, selectedFilter, level } = useContext(AdsUploadContext);
  const filters = simpleFilters.filters;
  let filter: any[] = [];
  if (filters) {
    filters
      .filter((f: any) => (main ? !f["is_verification"] : f["is_verification"]))
      .filter((x) => !x.is_companyInfo)
      .map((_filter: any, i: number) => {
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

  return (
    <Div display="block">
      <Title>{label}</Title>
      {filter}
    </Div>
  );
}

MainFilters.defaultProps = {
  proceed: false,
};
