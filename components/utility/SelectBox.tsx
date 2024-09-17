import React, { useState } from "react";
import styled from "styled-components";

interface SelectOption {
  value: number;
  label: string;
}

interface SelectBoxProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const SelectedOption = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #333;
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  width: 100%;
  &:after {
    content: "\f0d7";
    font-family: FontAwesome;
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const OptionList = styled.ul`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: none;
  list-style: none;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  ${Container}:hover & {
    display: block;
  }
`;

const OptionItem = styled.li`
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setShowOptions(false);
    onChange(option);
  };

  return (
    <Container>
      <SelectedOption onClick={() => setShowOptions(!showOptions)}>
        {selectedOption?.label || "Select an option"}
      </SelectedOption>
      <OptionList>
        {options.map((option) => (
          <OptionItem
            key={option.value}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionList>
    </Container>
  );
};

export default SelectBox;
