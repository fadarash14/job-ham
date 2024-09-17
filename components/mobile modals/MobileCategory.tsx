import React, {
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  SpaceProps,
  space,
} from "styled-system";
import Image from "next/image";
const catIDs: {
  [key: string]: CategoryType;
} = require("../../dictionaries/withId.json");
import parents from "../../dictionaries/parents.json";
import MobileSideBarSection from "../sidebar/blocks/MobileSection";
import { Category as CategoryType, Filter } from "../../types";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import mobileConfig, {
  setShowHome,
  setShowMobileCategory,
} from "../../store/mobilePage";
import { useRouter } from "next/router";
import useUrlMaker from "../../hooks/useUrlMaker";
import useUrlValues from "../../hooks/useUrlValues";
import { search_keys_to_set_get } from "../../utils/searchConfig";
import SideBarContext from "../sidebar/context/SideBarContext";

const Ul = styled.ul<LayoutProps>`
  list-style-type: none;
  direction: rtl;
  padding-right: 0;
  flex-direction: column;
  margin: 0 19px;
  ${layout}
`;

const Li = styled.li`
  position: relative;
  cursor: pointer;
  padding: 5px 8px;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  align-items: center;
  background: #f5f6fa;
  border: 1.5px solid rgba(245, 246, 250, 0.6);
  border-radius: 20px;

  :hover {
    color: #db143d;
  }
`;

const Backto = styled.li`
  position: relative;
  cursor: pointer;
  padding: 10px 10px 10px 0;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  align-items: center;

  :hover {
    color: #db143d;
  }
`;

const LiiiSub = styled.li`
  position: relative;
  cursor: pointer;
  padding: 10px 10px 10px 0;
  margin-bottom: 5px;
  display: flex;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  &.has-border {
    border-right: 1px solid #db143d;
    margin-right: 22px;
    padding-right: 20px;
    color: #fcc155;
  }
  :hover {
    color: #db143d;
  }
`;

const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  ${layout}
  ${flexbox}
    ${space}
`;
const Mute = styled.div<SpaceProps>`
  font-size: 11px;
  display: flex;
  flex-wrap: nowrap;
  color: #acacac !important;
  overflow: hidden;
  width: 55vw;
  white-space: nowrap;
  align-items: center;
  ${space}
`;
const Lii = styled.li`
  cursor: pointer;
  margin-bottom: 5px;
  display: flex;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  align-items: center;
  &.has-border {
    padding: 10px 0;
    border-right: 2px solid #db143d;
    margin-right: 15px;
    padding-right: 10px;
    font-size: 14px;
    color: #db143d;
  }
  :hover {
    color: #db143d;
  }
`;

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border-right: 2px solid #f5f6fa;
  margin-right: 50px;
  padding-right: 20px;

  &.has-border {
    margin-right: 15px;
  }
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  background: white;
  border-radius: 20px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 10px;
  background: white;
  border-radius: 20px;
`;

const Sub = styled.li`
  font-size: 14px;
  margin: 5px;
  cursor: pointer;
  position: relative;
  font-weight: 500;
  display: flex;
  &:hover {
    color: #db143d;
  }

  &.active {
    color: #db143d;
    &::before {
      content: "";
      position: absolute;
      right: -27px;
      background: #db143d;
      height: 6px;
      width: 3px;
      border-radius: 3px;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 22;
    }
  }
  &.all {
    font-weight: 600;
  }
`;
const Head = styled.div`
  position: sticky;
  margin: 0 19px;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background: white;
  top: 0;
  z-index: 5;
`;
const Text = styled.div<SpaceProps>`
  color: #474546;
  font-size: 14px;
  flex: 1 1;
  ${space}
`;
const filtersDictionary: {
  [key: string]: any;
} = require("../../dictionaries/filters.json");

function MobileCategory() {
  const [links, setLinks] = useState<CategoryType[]>([]);
  const [isActive, setActive] = useState(-1);
  const [, setSelectedCategory] = useUrlMaker();
  const values = useUrlValues([search_keys_to_set_get["category"]]);
  const [current, setCurrent] = useState<number>(0);
  const { setCurrentFilters } = useContext(SideBarContext);

  useEffect(() => {
    //@ts-ignore
    const initial_category = values?.category ? values.category?.id : 0;
    let current_cat = catIDs[initial_category.toString()];

    if (current_cat) {
      const sub = current_cat["subs"];

      if (sub.length === 0) {
        let address = current_cat["address"].toString().split(":");
        setCurrent(parseInt(address[address.length - 2]));
        setActive(initial_category);
      } else {
        setCurrent(parseInt(String(initial_category)));
      }
      if (setCurrentFilters) {
        //@ts-ignore
        let _selected_filter: string[] = [];
        if (initial_category !== 0) {
          catIDs[initial_category.toString()]["filters"]
            ?.sort((a: Filter, b: Filter) => {
              return a.ordernumber - b.ordernumber;
            })
            ?.map((ob: { filter_id: number }) => {
              if (
                typeof filtersDictionary[String(ob.filter_id)] !== "undefined"
              )
                _selected_filter.push(
                  filtersDictionary[String(ob.filter_id)]["key"]
                );
            });
          setCurrentFilters(_selected_filter);
        } else {
          setCurrentFilters([]);
        }
      }
    } else {
      if (setCurrentFilters) {
        setCurrentFilters([]);
      }
    }
  }, [values, setCurrentFilters]);

  useEffect(() => {
    let links = [];
    //
    if (current !== 0) {
      /*find category address to parents and child to build links*/

      const category_address = catIDs[current.toString()]["address"];
      let sliced = category_address.toString().split(":");
      for (let i = sliced.length - 1; i >= 1; i--) {
        links.push(catIDs[sliced[i]]);
      }
      //  ;
    }
    setLinks(links);
    /*find category address to parents and child to build links*/
  }, [current]);

  useEffect(() => {
    /*find set active category in search url*/
    //@ts-ignore
    if (isActive !== -1 && isActive !== values?.category?.id) {
      if (catIDs[isActive.toString()]) {
        setSelectedCategory({
          [search_keys_to_set_get["category"]]: catIDs[isActive.toString()],
        });
      } else if (isActive === 0) {
        setSelectedCategory({ [search_keys_to_set_get["category"]]: null });
      }
    }
  }, [isActive]);

  function onClickParent(cat: CategoryType) {
    setCurrent(cat.id);
    setActive(cat.id);
  }

  function onClickLayer(n: number) {
    setCurrent(links[n].id);
    setActive(links[n].id);
  }

  function onClickLastLayer(s: CategoryType) {
    s.subs.length > 0 ? setCurrent(s.id) : setActive(s.id);
  }

  function bacToPrent() {
    setCurrent(0);
  }

  function ReturnCategory(links: any[], n: number) {
    let i = n;
    let node = <></>;
    while (i > 0) {
      node = (
        <Category>
          <LiiiSub
            className={i !== links.length - 1 ? "has-border" : ""}
            onClick={() => {
              () => setCurrent(links[n].id);
            }}
          >
            {[
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && (
              <Img ml={"5px"}>
                <Image
                  width={30}
                  height={30}
                  src={`/icons/inside dashboard- selected categories/${links[n].id}s.svg`}
                  alt="svg"
                />
              </Img>
            )}
            {links[n].name}
          </LiiiSub>
          {ReturnCategory(links, i - 1)}
        </Category>
      );
      i--;
    }
    if (n === 0) {
      node = (
        <Main>
          <Lii className={i !== links.length - 1 ? "has-border" : ""}>
            {[
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && (
              <Img ml={"5px"}>
                <Image
                  width={30}
                  height={30}
                  alt="svg"
                  src={`/icons/inside dashboard- selected categories/${links[n].id}s.svg`}
                />
              </Img>
            )}
            {![
              1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283,
            ].includes(links[n].id) && (
              <Img
                ml={"10px"}
                onClick={() =>
                  links[n + 1] ? onClickLastLayer(links[n + 1]) : bacToPrent()
                }
              >
                <Image
                  alt="svg"
                  width={10}
                  height={10}
                  src={`/icons/Group 1922.svg`}
                />
              </Img>
            )}
            {links[n].name}
          </Lii>
          <SubCategory className={i == links.length - 1 ? "has-border" : ""}>
            {links[0].subs.map((s: CategoryType, index: number) => (
              <Sub
                key={index}
                className={isActive === s.id ? "active" : ""}
                onClick={() => onClickLastLayer(s)}
              >
                {s.name}
              </Sub>
            ))}
            <Sub className={"all"} onClick={() => setActive(links[n].id)}>
              همه آگهی های {links[n].name}
            </Sub>
          </SubCategory>
        </Main>
      );
    }

    return node;
  }

  //@ts-ignore
  const { showMobileCategory } = useAppSelector((state) => state.mobileConfig);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(setShowMobileCategory(false));
  }, [router?.query?.key]);

  return (
    <MobileSideBarSection show={showMobileCategory}>
      <Head>
        <Image
          src={"/icons/heLogo.svg"}
          // layout={"fixed"}
          height={25}
          width={25}
          alt="heLogo"
        />

        <Text mr={"5px"}>نیـازمندی‌های هـمشـهری</Text>
      </Head>
      <Ul className={"scroll-d-none"}>
        {current !== 0 ? (
          <Ul className={"scroll-d-none"}>
            <Backto onClick={() => bacToPrent()}>
              <Img ml={"5px"}>
                <Image
                  // layout={"fixed"}
                  width={30}
                  height={30}
                  src={`/icons/arrow right.svg`}
                  alt="arrow"
                />
              </Img>
              هــمه دسته هـــا
            </Backto>
            {ReturnCategory(links, links.length - 1)}
          </Ul>
        ) : (
          Object.values(parents).map((cat, i) => {
            let subs: string[] = [];
            //@ts-ignore
            cat.subs.map((cat: CategoryType, i: number) => {
              if (i < 5) {
                subs.push(cat.name);
              }
            });
            return (
              <Li key={i} onClick={() => setCurrent(cat.id)}>
                <Img ml={"5px"} flex={"0 0 35px"}>
                  <Image
                    width={35}
                    height={35}
                    src={`/icons/mobile_category/${cat.id}m.svg`}
                    alt={`${cat.id}m.svg`}
                  />
                </Img>
                <div>
                  {cat.title}
                  {subs.length > 0 && <Mute ml={"10px"}>{subs.join(",")}</Mute>}
                </div>
                <Img flex={"0 0 18px"} mr={"auto"}>
                  <Image
                    width={18}
                    height={18}
                    src={`/icons/arrow-left.svg`}
                    alt={"arrow"}
                  />
                </Img>
              </Li>
            );
          })
        )}
      </Ul>
    </MobileSideBarSection>
  );
}

export default MobileCategory;
