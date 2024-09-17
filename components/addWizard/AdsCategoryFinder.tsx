import React, { Dispatch, useCallback, useState } from "react";
import styled from "styled-components";
import JobRawData from "@/dictionaries/jobsRawData.json";
import useSearch from "@/hooks/useSearch";
import { ColorProps, ShadowProps, color, shadow } from "styled-system";
import { SelectedCategory } from "@/types";
import { debounce } from "lodash";
import Image from "next/image";

type Props = {
  setJob: Dispatch<SelectedCategory>;
};
type InputProps = ShadowProps & ColorProps & { hasResult: boolean };

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
const ItemDiv = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    color: white;
    background: #61605f;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding: 0 4px;
  flex-direction: column;
  max-height: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  // margin: 4px 0;
  padding: 6px 4px;
  border-bottom: 1px solid #d9d7d4;
  &:hover {
    color: white;
    background: #d9d7d4;
  }
  & img {
    margin-left: 10px;
  }
`;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 350px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  color: black;
  border-radius: 18px;
  padding: 15px;
  position: absolute;
  z-index: 100;
  top: 40px;
  width: 100%;
  background: white;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Input = styled.input<InputProps>`
  flex: 1 1;
  border: 1px solid white;
  color: black;
  padding-right: 32px;
  font-size: 15px;
  font-weight: 500;
  direction: rtl;
  border: none;
  text-align: right;
  outline: none;
  min-height: 32px;
  border-radius: 8px;

  &:focus {
    outline-style: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  &::-webkit-search-cancel-button:after {
    content: "";
    display: block;
    cursor: pointer;
    background-image: url("/icons/group_1370.svg");
    background-size: contain;
    width: 15px;
    height: 15px;
  }
  &::placeholder {
    font-family: dana;
    color: #474546;
    padding-bottom: 5px;
  }
  ${color}
  ${shadow}
`;

export default function AdsCategoryFinder({ setJob }: Props) {
  const keysToIndex = ["title"];
  const parentJobs = JobRawData.data.jobs.filter((x) => x.parent_id === 0);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<SelectedCategory[]>(parentJobs);
  const { searchTerm, handleSearch, searchResults } = useSearch(
    JobRawData,
    keysToIndex
  );
  const debouncedHandleSearch = useCallback(
    debounce((input: string) => {
      handleSearch(input);
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    if (input === "") {
      debouncedHandleSearch.cancel();
      handleSearch("");
      // setCategory([]);
    } else {
      debouncedHandleSearch(input);
    }
  };
  const setCategoryHandler = (item: SelectedCategory) => {
    setValue(item.title);
    if (item.has_child) {
      const _category: SelectedCategory[] = JobRawData.data.jobs.filter(
        (x) => x.parent_id === item.id
      );
      handleSearch("");
      setCategory(_category);
    } else {
      setJob(item);
    }
  };
  const sumbitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategory(searchResults as SelectedCategory[]);
    handleSearch("");
  };
  const goBackHandler = () => {
    const layer = category[0].layer - 1;
    const parent_id = category[0].parent_id;
    if (layer === 1) {
      setCategory(parentJobs);
    } else {
      const newCat = JobRawData.data.jobs.filter(
        (x) => x.layer === layer && x.parent_id === parent_id - 1
      );

      setCategory(newCat);
    }
    handleSearch("");
    setValue("");
  };

  return (
    <Container onSubmit={sumbitHandler} dir="rtl">
      {category[0].layer !== 1 && (
        <div>
          <Image
            onClick={goBackHandler}
            src={"/icons/arrow right.svg"}
            alt="arrow"
            width={28}
            height={28}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <Input
        hasResult={category.length > 0}
        type="search"
        placeholder="جستجو دسته بندی ها ..."
        value={value}
        onChange={handleInputChange}
      />
      {value !== "" && searchResults.length > 0 && (
        <DropDown>
          {searchResults.map((res, index) => {
            return (
              <ItemDiv
                onClick={() => setCategoryHandler(res as SelectedCategory)}
                key={index}
              >
                {res.title}
              </ItemDiv>
            );
          })}
        </DropDown>
      )}
      {category.length > 0 && (
        <List>
          {category.map((cat, index) => {
            return (
              <ListItem onClick={() => setCategoryHandler(cat)} key={index}>
                {cat.title}
                {cat.has_child && (
                  <Image
                    src={"/icons/ads-left-arrow.svg"}
                    alt="arrow"
                    width={14}
                    height={14}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
}
