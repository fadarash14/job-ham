import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

type FilterProps = {
  title: string;
  data: { title: string; id: number }[];
  keyQuery: string;
};

const FilterContainer = styled.div`
  width: 75%;
`;

const FilterTitle = styled.h3`
  color: #474546;
  margin: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 12px;
  input {
    margin-right: 5px;
    background-color: #e4e4e4;
  }
`;
const List = styled.div`
  background-color: rgb(255, 255, 250);
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  padding-top: 14px;
  margin: 10px;
  max-height: 400px;
  overflow: auto;
`;

export default function Filter({ title, data, keyQuery }: FilterProps) {
  const router = useRouter();
  const defaultState = router.query[keyQuery]
    ? parseInt(router.query[keyQuery] as string)
    : null;
  const [selectedItem, setSelectedItem] = useState<number | null>(defaultState);

  const handleCheckboxChange = (value: number) => {
    setSelectedItem(value === selectedItem ? null : value);
    if (value === selectedItem) {
      delete router.query[keyQuery];
    } else {
      router.query[keyQuery] = value.toString();
    }
    router.push(router);
  };

  return (
    <FilterContainer>
      <FilterTitle>{title}</FilterTitle>
      <List>
        {data.map((item) => (
          <CheckboxContainer key={item.id}>
            <input
              type="checkbox"
              value={item.id}
              checked={item.id === selectedItem}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <label>{item.title}</label>
          </CheckboxContainer>
        ))}
      </List>
    </FilterContainer>
  );
}
