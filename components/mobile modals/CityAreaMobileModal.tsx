import React, { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import MobileModalSkeleton from "./MobileModalSkeleton";
import SelectedCity from "../sidebar/modalcity/SelectedCity";
import CityForm from "../sidebar/modalcity/CityForm";
import Neighborhood from "../sidebar/modalcity/Neighborhood";
import ChosenList from "../sidebar/modalcity/ChosenList";
import styled from "styled-components";
import { City, SelectedCities } from "../../types";
import UseUrlValues from "../../hooks/useUrlValues";
import {
  search_keys_to_set_get,
  search_keys_to_set_get_all_area,
  search_keys_to_set_get_all_city,
} from "../../utils/searchConfig";
import { uniqueStringArray } from "../../utils/helper";
const cityList: {
  [key: string]: City;
} = require("../../dictionaries/city.json");

const Info = styled.div`
  flex: 1 0 60%;
  padding: 10px;
  overflow: hidden;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: -10px;
`;
export default function CityAreaMobileModal(
  props: PropsWithChildren<{ show: boolean; setshow: Dispatch<boolean> }>
) {
  const [showAround, setShowAround] = useState<boolean>(false);
  const [current_city, setCurrentCity] = useState<string>("");
  const [current_province, setCurrentProvince] = useState<string>("");
  const [selected, setSelected] = useState<SelectedCities>({});
  let values = UseUrlValues([search_keys_to_set_get["city_area"]]);

  useEffect(() => {
    //@ts-ignore
    const city_area: SelectedCities = values.city_area ? values.city_area : {};
    setSelected(city_area);
  }, [values]);

  const makeSelected = (
    area: string,
    cityname: string,
    ostan: string = current_province
  ) => {
    let _selected = { ...selected };

    if (!_selected[ostan]) {
      _selected[ostan] = {};
    }
    if (cityname) {
      if (
        cityname !== search_keys_to_set_get_all_city &&
        _selected[ostan][search_keys_to_set_get_all_city]
      ) {
        delete _selected[ostan][search_keys_to_set_get_all_city];
      }

      if (!_selected[ostan][cityname]) {
        _selected[ostan][cityname] = [];
      }
      if (!_selected[ostan][cityname].includes(area)) {
        if (area && area !== search_keys_to_set_get_all_area) {
          let uniqe = uniqueStringArray([
            ..._selected[ostan][cityname].filter(
              (a) => a !== search_keys_to_set_get_all_area
            ),
            area,
          ]);
          _selected[ostan] = { ..._selected[ostan], [cityname]: uniqe };
          console.log(_selected);
        } else {
          _selected[ostan][cityname] = [search_keys_to_set_get_all_area];
        }
      } else {
        //delete area from city
        _selected[ostan][cityname] = _selected[ostan][cityname].filter(
          (i) => i !== area
        );
        if (
          selected[ostan][cityname].length == 0 &&
          cityname !== search_keys_to_set_get_all_city
        ) {
          delete selected[ostan][cityname];
        }
        if (Object.keys(_selected[ostan]).length == 0) {
          delete _selected[ostan];
        }
      }
    } else {
      _selected[ostan] = { [search_keys_to_set_get_all_city]: [] };
    }
    setSelected({ ..._selected });
  };

  function goBack() {
    if (current_city) {
      setCurrentCity("");
    } else if (current_province) {
      setCurrentProvince("");
    }
  }

  const removeFilter = (city_name: string) => {
    if (!city_name) {
      setSelected({});
      goBack();
      return;
    } else {
      let _selected: SelectedCities = { ...selected };
      _selected[city_name]
        ? delete _selected[city_name]
        : cityList[city_name]["ostan"]
        ? delete _selected[cityList[city_name]["ostan"]][city_name]
        : "";
      setSelected(_selected);
      if (Object.keys(_selected).length === 0) {
        goBack();
      }
    }
  };

  function setCity(city: string | null) {
    if (city) {
      setCurrentCity(city);
    } else {
      makeSelected("", "", current_province);
    }
  }

  return (
    <MobileModalSkeleton
      show={props.show}
      setshow={props.setshow}
      title={"استان ، شهر و محله"}
      icon={"/icons/mobile location.svg"}
    >
      <Div>
        <Info>
          <SelectedCity
            ostan={current_province}
            back={goBack}
            city={current_city}
          />
          {!current_province ? (
            <CityForm
              color={true}
              setCity={setCurrentProvince}
              province={current_province}
            />
          ) : current_city === "" ? (
            <CityForm
              color={true}
              setCity={setCity}
              province={current_province}
            />
          ) : (
            <Neighborhood
              city={current_city}
              ostan={current_province}
              goBack={goBack}
              setSelected={makeSelected}
              selected={selected}
            />
          )}
        </Info>

        <ChosenList
          removeFilter={removeFilter}
          hideModal={goBack}
          back={goBack}
          setSelected={makeSelected}
          selected={selected}
          showAround={showAround}
          setShowAround={setShowAround}
        />
      </Div>
    </MobileModalSkeleton>
  );
}
