import { AdCvs } from "@/types";
import { useRouter } from "next/router";
import React, { Dispatch } from "react";
import styled from "styled-components";
const Filtering = styled.div`
  height: auto;
  width: 100%;
  background-color: transparent;
  border: 1px solid #d6d6d6;
  position: relative;
  padding: 15px 10px;
  margin-bottom: 20px;
  .title {
    position: absolute;
    top: -10px;
    right: 20px;
    background-color: #f5f6fa;
    width: 70px;
    text-align: center;
    font-size: 12px;
  }
  .row {
    display: flex;
    align-items: center;
    color: #8e8e8e;
    font-size: 12px;
    margin-bottom: 10px;
    .line {
      width: 90%;
      height: 1px;
      background-color: #707070;
      opacity: 0.5;
      margin: 0 5px;
    }
    input[type="checkbox"] {
      accent-color: #db143d;
    }
    label {
      white-space: nowrap;
    }
  }
`;
type Props = {
  types: any[];
  title: string;
  checked: string | string[]|undefined;
  setChecked: Dispatch<string>;
  count: number;
  data: AdCvs[];
};
const Filter = ({ types, title, checked, setChecked, count, data }: Props) => {
  const router = useRouter();
  const handleChange = (status: string) => {
    setChecked(status);
    router.push(
      {
        pathname: "/resumeList",
        query: {
          id: router.query.id,
          filter: status,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Filtering>
      <div className="title">{title}</div>
      {types.map((type, index) => (
        <div key={index} className="row">
          <input
            type="checkbox"
            value={type.status}
            checked={checked === type.status}
            onChange={() => handleChange(type.status)}
          />
          <label>{type.label}</label>
          <div className="line"></div>
          <div className="count">
            {type.status === "ALL"
              ? count
              : data.filter((item) => item.status === type.status).length}
          </div>
        </div>
      ))}
    </Filtering>
  );
};

export default Filter;
