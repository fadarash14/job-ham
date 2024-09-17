import React, {
  ChangeEvent,
  useState,
  InputHTMLAttributes,
  useCallback,
  useEffect,
} from "react";
import styled from "styled-components";
import { Item, SelectedCities } from "../../../types";
import Image from "next/image";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { useAppDispatch } from "@/store/hook";
import _ from "lodash";
import { search_keys_to_set_get_all_area } from "../../../utils/searchConfig";
const cityList: {
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

const Form = styled.div<SpaceProps>`
  position: relative;
  height: 100%;
  ${space}
`;
const BoxShadow = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>(
  // @ts-ignore
  (props: { shadow: boolean }) => {
    return {
      position: "absolute",
      height: "50px",
      width: "100%",
      backgroundImage:
        "linear-gradient(to top, #E8E8EC, rgba(245, 246, 250, 0) 90%)",
      visibility: props.shadow ? "hidden" : "visible",
      bottom: 0,
      right: "50%",
      transform: "translate(50%,0)",
    };
  }
);

const List = styled.ul`
  padding-right: 10px;
  padding-left: 10px;
  list-style-type: none;
  direction: rtl;
  height: 85%;
  margin-top: 0;
`;

const Li = styled.li`
  margin: 10px 0;
  display: flex;
  position: relative;
  padding-bottom: 11px;
  cursor: pointer;
  justify-content: space-between;
  &::after {
    content: "";
    display: block;
    margin-top: 10px; // @ts-ignore
    height: 1px;
    background: #d1d1d1;
    opacity: 73%;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

const Div = styled.div<LayoutProps>`
  overflow-y: scroll;
  position: relative;
  direction: ltr;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  height: 78%;
  ${layout}
`;

const Input = styled.div`
  position: relative;
  display: flex;
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
const Check = styled.div`
  height: 20px;
`;

function Neighborhood({
  city,
  setSelected,
  selected,
  goBack,
  ostan,
  availableAll = true,
}: {
  city: string;
  ostan: string;
  setSelected: Function;
  selected: SelectedCities;
  goBack: Function;
  availableAll?: boolean;
}) {
  const [scrollEnd, setScrollEnd] = useState(false);
  // console.log(ostan, city, availableAll)
  // @ts-ignore
  useEffect(() => {
    if (
      cityList?.[ostan]["cities"]?.[city] &&
      Object.keys(cityList?.[ostan]["cities"]?.[city]?.["areas"]).length === 0
    ) {
      setSelected(
        search_keys_to_set_get_all_area,
        //@ts-ignore
        cityList[ostan]["cities"][city]["slug"]
      );
      goBack();
    }
  }, []);

  function _onScrollY(e: UIEvent) {
    const target = e.target as HTMLDivElement;
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }
  const onScrollY = useCallback(_.debounce(_onScrollY, 100), []);

  const [filterString, setFilterString] = useState("");

  function search(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    //
    setFilterString(value);
  }

  // @ts-ignore
  const filtredNeighorhood =
    filterString &&
    filterString.length > 0 &&
    city &&
    cityList?.[ostan]["cities"]?.[city]?.["areas"]
      ? // @ts-ignore
        Object.keys(cityList[ostan]["cities"][city]["areas"])?.filter(
          (area: string) => area.includes(filterString)
        )
      : // @ts-ignore
      cityList?.[ostan]["cities"]?.[city]?.["areas"]
      ? // @ts-ignore
        Object.keys(cityList[ostan]["cities"][city]["areas"])
      : [];

  return (
    <Form paddingBottom={["70px", ""]}>
      <Input>
        <InputText onChange={search} type="text" placeholder="جـسـتـجو محله" />
        <Img>
          <Image
            height={15}
            width={15}
            src={"/icons/grey-search-icon.svg"}
            alt="search"
          />
        </Img>
      </Input>
      <Div
        height={["100%"]}
        className={"scroll-d-none"}
        onScroll={(e: any) => onScrollY(e)}
      >
        <List>
          {availableAll && (
            <Li
              onClick={() => {
                setSelected(
                  search_keys_to_set_get_all_area,
                  //@ts-ignore
                  cityList[ostan]["cities"][city]["slug"]
                );
              }}
            >
              <div>{search_keys_to_set_get_all_area}</div>
              {selected?.[ostan]?.[city]?.indexOf(
                search_keys_to_set_get_all_area
              ) > -1 ? (
                <Check>
                  <Image
                    src={"/icons/modalcity-checked.svg"}
                    height={20}
                    width={20}
                    alt="checked"
                  />
                </Check>
              ) : (
                <Check>
                  <Image
                    src={"/icons/select.svg"}
                    height={20}
                    width={20}
                    alt="select"
                  />
                </Check>
              )}
            </Li>
          )}
          {
            // @ts-ignore
            city && cityList[ostan]["cities"][city]["areas"]
              ? // @ts-ignore
                Object.values(filtredNeighorhood).map(
                  (area: string, i: number) => (
                    <Li
                      key={i}
                      onClick={() => {
                        setSelected(
                          area,
                          //@ts-ignore
                          cityList[ostan]["cities"][city]["slug"]
                        );
                      }}
                    >
                      <div>
                        {cityList[ostan]["cities"][city]["areas"][area]["name"]}
                      </div>
                      {selected?.[ostan]?.[city]?.indexOf(area) > -1 ? (
                        <Check>
                          <Image
                            src={"/icons/modalcity-checked.svg"}
                            height={20}
                            width={20}
                            alt="checked"
                          />
                        </Check>
                      ) : (
                        <Check>
                          <Image
                            src={"/icons/select.svg"}
                            height={20}
                            width={20}
                            alt="select"
                          />
                        </Check>
                      )}
                    </Li>
                  )
                )
              : ""
          }
        </List>
      </Div>
    </Form>
  );
}

export default Neighborhood;
