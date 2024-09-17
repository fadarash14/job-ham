import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  useCallback,
  useEffect,
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
  backgroundImage,
  BackgroundImageProps,
} from "styled-system";
import Image from "next/image";
import { City, Item } from "../../../types";
import _ from "lodash";
import clsx from "clsx";
const cityList: {
  [key: string]: City;
} = require("../../../dictionaries/parent_city.json");

const InputText = styled.input<InputHTMLAttributes<any>>`
  width: 100%;
  height: 35px;
  border-radius: 12px;
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

const Input = styled.div`
  position: relative;
  display: flex;
`;

const CityF = styled.div<DisplayProps | SpaceProps>`
  position: relative;
  height: 100%;
  flex-direction: column;
  ${layout}
`;
const BoxShadow = styled.div<
  HTMLElement | LayoutProps | { shadow: boolean } | BackgroundImageProps
>(
  // @ts-ignore
  (props: { shadow: boolean }) => {
    return {
      position: "absolute",
      height: "30px",
      width: "100%",
      visibility: props.shadow ? "hidden" : "visible",
      bottom: "10px",
      right: "50%",
      transform: "translate(50%,0)",
    };
  },
  [backgroundImage]
);

const List = styled.ul<LayoutProps>`
  padding-left: 10px;
  list-style-type: none;
  direction: rtl;
  margin-top: 0;
  padding-right: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
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

const Div = styled.div<LayoutProps>`
  overflow-y: scroll;
  position: relative;
  direction: ltr;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  height: 78%;
  ${layout}
`;

const Img = styled.div<SpaceProps>`
  position: absolute;
  z-index: 20;
  right: 10px;
  top: 50%;
  height: 15px;
  transform: translate(0, -50%);
  ${space}
`;
function CityForm({
  setCity,
  color,
  province,
  availableAll,
}: {
  setCity: Function;
  color: boolean;
  province: string;
  availableAll?: boolean;
}) {
  const [scrollEnd, setScrollEnd] = useState(false);
  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }
  const onScrollY = useCallback(_.debounce(_onScrollY, 100), []);

  const [show, setShow] = useState(true);
  const [filterString, setFilterString] = useState("");

  function search(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    //
    setFilterString(value);
  }

  useEffect(() => {
    setFilterString("");
  }, [province]);

  let list = province
    ? Object.values(cityList[province].cities)
    : Object.values(cityList);

  const filtredCity =
    filterString && filterString.length > 0
      ? list?.filter((city: Item) => city.name.includes(filterString))
      : list;

  return (
    <CityF display={show ? "flex" : "none"}>
      <Input>
        <InputText
          value={filterString}
          onChange={search}
          type="text"
          placeholder={clsx({
            "جـسـتـجو شــهر": !!province,
            "جستجو استان": !province,
          })}
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
      <Div className={"scroll-d-none"} onScroll={(e: any) => onScrollY(e)}>
        <List>
          {province && availableAll && (
            <Li onClick={() => setCity(null)}>
              {" "}
              همه شهرهای {cityList[province]["name"]}
            </Li>
          )}
          {Object.values(filtredCity)?.map(
            (city: { name: string; slug: string; id: number }, i: number) => (
              <Li onClick={() => setCity(city.slug)} key={i}>
                {city.name}
              </Li>
            )
          )}
        </List>
      </Div>
      {/*{// @ts-ignore*/}
      {/*    <BoxShadow shadow={scrollEnd} backgroundImage={['linear-gradient(to top, #ffffffff, rgba(245, 246, 250, 0) 90%)','linear-gradient(to top, #E8E8EC, rgba(245, 246, 250, 0) 90%)']}/>*/}
      {/*}*/}
    </CityF>
  );
}

export default CityForm;

CityForm.defaultProps = {
  color: false,
  availableAll: true,
};
