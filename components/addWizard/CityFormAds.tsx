import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import Search from "../../../public/icons/search yellow.svg";
import styled from "styled-components";
import {
  layout,
  DisplayProps,
  SpaceProps,
  space,
  LayoutProps,
} from "styled-system";
import Image from "next/image";
import { Item } from "../../types";
import cityList from "../../dictionaries/city.json";

const InputText = styled.input<InputHTMLAttributes<any>>`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #1c474546;
  color: #acacac;
  padding-right: 32px;
  font-size: 12px;
  direction: rtl;
  z-index: 2;
  height: 33px;
  &:focus {
    outline-style: none;
  }
`;

const Input = styled.div`
  position: relative;
  display: flex;
  align-items: Center;
`;

const CityF = styled.div<DisplayProps | SpaceProps>`
  position: relative;
  ${layout}
`;

const List = styled.ul<LayoutProps>`
  padding-left: 20px;
  list-style-type: none;
  direction: rtl;
  margin-top: 18px;
  padding-right: 10px;
  overflow-y: scroll;
  height: 100vh;
  overscroll-behavior: contain;
  ${layout}
`;

const Li = styled.li`
  cursor: pointer;
  margin: 10px 0;

  &::after {
    content: "";
    display: block;
    margin-top: 10px;
    height: 1px;
    background: #d1d1d1;
    opacity: 76%;
  }
`;

const Div = styled.div`
  overflow-y: scroll;
  position: relative;
  direction: ltr;
`;

const Img = styled.div<SpaceProps>`
  position: absolute;
  z-index: 20;
  right: 10px;
  height: 15px;
  ${space}
`;
function CityFormAds({ setCity }: { setCity: Function }) {
  const [show, setShow] = useState(true);
  const [filterString, setFilterString] = useState("");

  let valid_city_without_all = Object.values(cityList).filter((d) => d.id != 6);

  function search(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // console.log(value)
    setFilterString(value);
  }

  const filtredCity =
    filterString && valid_city_without_all.length > 0
      ? valid_city_without_all?.filter((city: Item) =>
          city.name.includes(filterString)
        )
      : valid_city_without_all;

  return (
    <CityF display={show ? "block" : "none"}>
      <Input>
        <InputText onChange={search} type="text" placeholder="جـسـتـجو شــهر" />
        <Img>
          <Image
            alt=""
            height={15}
            width={15}
            src={"/icons/grey-search-icon.svg"}
          />
        </Img>
      </Input>
      <Div className={"scroll-d-none"}>
        <List className={"scroll-d-none"}>
          {Object.values(filtredCity)?.map((city: Item, i: number) => (
            <Li onClick={() => setCity(city.name)} key={i}>
              {city.name}
            </Li>
          ))}
        </List>
      </Div>
    </CityF>
  );
}

export default CityFormAds;
