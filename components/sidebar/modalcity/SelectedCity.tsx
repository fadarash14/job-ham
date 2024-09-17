import React from "react";
import Selected from "../../../public/icons/arrow right.svg";
import styled from "styled-components";
import { useRouter } from "next/router";
import { LayoutProps, layout } from "styled-system";
import { City } from "../../../types";
const ostanList: {
  [key: string]: City;
} = require("../../../dictionaries/parent_city.json");
const cityList: {
  [key: string]: City;
} = require("../../../dictionaries/city.json");

const Span = styled.div<LayoutProps>`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 8px;
  align-items: center;
  &::after {
    content: "";
    display: block;
    height: 1px;
    background: #fcc155;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  @media (max-width: 576px) {
    margin-bottom: 0px;
    &::after {
      display: none;
    }
  }
  ${layout}
`;

function SelectedCity({
  city,
  back,
  ostan,
}: {
  city: string;
  ostan: string;
  back: Function;
}) {
  const icon = {
    cursor: "pointer",
    marginLeft: "12px",
  };

  return (
    <Span display={city || ostan ? "flex" : "none"}>
      <Selected style={icon} onClick={back} />
      {city ? cityList[city]["name"] : ostan ? cityList[ostan]["name"] : ""}
    </Span>
  );
}

export default SelectedCity;
