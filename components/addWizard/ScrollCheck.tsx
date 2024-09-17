import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import Image from "next/image";
import AdsUploadContext from "./AdsUploadContext";
import steps from "./AdsUploadConfig";
import { Filter } from "../../types";
import simpleFilters from "@/dictionaries/simple-filters.json";
import cFilters from "@/dictionaries/company-filters.json";
import { useAppSelector } from "@/store/hook";
const SideCheck = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  position: sticky;
  height: 72vh;
  direction: rtl;
  top: 120px;
  z-index: 0;
  @media (max-width: 768px) {
    top: 120px;
  }
  ${layout}
`;

const Red = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #db143d;
  margin-top: 5px;
`;

const Img = styled.div<FlexboxProps | LayoutProps | SpaceProps>`
  align-items: center;
  display: flex;
  height: 31px;
  ${layout}
  ${flexbox}
    ${space}
`;
const ImgCheck = styled.div<
  FlexboxProps | LayoutProps | SpaceProps | ColorProps
>`
  z-index: 2;
  display: flex;
  margin: 0 auto;
  ${color}
  ${layout}
    ${flexbox}
    ${space}
`;
const Piece = styled.div`
  margin-top: auto;
  height: 18px;
`;
const Flex = styled.div<SpaceProps | FlexboxProps>`
  display: flex;
  margin-right: auto;
  &.point {
    cursor: pointer;
  }
  ${flexbox}
  ${space}
`;
const Bar = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  width: 25px;
  padding: 20px 2.5px;
  background: rgba(209, 209, 209, 0.18);
  border-radius: 9px;
  position: relative;
  height: 100%;
  ${space}
`;

const Div = styled.div`
  font-size: 11px;
  color: #707070;
  margin-top: 25px;
  margin-right: auto;
`;

const Span = styled.div<HeightProps | ColorProps>`
  // background:#00c39c;
  border-radius: 6px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  height: fit-content;
  justify-content: space-between;
  transition: 1s height ease-in-out;
  position: absolute;
  width: 25px;
  right: 0;
  // &>div{
  //     margin:auto;
  // }
  // &>div:first-child{
  //     margin:10px 0 ;
  // }
  // &>div:nth-child(2){
  //     margin:60px 0 0 0;
  // }
  // &>div:nth-child(3){
  //     margin:120px 0 0 0;
  // }
  ${color}
  ${height}
`;
const Box = styled.div<FlexboxProps>`
  z-index: 2;
  margin: 0 auto;
  display: flex;
  ${flexbox}
`;
const Spot = styled.div`
  margin: auto auto 5px auto;
  background: white;
  border-radius: 7px;
  height: 7px;
  width: 7px;
`;
export default function ScrollCheck() {
  const progress = ["10%", "20%", "50%", "80%", "100%"];
  const [bg, setBack] = useState("");
  const {
    setStep,
    setLevel,
    level,
    editMode,
    title,
    filters,
    pictures,
    content,
    city,
    mobile,
    category,
    companyFiltersCompleted,
    selectedFilter,
    email,
    tel,
    showMobile,
    filtersCompleted,
    companycity,
    companyArea,
    setCity,
    setArea,
  } = useContext(AdsUploadContext);
  //@ts-ignore
  const companyInfo = useAppSelector((state) => state.companyInfo);

  useEffect(() => {
    let _f = [];
    filters.map((f: Filter) => {
      if (f.is_required) {
        _f.push(f);
      }
    });

    function isEveryItemValid(base: any[], obj: { [keys: number]: any }) {
      Object.keys(obj).forEach((key: string) => {
        //  if (!base[parseInt(key) - 1].is_required) {
        //    delete obj[parseInt(key)];
        // }
      });
      return Object.values(obj).every((value) => {
        return value !== "" && value !== null && value !== undefined;
      });
    }

    // isCFC = isCompanyFiltersCompleted
    const isCFC = () => {
      let values: {
        [k: string]: any;
      };
      let orginal = [];
      if (level == 2) {
        values = Object.fromEntries(
          Object.entries(selectedFilter).slice(0, 15)
        );
        orginal = simpleFilters.filters;
      } else {
        orginal = [...simpleFilters.filters, ...cFilters.filters];
        selectedFilter[22] = { area: companyArea, city: companycity };
        values = selectedFilter;
      }

      const isValid = isEveryItemValid(orginal, values);
      return isValid;
    };
    const validation_level = {
      0: category && category.id !== 0,
      1: city && city.id !== -1,
      2: filtersCompleted,
      3: isCFC(),
      4: mobile.length > 10,
    };
    //@ts-ignore
    let l: number = Object.keys(validation_level).find((i) => {
      //@ts-ignore
      return !validation_level[i];
    });

    if (companyInfo.hasCompany && companyInfo.id !== "" && level > 2) {
      setLevel(4);
    } else if (l) {
      setLevel(l);
    } else {
      setLevel(5);
    }
  }, [
    title,
    filters,
    pictures,
    content,
    city,
    mobile,
    category,
    showMobile,
    tel,
    email,
    selectedFilter,
  ]);

  let back: string = "";
  useEffect(() => {
    switch (level) {
      //@ts-ignore
      case "0":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "1":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "2":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "3":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "4":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "5":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "6":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;
      //@ts-ignore
      case "7":
        back = "linear-gradient(rgba(0, 195, 156,1), rgba(0, 195, 156,1)";
        setBack(back);
        break;

      default:
    }
  }, [level]);

  return (
    <SideCheck display={["none", "flex"]}>
      {!editMode && (
        <Flex
          className={"point"}
          mb={"10px"}
          mr={"auto"}
          onClick={() => {
            setStep(steps["select_category"]),
              setLevel(0),
              localStorage.removeItem("wizard");
            // setCity({ id: -1, name: "" }),
            // setArea({ id: -1, name: "" });
          }}
        >
          <Red>ثــبت آگهـــی</Red>
          <Img mr={"5px"}>
            <Image width={25} height={25} src={`/icons/adds icon.svg`} alt="" />
          </Img>
        </Flex>
      )}
      <Flex flex={"1 1 100%"}>
        <Bar mr={"5px"}>
          {level >= 1 ? (
            <ImgCheck flexBasis={"20%"}>
              <Piece>
                <Image
                  height={7}
                  width={10}
                  src={"/icons/white tick.svg"}
                  alt=""
                />
              </Piece>
            </ImgCheck>
          ) : (
            <Box flexBasis={"20%"}>
              <Spot></Spot>
            </Box>
          )}
          {level >= 2 ? (
            <ImgCheck flexBasis={"30%"}>
              <Piece>
                <Image
                  height={7}
                  width={10}
                  src={"/icons/white tick.svg"}
                  alt=""
                />
              </Piece>
            </ImgCheck>
          ) : (
            <Box flexBasis={"30%"}>
              <Spot></Spot>
            </Box>
          )}
          {level >= 3 ? (
            <ImgCheck flexBasis={"30%"}>
              <Piece>
                <Image
                  height={7}
                  width={10}
                  src={"/icons/white tick.svg"}
                  alt=""
                />
              </Piece>
            </ImgCheck>
          ) : (
            <Box flexBasis={"30%"}>
              <Spot></Spot>
            </Box>
          )}
          {level >= 4 ? (
            <ImgCheck flexBasis={"20%"}>
              <Piece>
                <Image
                  height={7}
                  width={10}
                  src={"/icons/white tick.svg"}
                  alt=""
                />
              </Piece>
            </ImgCheck>
          ) : (
            <Box flexBasis={"20%"}>
              <Spot></Spot>
            </Box>
          )}
          <Span style={{ background: bg }} height={progress[level]}></Span>
        </Bar>
      </Flex>
    </SideCheck>
  );
}
