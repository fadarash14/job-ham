import React, { ChangeEvent, useEffect, useState } from "react";
import Search from "../../../public/icons/search yellow.svg";
import DiSelect from "../../public/icons/select.svg";
import Select from "../../public/icons/selected.svg";
import styled from "styled-components";
import { Item, SelectedCities } from "../../types";
import Image from "next/image";
import { space, SpaceProps } from "styled-system";
import { string } from "prop-types";
const cityList: {
  [key: string]: {
    id: number;
    name: string;
    lat: number;
    lang: number;
    areas: {
      [k: string]: { id: number; name: string; lat: number; long: number };
    };
  };
} = require("../../dictionaries/city.json");
const InputText = styled.input`
  width: 100%;
  height: 33px;
  border-radius: 10px;
  border: 1px solid #1c474546;
  color: #acacac;
  padding-right: 32px;
  font-size: 12px;
  direction: rtl;
  z-index: 2;

  &:focus {
    outline-style: none;
  }
`;

const Form = styled.div`
  position: relative;
`;

const List = styled.ul`
  padding-right: 10px;
  padding-left: 20px;
  list-style-type: none;
  direction: rtl;
  margin-top: 18px;
  height: 100vh;
`;

const Li = styled.li`
  margin: 10px 0;
  display: flex;
  position: relative;
  padding-bottom: 11px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    margin-top: 10px; // @ts-ignore
    height: 1px;
    background: #d1d1d1;
    opacity: 76%;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

const Div = styled.div`
  overflow-y: scroll;
  position: relative;
  direction: ltr;
`;

const Input = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const Img = styled.div<SpaceProps>`
  position: absolute;
  z-index: 20;
  right: 10px;
  height: 15px;
  ${space}
`;

function NeighborhoodAds({
  city,
  setSelected,
  selected,
}: {
  city: string;
  setSelected: Function;
  selected: SelectedCities;
}) {
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    //@ts-ignore
    // console.log(Object.keys(cityList?.[city]?.['areas']).length)
    //@ts-ignore
    if (Object.keys(cityList?.[city]?.["areas"]).length === 0) {
      // @ts-ignore
      setSelected(0, cityList[city]["name"]);
    }
  }, []);
  function search(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // console.log(value)
    setFilterString(value);
  }

  const filtredNeighorhood =
    filterString &&
    filterString.length > 0 &&
    city &&
    cityList?.[city]?.["areas"]
      ? // @ts-ignore
        Object.keys(cityList[city]["areas"])?.filter((area: string) =>
          area.includes(filterString)
        )
      : // @ts-ignore
      cityList?.[city]?.["areas"]
      ? // @ts-ignore
        Object.keys(cityList[city]["areas"])
      : setSelected(false, cityList[city]["name"]);

  return (
    <Form>
      {
        <Input>
          <InputText
            onChange={search}
            type="text"
            placeholder="جـسـتـجو مـحلـه"
          />
          <Img>
            <Image
              height={15}
              width={15}
              src={"/icons/grey-search-icon.svg"}
              alt=""
            />
          </Img>
        </Input>
      }
      <Div className={"scroll-d-none"}>
        <List>
          {city && cityList[city]["areas"]
            ? // @ts-ignore
              Object.values(filtredNeighorhood).map(
                // @ts-ignore
                (area: string, i: number) => (
                  <Li
                    key={i}
                    onClick={() => {
                      //@ts-ignore
                      setSelected(area, cityList[city]["name"]);
                    }}
                  >
                    {cityList[city]["areas"][area]["name"]}
                  </Li>
                )
              )
            : ""}
        </List>
      </Div>
    </Form>
  );
}

export default NeighborhoodAds;
