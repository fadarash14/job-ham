import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutProps, space, layout, SpaceProps } from "styled-system";
import { numSeparator } from "../../utils/helper";
// import { AppBar } from "../header/appBar";
const X: {
  [key: string]: { type: "string" };
} = require("../../dictionaries/filters_key.json");

const FilterOnes = styled.div<SpaceProps | LayoutProps>`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  ${layout}
  ${space}
`;

const Div = styled.div<LayoutProps>`
  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background: #d1d1d1;
    margin: 10px 0;
  }
  &:not(:first-child) {
    margin-bottom: 10px;
  }
  ${layout}
`;

const Text = styled.div`
  font-weight: 600;
  color: #acacac;
`;
const FilterFalseVisible = (props: {
  value: any;
  unit: string;
  label: string;
  filterKey: string;
}) => {
  function numberWithCommas(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [parseValue, setParseValue] = useState<string | number>();

  useEffect(() => {
    setParseValue(props.value);
    if (
      props.filterKey === "rent" ||
      "deposit" ||
      "price" ||
      "carprice" ||
      "realestateprice"
    ) {
      if (props.value) setParseValue(numberWithCommas(props?.value));
    }

    if (
      props.filterKey === "rent" ||
      "deposit" ||
      "price" ||
      "carprice" ||
      "realestateprice"
    ) {
      if (
        props.value === null ||
        props.value === undefined ||
        props.value === ""
      )
        setParseValue("توافقی");
    }
  }, [props.filterKey]);

  return (
    <Div>
      <FilterOnes>
        <Text>{props.unit}</Text>
        <div style={{ fontSize: "13px", fontWeight: 600 }}>
          {parseValue ? parseValue : "درج نشده"}
        </div>
      </FilterOnes>
    </Div>
  );
};

export default FilterFalseVisible;

FilterFalseVisible.defaultProps = {
  type: "",
};
