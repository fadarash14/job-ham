import React from "react";
import styled from "styled-components";
import { PositionProps, layout, LayoutProps } from "styled-system";
import { numSeparator } from "../../utils/helper";
import FilterRow from "./Meta";
const X: {
  [key: string]: { type: "string" };
} = require("../../dictionaries/filters_key.json");

const Feature = styled.div<LayoutProps>`
  color: #707070;
  font-size: 14px;
  text-align: center;
  // &:not(:last-child)::after{
  // display:block;
  // content: "";
  // width:1px;
  // height:50%;
  // background:#db143d;
  // margin:0 5px;
  // margin-top:auto;
  // }
  ${layout}
`;
const Number = styled.div`
  color: #474546;
  font-weight: 600;
  font-size: 15px;
  &::after {
    content: "";
    display: block;
    background: #fcc155;
    height: 1px;
    width: 100%;
    margin: 10px 0;
  }
`;

const Unit = styled.div`
  font-weight: 600;
  color: #acacac;
`;

const Filters = (props: {
  value: any;
  show: boolean;
  unit: string;
  label: string;
  type: string;
}) => {
  return (
    <Feature display={props.show ? "flex" : "none"}>
      <div>
        <Number>
          {props.value
            ? String(X[props.type]?.type) == "suggestionnumber"
              ? `${numSeparator(props.value)}`
              : String(X[props.type]?.type) == "number"
              ? `${numSeparator(props.value)}`
              : props.value
            : "درچ نشده"}
        </Number>
        <Unit>{props.unit}</Unit>
      </div>
    </Feature>
  );
};

export default Filters;
Filters.defaultProps = {
  unit: "",
  value: "",
  type: "",
};
