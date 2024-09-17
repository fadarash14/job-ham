import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import CityForm from "./CityForm";
import Neighborhood from "./Neighborhood";
import CityF from "../../../public/icons/city.svg";
import SelectedCity from "./SelectedCity";
import ChosenList from "./ChosenList";
import { layout, LayoutProps } from "styled-system";
import { removeOnDuplicate, uniqueStringArray } from "../../../utils/helper";
import { City, SelectedCities } from "../../../types";
import SideBarContext from "../context/SideBarContext";
import { CloseSvgWhite } from "../../utility/Icons";
import ModalSkeleton from "../../utility/ModalSkeleton";
import Close from "../../../public/icons/close-icon-modal.svg";
import CityAreaBadge from "../CityAreaBadge";
import UseUrlValues from "../../../hooks/useUrlValues";
import {
  search_keys_to_set_get,
  search_keys_to_set_get_all_area,
  search_keys_to_set_get_all_city,
} from "../../../utils/searchConfig";
const cityList: {
  [key: string]: City;
} = require("../../../dictionaries/city.json");

const ModalCityBox = styled.div<LayoutProps>`
  position: fixed;
  z-index: 1030;
  padding-top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  direction: rtl;
  font-size: 16px;
  ${layout}
`;

const ModalContent = styled.div`
  background-color: #f5f6fa;
  margin: auto;
  width: 65%;
  height: 85%;
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 20px;
  margin: 15px 30px 20px 30px;
`;

const Span = styled.span`
  position: relative;
  top: 5px;
  right: 14px;
`;

const Info = styled.div`
  overflow: hidden;
  margin: 0px 30px 10px 30px;
  height: 300px;
`;
const Whole = styled.div<LayoutProps>`
  z-index: 1030;
  ${layout}
`;
function ModalCity(props: PropsWithChildren<any>) {
  const icon = {
    position: "absolute",
    left: "5px",
    top: "50%",
    transform: "translate(0,-50%)",
    cursor: "pointer",
  };
  const [showAround, setShowAround] = useState<boolean>(false);
  const { modalCityIsOpen, openModalCity } = useContext(SideBarContext);
  const [current_city, setCurrentCity] = useState<string>("");
  const [current_province, setCurrentProvince] = useState<string>("");
  const [selected, setSelected] = useState<SelectedCities>({});
  let values = UseUrlValues([search_keys_to_set_get["city_area"]]);

  useEffect(() => {
    //@ts-ignore
    const city_area: SelectedCities = values.city_area ? values.city_area : {};
    setSelected(city_area);
  }, [values, showAround]);

  const makeSelected = (
    area: string,
    cityname: string,
    ostan: string = current_province
  ) => {
    // console.log(area, cityname, ostan, 'obvios ')
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
          // console.log(_selected)
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
    // console.log({...selected},'selected')
    setSelected({ ..._selected });
  };

  function goBack() {
    if (current_city) {
      setCurrentCity("");
    } else if (current_province) {
      setCurrentProvince("");
    }
  }

  const isClosing = () => {
    if (openModalCity) {
      openModalCity(false);
    }
  };

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
    <Whole display={["none", "block"]}>
      {
        <ModalSkeleton
          flex={"column"}
          //@ts-ignore
          show={modalCityIsOpen}
          //@ts-ignore
          setShow={openModalCity}
        >
          <Head>
            <CityF />
            <Span>استان ، شهر و محله</Span>
            <Close onClick={isClosing} style={icon} />
          </Head>

          <Info>
            <SelectedCity
              back={goBack}
              ostan={current_province}
              city={current_city}
            />
            {!current_province ? (
              <CityForm
                setCity={setCurrentProvince}
                province={current_province}
              />
            ) : current_city === "" ? (
              <CityForm setCity={setCity} province={current_province} />
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
        </ModalSkeleton>
      }
    </Whole>
  );
}

export default ModalCity;
