import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange?: any;
}

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  text-align: center;
  position: relative;
  width: 20px;
  height: 20px;
  // padding-left: 28px;
  margin-right: 16px;
  cursor: pointer;
  user-select: none;
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  &:after {
    content: "";
    display: ${(props: CheckboxProps) => (props.checked ? "block" : "none")};
    position: absolute;
    left: 5px;
    top: 5px;
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 2px;
    transition: all 0.2s ease;
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <>
      <CheckboxInput checked={checked} onChange={onChange} />
      {/* @ts-ignore */}
      <CheckboxLabel checked={checked} onClick={onChange}></CheckboxLabel>
    </>
  );
};

export default Checkbox;
