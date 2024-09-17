import styled from "styled-components";
import Box from "../../utility/Box";
import Plus from "../../../public/icons/Iconly-Curved-Plus-black.svg";
import { Blackremove } from "../../utility/Icons";
import Dots from "../../../public/icons/dots.svg";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import SideBarContext from "../context/SideBarContext";
import UseUrlValues from "../../../hooks/useUrlValues";
import CityAreaBadge from "../CityAreaBadge";
import {
  search_keys_to_set_get,
  search_keys_to_set_get_all_area,
  search_keys_to_set_get_all_city,
} from "../../../utils/searchConfig";
import { SelectedCities } from "../../../types";
import { ColorProps, color } from "styled-system";
import Image from "next/image";
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
} = require("../../../dictionaries/city.json");
const ostanList: {
  [key: string]: {
    id: number;
    name: string;
    lat: number;
    lang: number;
    cities: typeof cityList;
    areas: {
      [k: string]: { id: number; name: string; lat: number; long: number };
    };
  };
} = require("../../../dictionaries/parent_city.json");

const CityBox = styled((props) => <Box {...props} />)<ColorProps>`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 19px;
  color: white;
  margin: 5px -19px;
  ${color}
`;
const Span = styled.div<ColorProps>`
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  margin-right: 10px;
  ${color}
`;

const Yellow = styled.span`
  color: #fcc155;
  font-size: 12px;
  margin-right: 5px;
`;

const Dotted = styled((props) => <Dots {...props} />)`
  object-fit: contain;
  width: 25px;
  height: 20px;
  cursor: pointer;
`;
const Img = styled.div`
  height: 21px;
`;
const Rot = styled.div`
  height: 21px;
  transform: rotate(180deg);
`;
const Dot = styled.div`
  position: absolute;
  right: -5px;
`;
const BoxHeader = styled((props) => <Box {...props} />)`
  align-items: center;
  cursor: pointer;
  position: relative;
  &.cursor {
    cursor: pointer;
  }
`;

export default function CityAreaFilter(props: { mobile: boolean }) {
  const { modalCityIsOpen, openModalCity } = useContext(SideBarContext);
  const [selected_city_area, setSelected] = useState<JSX.Element[]>([]);
  const [area_count, setAreaCount] = useState<number>(0);
  const [city_count, setCityCount] = useState<number>(0);

  let values = UseUrlValues([search_keys_to_set_get["city_area"]]);
  // console.log(values,'outttttttttttttt')

  useEffect(() => {
    // console.log(values,'valllllllllllll')
    //@ts-ignore
    const city_area: SelectedCities = values.city_area ? values.city_area : {};
    let selected_city_area: any[] = [];
    let city_count = 0;
    let area_count = 0;
    if (city_area && typeof city_area !== "undefined") {
      Object.keys(city_area).map((ostan, key: number) => {
        Object.keys(city_area[ostan]).map((city, indexCity) => {
          // console.log(city, 'natural way to learn')
          if (city != search_keys_to_set_get_all_city) {
            city_count += 1;
            city_area
              ? city_area[ostan][city].map((area: string, index: number) => {
                  if (
                    area !== search_keys_to_set_get_all_area.replaceAll(" ", "")
                  )
                    area_count += 1;
                  let title_area = cityList[city]["areas"][
                    area.replace(/[\s-]/gi, "")
                  ]?.["name"]
                    ? area
                    : search_keys_to_set_get_all_area;
                  selected_city_area.push(
                    <CityAreaBadge
                      key={index * indexCity}
                      title={`${city}:${title_area}`}
                      values={[city, area]}
                    />
                  );
                })
              : "";
          } else {
            city_count += Object.keys(ostanList[ostan]["cities"]).length;
            selected_city_area.push(
              <CityAreaBadge
                key={indexCity}
                title={`${ostanList[ostan]["name"]}:${search_keys_to_set_get_all_city}`}
                values={[ostan, search_keys_to_set_get_all_city]}
              />
            );
          }
        });
      });
      setSelected(selected_city_area);
      setAreaCount(area_count);
      setCityCount(city_count);
    }
  }, [values]);

  function openModal() {
    if (openModalCity) {
      openModalCity(!modalCityIsOpen);
    }
  }

  return (
    <CityBox
      bg={
        selected_city_area.length > 0
          ? "rgba(252,193,85,0.14)"
          : props.mobile
          ? "rgba(209,209,209,0.3)"
          : "rgba(209,209,209,0.1)"
      }
      display={"flex"}
      flexDirection={"column"}
    >
      <BoxHeader
        color={props.mobile ? "black" : "white"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        onClick={openModal}
      >
        {selected_city_area.length > 0 ? (
          <Dot>
            <Image src={"/icons/gigili.svg"} height={8} width={8} alt="" />
          </Dot>
        ) : null}
        <Span>
          شــهر ، محــله{" "}
          {selected_city_area.length > 0 && (
            <Yellow>
              ( {city_count} شهر و {area_count} محله )
            </Yellow>
          )}
        </Span>
        <div>
          {!modalCityIsOpen ? (
            <Img>
              {props.mobile ? (
                <Image
                  height={24}
                  width={24}
                  src={"/icons/side-filter-arrow-mobile.svg"}
                  alt=""
                />
              ) : selected_city_area.length > 3 ? (
                <Dotted onClick={openModal} />
              ) : (
                <Image
                  height={24}
                  width={24}
                  src={"/icons/side-filter-arrow.svg"}
                  alt=""
                />
              )}
            </Img>
          ) : (
            <Rot>
              <Image
                height={24}
                width={24}
                src={"/icons/side-filter-arrow.svg"}
                alt=""
              />
            </Rot>
          )}
        </div>
      </BoxHeader>
      {selected_city_area.length > 0 && (
        <Box
          mt={"10px"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"flex-end"}
        >
          <Box
            flexWrap={"wrap"}
            display={"flex"}
            flexBasis={"100%"}
            m={"0 4px 4px 4px"}
          >
            {selected_city_area.slice(0, 4)}
          </Box>
        </Box>
      )}
    </CityBox>
  );
}
