import React, { PropsWithChildren } from "react";
import { Blackremove } from "../utility/Icons";
import styled from "styled-components";
import useUrlMaker from "../../hooks/useUrlMaker";
import useUrlValues from "../../hooks/useUrlValues";
import { search_keys_to_set_get } from "../../utils/searchConfig";
import { values } from "lodash";
import SelectedCity from "./modalcity/SelectedCity";
import { City, SelectedCities } from "../../types";
const cityList: {
  [key: string]: City;
} = require("../../dictionaries/city.json");

const CityFilter = styled.div`
  background: #2d2c2c;
  border-radius: 12px;
  padding: 4px 9px 1.5px 9px;
  margin: 3px;
  display: flex;
  color: white;
  font-size: 12px;
  position: relative;
  vertical-align: center;
  width: fit-content;
`;
const icon33 = {
  cursor: "pointer",
  marginRight: "5px",
  marginTop: "-2px",
};

function CityAreaBadge(props: {
  title: string;
  key: number;
  values: [string, string];
}) {
  const [, setSelectedLocation] = useUrlMaker();
  let { city_area } = useUrlValues([search_keys_to_set_get["city_area"]]);
  //

  const removeArea = () => {
    // @ts-ignore
    let _city_area: SelectedCities = { ...city_area };
    if (_city_area) {
      // console.log(props.values, 'values')
      let ostan = cityList[props.values[0]]["ostan"];
      if (ostan) {
        let _areas = _city_area[ostan][props.values[0]].filter(
          (area) => area !== props.values[1]
        );
        if (_areas.length == 0) {
          delete _city_area[ostan][props.values[0]];
        } else {
          _city_area[ostan][props.values[0]] = _areas;
        }
        setSelectedLocation({
          [search_keys_to_set_get["city_area"]]: _city_area,
        });
      } else {
        delete _city_area[props.values[0]];
        setSelectedLocation({
          [search_keys_to_set_get["city_area"]]: _city_area,
        });
      }
    }
  };

  return <CityFilter>{props.title}</CityFilter>;
}

export default CityAreaBadge;
