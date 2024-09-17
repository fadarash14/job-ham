import React from "react";
import styled from "styled-components";
import { LayoutProps, layout } from "styled-system";
import { numSeparator } from "../../utils/helper";
const X: {
  [key: string]: { type: "string" };
} = require("../../dictionaries/filters_key.json");

const FilterBox = styled.div`
  width: 100%;
`;

const Div1 = styled.div<LayoutProps>`
  display: flex;
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
`;
const Text = styled.div`
  font-size: 12px;
  opacity: 32%;
`;
const OnCard = (props: {
  label: string;
  value: string;
  show: boolean;
  unit: string;
  type: string;
}) => {
  return (
    <Div1 display={props.show ? "flex" : "none"}>
      <FilterBox className="meta">
        <Text>{props.label}</Text>
        <Div>
          <Value>
            {props.value
              ? String(X[props.type]?.type) == "suggestionnumber"
                ? `${numSeparator(props.value)}`
                : String(X[props.type]?.type) == "number"
                ? `${numSeparator(props.value)}`
                : props.value
              : "درچ نشده"}
          </Value>
          <Text>{props.unit}</Text>
        </Div>
      </FilterBox>
    </Div1>
  );
};
OnCard.defaultProps = {
  unit: "",
};
export default OnCard;
