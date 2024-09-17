import React, { useEffect, useState } from "react";
import { Filter } from "../../types";
import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";

const FilterBox = styled.div`
  width: 100%;
  margin-top: 5.5px;
`;

const Div1 = styled.div<LayoutProps>`
  display: flex;
  flex: 1 1 50%;
  min-width: 50%;
  &:not(:last-child)::after {
    display: block;
    content: "";
    width: 1px;
    height: 50%;
    background: #db143d;
    margin: 0 10px;
    margin-top: auto;
  }
  ${layout}
`;
const Div = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
`;

const Value = styled.div`
  margin-left: 10px;
  font-size: 12px;
  width: max-content;
`;
const Text = styled.div`
  font-size: 12px;
  opacity: 32%;
  margin-bottom: 3px;
`;
const FilterRow = (props: {
  label: string;
  value: any;
  unit: string;
  show: boolean;
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
      props.filterKey === "deposit" ||
      props.filterKey === "price" ||
      props.filterKey === "carprice" ||
      props.filterKey === "realestateprice"
    ) {
      // console.log('inside if',props.filterKey)
      if (props.value) setParseValue(numberWithCommas(props?.value));
    }

    if (
      props.filterKey === "rent" ||
      props.filterKey === "deposit" ||
      props.filterKey === "price" ||
      props.filterKey === "carprice" ||
      props.filterKey === "realestateprice"
    ) {
      if (
        props.value === null ||
        props.value === undefined ||
        props.value === ""
      )
        setParseValue("توافقی");
    }
  }, [props.value]);

  return (
    <Div1 display={props.show ? "flex" : "none"}>
      <FilterBox className="meta">
        <Text>{props.label}</Text>
        <Div>
          <Value>{parseValue ? parseValue : "درچ نشده"}</Value>
          <Text>{props.unit}</Text>
        </Div>
      </FilterBox>
    </Div1>
  );
};
FilterRow.defaultProps = {
  unit: "",
  value: "",
  type: "",
};
export default FilterRow;
