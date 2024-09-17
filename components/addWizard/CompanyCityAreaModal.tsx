import React, { Dispatch, useContext, useState } from "react";
import styled from "styled-components";
import { SelectedCities } from "../../types";
import AdsUploadContext from "./AdsUploadContext";
import MobileModalSkeleton from "../mobile modals/MobileModalSkeleton";
import SelectedCity from "../sidebar/modalcity/SelectedCity";
import ModalSkeleton from "../utility/ModalSkeleton";
import Image from "next/image";
import Close from "../../public/icons/close-icon-modal.svg";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import CityForm from "../sidebar/modalcity/CityForm";
import Neighborhood from "../sidebar/modalcity/Neighborhood";

type Props = {
  show: boolean;
  setshow: Dispatch<boolean>;
  setCity?: Dispatch<{ id: number; name: string }>;
  setArea?: Dispatch<{ id: number; name: string }>;
};
let cities: {
  [key: string]: {
    id: number;
    name: string;
    areas: { [key: string]: { name: string; id: number } };
  };
} = require("../../dictionaries/city.json");

const Head = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 20px;
  margin: 15px 30px 8px 30px;
`;

const Span = styled.span`
  position: relative;
  top: 5px;
  right: 14px;
`;

const Info = styled.div<SpaceProps | LayoutProps>`
  ${space}
  ${layout}
`;
const Piece = styled.div<SpaceProps>`
  background: white;
  height: 100%;
  ${space}
`;
const Whole = styled.div<LayoutProps>`
  ${layout}
`;
const icon = {
  position: "absolute",
  left: "5px",
  top: "50%",
  transform: "translate(0,-50%)",
  cursor: "pointer",
};

export default function CompanyCityAreaModal(props: Props) {
  const [current_city, setCurrentCity] = useState<string>("");
  const [current_province, setCurrentProvince] = useState<string>("");
  const [selected, setSelected] = useState<SelectedCities>({});
  const { setCompanyArea, setCompanyCity, setSelectedFilter } =
    useContext(AdsUploadContext);

  const makeSelected = (area: string) => {
    if (area && cities[current_city]["areas"][area]) {
      let area_id = cities[current_city]["areas"][area];
      if (setCompanyArea) {
        setCompanyArea(area_id);
      }
      if (props.setArea) {
        props.setArea(area_id);
      }
      if (setCompanyCity) {
        setCompanyCity({
          name: cities[current_city]["name"],
          id: cities[current_city]["id"],
        });
      }
      if (props.setCity) {
        props.setCity({
          name: cities[current_city]["name"],
          id: cities[current_city]["id"],
        });
      }

      props.setshow(false);
    } else if (cities[current_city]) {
      if (setCompanyArea) {
        setCompanyArea({ id: 0, name: "تمام محله ها" });
      }
      if (setCompanyCity) {
        setCompanyCity({
          name: cities[current_city]["name"],
          id: cities[current_city]["id"],
        });
      }
      if (props.setArea) {
        props.setArea({ id: 0, name: "تمام محله ها" });
      }
      if (props.setCity) {
        props.setCity({
          name: cities[current_city]["name"],
          id: cities[current_city]["id"],
        });
      }
      props.setshow(false);
    }
  };

  function goBack() {
    if (current_city) {
      setCurrentCity("");
    } else if (current_province) {
      setCurrentProvince("");
    }
  }

  const isClosing = () => {
    props.setshow(false);
  };

  const setCityForAds = (city: any) => {
    if (!city) {
      if (setCompanyCity) {
        setCompanyCity({
          name: cities[current_province]["name"],
          id: cities[current_province]["id"],
        });
      }
      if (setCompanyArea) {
        setCompanyArea({ id: 0, name: "تمام محله ها" });
      }
      props.setshow(false);
    } else {
      setCurrentCity(city);
    }
  };

  return (
    <>
      {/*MOBILE*/}
      <MobileModalSkeleton
        title={"استان ، شهر و محله"}
        icon={"/icons/black-location.svg"}
        show={props.show}
        setshow={props.setshow}
      >
        <Piece>
          <Info height={"100%"}>
            <SelectedCity
              ostan={current_province}
              back={goBack}
              city={current_city}
            />
            {!current_province ? (
              <CityForm
                setCity={setCurrentProvince}
                province={current_province}
                availableAll={false}
              />
            ) : !current_city ? (
              <CityForm
                setCity={setCityForAds}
                province={current_province}
                availableAll={false}
              />
            ) : (
              <Neighborhood
                availableAll={false}
                city={current_city}
                ostan={current_province}
                goBack={goBack}
                setSelected={makeSelected}
                selected={selected}
              />
            )}
          </Info>
        </Piece>
      </MobileModalSkeleton>
      {/*MOBILE*/}

      {/*DESKTOP*/}
      <Whole display={["none", "block"]}>
        <ModalSkeleton
          show={props.show}
          setShow={props.setshow}
          flex={"column"}
          back={"white"}
          height={"60%"}
        >
          <Head>
            <Image
              src={"/icons/red-city-area.svg"}
              height={35}
              width={35}
              alt=""
            />
            <Span>استان ، شهر و محله</Span>
            <Close onClick={isClosing} style={icon} />
          </Head>
          <Info margin={"10px 30px 0 30px"} height={"350px"}>
            <SelectedCity
              ostan={current_province}
              back={goBack}
              city={current_city}
            />
            {!current_province ? (
              <CityForm
                setCity={setCurrentProvince}
                province={current_province}
                availableAll={false}
              />
            ) : !current_city ? (
              <CityForm
                setCity={setCityForAds}
                province={current_province}
                availableAll={false}
              />
            ) : (
              <Neighborhood
                city={current_city}
                ostan={current_province}
                goBack={goBack}
                setSelected={makeSelected}
                selected={selected}
                availableAll={false}
              />
            )}
          </Info>
        </ModalSkeleton>
      </Whole>
      {/*DESKTOP*/}
    </>
  );
}
