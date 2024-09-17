import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import Remove from "../../../public/icons/remove.svg";
import WhiteRemove from "../../../public/icons/white remove.svg";
import { SelectedCities } from "../../../types";
import useUrlMaker from "../../../hooks/useUrlMaker";
import SideBarContext from "../context/SideBarContext";
import _ from "lodash";
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
} from "styled-system";
import {
  search_keys_to_set_get,
  search_keys_to_set_get_all_area,
  search_keys_to_set_get_all_city,
} from "../../../utils/searchConfig";
import Image from "next/image";
import { array } from "prop-types";
// import key from "../../../pages/[[...key]]";
const cityList: {
  [key: string]: {
    id: number;
    name: string;
    lat: number;
    lang: number;
    ostan: string;
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

const Content = styled.div<LayoutProps | FlexboxProps>`
  background: #474546;
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding-top: 10px;
  backdrop-filter: blur(7px);
  position: relative;
  ${layout}
  ${flexbox}
`;

const HeadMobile = styled.div<LayoutProps>`
  display: flex;
  margin: 5px 0px 10px 0px;
  position: relative;
  padding-bottom: 5px;
  ${layout}
  &::after {
    content: "";
    display: block;
    height: 1px;
    background: white;
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
  }
  & > div:last-child::before {
    content: "";
    display: block;
    width: 1px;
    height: 90%;
    background: #fcc155;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const ApproveMobile = styled.div`
  background: transparent;
  color: #fcc155;
  padding: 6px 20px;
  border-radius: 14px;
  cursor: pointer;
  flex: 1 1 50%;
  text-align: center;
  align-items: center;
`;
const DeleteALlMobile = styled.div<LayoutProps>`
  background: transparent;
  color: white;
  padding: 6px 20px;
  border-radius: 14px;
  cursor: pointer;
  flex: 1 1 50%;
  text-align: center;
  align-items: center;
  position: relative;
  ${layout}
`;
const Head = styled.div`
  display: flex;
  margin: 0px 50px 10px 50px;
  padding-bottom: 10px;
  position: relative;

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: #fcc155;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;
const DeleteALl = styled.button`
  margin-right: auto;
  border: none;
  color: #fcc155;
  font-size: 14px;
  background: transparent;
  cursor: pointer;
  height: 30px;
  margin-bottom: 5px;
`;
const AroundArea = styled.div`
  margin-right: auto;
  border: none;
  color: #fcc155;
  font-size: 14px;
  background: transparent;
  cursor: pointer;
  height: 30px;
  margin-bottom: 5px;
`;

const Selected = styled.div`
  display: flex;
  margin: 0 19px 10px 19px;
  direction: rtl;
`;

const Chosen = styled.div`
  display: flex;
  flex: 1 1 70%;
  flex-direction: column;
  height: 150px;
  overflow-y: scroll;
  direction: ltr;
  margin-right: 10px;
`;

const SelectedCity = styled.div`
  color: #fcc155;
  display: flex;
  margin-left: 16px;
  padding-left: 10px;
  background: transparent;
  border-radius: 12px;
  padding: 3px 12px;
  position: relative;
  align-items: center;
  min-width: fit-content;
  &::after {
    content: "";
    display: block;
    height: 100%;
    background: #fcc155;
    position: absolute;
    left: 0;
    width: 2px;
    top: 0;
  }
`;

const SelectedNeighbor = styled.div<TypographyProps>`
  background: #fcc155;
  border-radius: 12px;
  padding: 3px 12px;
  display: flex;
  min-width: fit-content;
  width: max-content;
  margin-left: 5px;
  margin-bottom: 5px;
  ${typography}
`;

const Confirm = styled.div<LayoutProps>`
  display: flex;
  flex: 1 1 30%;
  margin: 0 auto 22px 30px;
  flex-direction: column;
  justify-content: space-between;
  ${layout}
`;

const Total = styled.div`
  margin-right: auto;
  text-align: center;
`;

const Approve = styled.div`
  background: #707070;
  color: white;
  padding: 2px 20px;
  font-size: 14px;
  border-radius: 14px;
  cursor: pointer;
  border: 1px solid #fcc155;
`;

const Result = styled.div`
  margin-bottom: 8px;
  color: white;
  font-size: 14px;
`;

const Span = styled.span`
  color: #fcc155;
  font-weight: bolder;
`;

const ChosenNeighborhood = styled.div<FlexboxProps | LayoutProps>`
  display: flex;
  height: fit-content;
  font-size: 14px;
  align-items: center;
  ${layout}
  ${flexbox}
`;

const Info = styled.div<FlexboxProps>`
  display: flex;
  ${flexbox}
`;
const Shadow = styled.div`
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(82, 81, 82, 0%) 22%,
    #474546
  );
  height: 40px;
  width: 100%;
`;

function ChosenList({
  selected,
  setSelected,
  back,
  hideModal,
  removeFilter,
  showAround,
  setShowAround,
}: {
  selected: SelectedCities;
  setSelected: Function;
  back: Function;
  hideModal: Dispatch<boolean>;
  removeFilter: Function;
  showAround: Boolean;
  setShowAround: Dispatch<any>;
}) {
  const { openModalCity } = useContext(SideBarContext);

  const icon = {
    marginRight: "5px",
    marginTop: "3px",
    cursor: "pointer",
  };

  //

  const [, setSelectedLocation] = useUrlMaker();
  const [shadow, setShadow] = useState<boolean>(false);

  function setSelectedCity() {
    setSelectedLocation({ [search_keys_to_set_get["city_area"]]: selected });
    if (openModalCity) {
      openModalCity(false);
    }
    hideModal(false);
  }

  const _checkShowShadow = (e: React.UIEvent<HTMLDivElement>) => {
    let div = e.target as HTMLDivElement;
    //detect scroll to bottom of div
    const bottom = div.scrollHeight - div.scrollTop === div.clientHeight;
    if (div.clientHeight < div.scrollHeight && !bottom) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  const checkShowShadow = useCallback(_.debounce(_checkShowShadow, 100), []);
  let ostans: { [key: string]: Array<string> } = {};
  let cities: { [key: string]: Array<string> } = {};
  for (let ostan in selected) {
    // console.log(key, 'key in selected')
    if (selected[ostan].hasOwnProperty(search_keys_to_set_get_all_city)) {
      ostans = { ...ostans, [ostan]: [search_keys_to_set_get_all_city] };
    } else {
      cities = { ...cities, ...selected[ostan] };
    }
  }
  let count_cities = Object.keys(cities).length;
  let areas_count = 0;
  Object.keys(ostans).map((ostan) => {
    count_cities += Object.keys(ostanList[ostan]["cities"]).length;
  });
  Object.keys(cities).map((city) => {
    if (
      cities[city][0] !== search_keys_to_set_get_all_area.replace(/[\s-]/gi, "")
    )
      areas_count = areas_count + cities[city].length;
  });
  return (
    <Content flex={["0 1 40%", ""]} display={"block"}>
      <HeadMobile display={["flex", "none"]}>
        <ApproveMobile onClick={() => setSelectedCity()}>تایید</ApproveMobile>
        {Object.keys(selected).length > 0 && (
          <DeleteALlMobile
            onClick={() => {
              removeFilter("");
            }}
          >
            حذف همه
          </DeleteALlMobile>
        )}
      </HeadMobile>
      <Info flexDirection={["column", "row"]}>
        <Chosen className={"scroll-d-none"} onScroll={checkShowShadow}>
          {Object.keys(cities).map((city_name, index) => {
            // console.log(city_name,'before crash')
            return (
              <Selected key={index}>
                <SelectedCity>
                  <div>{cityList[city_name]["name"]}</div>
                  <div
                    style={{
                      height: "15px",
                      minWidth: "15px",
                      marginRight: "auto",
                    }}
                    onClick={() => removeFilter(city_name)}
                  >
                    <Image
                      src={"/icons/remove.svg"}
                      height={15}
                      width={15}
                      alt=""
                    />
                  </div>
                </SelectedCity>
                <ChosenNeighborhood
                  className={"scroll-d-none"}
                  overflowX={["auto", "unset", "unset"]}
                  flexWrap={["nowrap", "wrap", "wrap"]}
                >
                  {cities[city_name].map((area, index) => (
                    <SelectedNeighbor fontSize={["14px", "16px"]} key={index}>
                      {cityList[city_name]["areas"][
                        area.replace(/[\s-]/gi, "")
                      ]?.["name"]
                        ? area
                        : search_keys_to_set_get_all_area}
                      <WhiteRemove
                        onClick={() => {
                          setSelected(
                            area,
                            city_name,
                            cityList[city_name]["ostan"]
                          );
                        }}
                        style={icon}
                      />
                    </SelectedNeighbor>
                  ))}
                </ChosenNeighborhood>
              </Selected>
            );
          })}
          {Object.keys(ostans).map((ostan, index) => {
            return (
              <Selected key={index}>
                <SelectedCity>
                  <div>{ostanList[ostan]["name"]}</div>
                  <div
                    style={{
                      height: "15px",
                      minWidth: "15px",
                      marginRight: "auto",
                    }}
                    onClick={() => removeFilter(ostan)}
                  >
                    <Image
                      src={"/icons/remove.svg"}
                      height={15}
                      width={15}
                      alt=""
                    />
                  </div>
                </SelectedCity>
                <ChosenNeighborhood
                  className={"scroll-d-none"}
                  overflowX={["auto", "unset", "unset"]}
                  flexWrap={["nowrap", "wrap", "wrap"]}
                >
                  {ostans[ostan].map((city, index) => (
                    <SelectedNeighbor fontSize={["14px", "16px"]} key={index}>
                      {search_keys_to_set_get_all_city}
                      <WhiteRemove
                        onClick={() => {
                          removeFilter(ostan);
                        }}
                        style={icon}
                      />
                    </SelectedNeighbor>
                  ))}
                </ChosenNeighborhood>
              </Selected>
            );
          })}
        </Chosen>
        <Confirm display={["none", "flex"]}>
          {Object.keys(selected).length > 0 && (
            <DeleteALl
              onClick={() => {
                removeFilter("");
              }}
            >
              <Image
                src={"/icons/modalcity-trashbin.svg"}
                height={30}
                width={30}
                alt=""
              />
            </DeleteALl>
          )}
          {/*{Object.keys(selected).length >0 &&*/}
          {/*    <AroundArea onClick={()=> {*/}
          {/*        setShowAround(!showAround);*/}
          {/*    } }>*/}
          {/*        محله های اطراف*/}
          {/*        {showAround ?*/}
          {/*            <Image src={'/icons/Group 1415.svg'} width={'24px'} height={'24px'}/> :*/}
          {/*            <Image src={'/icons/Stroke 2.svg'} width={'24px'} height={'24px'}/>}*/}
          {/*    </AroundArea>}*/}
          <Total>
            <Result>
              تعداد <Span>{count_cities} شهر</Span> و{" "}
              <Span>
                {Object.values(cities)
                  .map(
                    (array) =>
                      array.filter(
                        (a) =>
                          a !==
                          search_keys_to_set_get_all_area.replaceAll(" ", "")
                      ).length
                  )
                  .reduce((r, o) => r + o, 0)}{" "}
                محله
              </Span>
            </Result>
            <Approve onClick={() => setSelectedCity()}>تـایـیـد</Approve>
          </Total>
        </Confirm>
      </Info>
      {shadow && <Shadow />}
    </Content>
  );
}

export default ChosenList;
