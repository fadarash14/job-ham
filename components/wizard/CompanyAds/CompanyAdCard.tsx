import React, { Dispatch, MouseEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import Location from "../../../public/icons/Location.svg";
import { Ads, Company } from "../../../types";
import moment from "jalali-moment";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flex,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  justifyContent,
  JustifyContentProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

import { fadeInDown } from "react-animations";
import CompanyAdDialogue from "./CompanyAdDialogue";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
const cities = require("../../../dictionaries/cityId.json");

const fadeInAnimation = keyframes`${fadeInDown}`;

const Card = styled.div`
  background: #F9F9F9;
  padding: 7px;
  border-radius: 15px;
  border:1px solid #D1D1D1;
  direction: rtl;const X:{[key:number]:{
        address: any;
        slug:'string'}}=require( '../../dictionaries/withId.json')


  height: 100%;
  display: flex;
  flex-direction: column;
  // cursor: pointer;
`;

const ImageData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BadgeIcon = styled.img<any>`
  position: absolute;
  top: 0;
  right: 10%;
  width: 20%;
  z-index: 1000;
`;

const Where = styled.label`
  color: #acacac;
  margin-right: 5px;
  font-size: 13px;
`;

const Content = styled.div`
  margin-right: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 14px;
  color: #474546;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-width: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Descript = styled.div`
  color: #474546;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  *:first-child {
    margin-right: 5px;
  }
`;

const Main = styled.div`
  display: flex;
`;
const Section = styled.div<SpaceProps | FlexboxProps | LayoutProps>`
  @media (max-width: 576px) {
    &.seperate::after {
      content: "";
      display: block;
      height: 1px;
      background: #d1d1d1;
      width: 100%;
      opacity: 0.3;
      margin-top: 8px;
    }
  }
  ${layout}
  ${flexbox}
  ${space}
`;

const Sect = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const DivContainer = styled.div<LayoutProps | SpaceProps | FlexboxProps>`
  display: flex;
  align-items: center;
  ${flexbox}
  ${layout}
  ${space}
`;
const CompanyInf = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: rgb(252, 193, 85, 0.43);
  font-size: 11px;
  border-radius: 10px;
  width: 100%;
  max-width: 148px;
  height: 24px;
  margin-left: 17px;
`;

const Button = styled.div<
  | BorderProps
  | ColorProps
  | BackgroundColorProps
  | SpaceProps
  | LayoutProps
  | FlexboxProps
  | JustifyContentProps
>`
  display: flex;
  align-items: center;
  font-size: 11px;
  min-width: fit-content;
  cursor: pointer;
  &.res {
    max-width: 270px;
    width: 100%;
  }
  @media (max-width: 1200px) and (min-width: 576px) {
    &.res {
      flex-direction: column;
      width: fit-content;
      padding: 5px 10px;
    }
  }
  ${border}
  ${layout}
  ${color}
  ${space}
  ${flex}
  ${justifyContent}
`;

const State = styled.div<ColorProps>`
  width: 90px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  ${color}
`;
const Status = styled.div<BackgroundColorProps | ColorProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  ${backgroundColor}
  ${color}
`;

const Line = styled.div<ColorProps>`
  width: 100%;
  background: #707070;
  color: #707070;
  margin: 5px auto;
  height: 1px;
  ${color}
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  overflow: auto;
  animation: 0.5s ${fadeInAnimation};
`;
const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 160px;
  margin: auto 6px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: black;
  }
  @media (max-width: 768px) {
    & span {
      font-size: 14px;
    }
    & label {
      font-size: 14px;
    }
  }
`;
const RecordLabel = styled.label`
  color: #474546;
  font-size: 14px;
  white-space: nowrap;
`;
const Span = styled.span<
  FontSizeProps | FontWeightProps | SpaceProps | LayoutProps | ColorProps
>`
  ${color}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${layout}
`;
interface IProps {
  post: Ads;
  company: Company;
  background?: string;
  name: string;
  path?: string;
  handleOnclick: any;
  color: string;
  setShowModal: Dispatch<{ show: boolean; id: string }>;
  showModal: { show: boolean; id: string };
}

const mockRecords = {
  recieved: 400,
  unreview: 300,
  waiting: 10,
  registered: 5,
};
const icon = {
  color: "#acacac",
  width: "12px",
  lineHeight: "30px",
};
moment.locale("fa");

function CompanyAdCard(props: IProps) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const locationString = () => {
    let location = {
      area: "",
      city: "",
    };
    const cityId = props.post.cityId;
    const areaId = props.post.areaId;

    const cityIndex = Object.keys(cities).find((x) => x === cityId.toString());
    if (cityIndex !== undefined) {
      const cityInfo = cities[cityIndex].name;
      let areaInfo: string = "";
      if (cities[cityIndex].areas && !isEmpty(cities[cityIndex].areas)) {
        areaInfo =
          areaId !== undefined ? cities[cityIndex].areas?.[areaId]?.name : "";
      } else {
        areaInfo = cities[cityIndex].ostan
          .replace("استان", "")
          .replace(/-/g, " ");
      }

      location = {
        area: areaInfo,
        city: cityInfo,
      };
      if (areaInfo === "") {
        return `${cityInfo}`;
      }
      return `${cityInfo} , ${areaInfo}`;
    } else {
      return "";
    }
  };

  const clickCardHandler = () => {
    setShowDetails((prev) => !prev);
  };
  const resumesRouteHandler = (filter?: string) => {
    if (filter) {
      return router.push({
        pathname: "/resumeList",
        query: { id: props.post.id, filter },
      });
    }
    return router.push({
      pathname: "/resumeList",
      query: { id: props.post.id },
    });
  };

  const convertUnixTimestamp = () => {
    const timestamp: number | null = props.post.registerDate;
    const date =
      timestamp !== null
        ? moment(parseInt(String(timestamp)) * 1000).fromNow()
        : "نامشخص";
    return date;
  };
  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    props.setShowModal({ show: true, id: props.post.id });
  };
  return (
    <Card onClick={clickCardHandler}>
      <Main>
        <ImageData>
          <Status>
            <State backgroundColor={props.background} color={props.color}>
              <Span fontSize={12} fontWeight={500}>
                {props.name}
              </Span>
            </State>
          </Status>
        </ImageData>
        <Content className="content">
          <Header className="header">{props.post.jobTitle}</Header>
          <Sect>
            <Section display={"flex"} flexDirection={"column"}>
              <DivContainer>
                <CompanyInf>
                  <Span color={"#2D2C2C"} px={"10px"}>
                    {props.company.nameCompany}
                  </Span>
                </CompanyInf>
                <Location style={icon} />
                <Where>{locationString()}</Where>
              </DivContainer>
            </Section>
          </Sect>
        </Content>
        <DivContainer flexDirection={"column"} display={["none", "flex"]}>
          <Button
            border={"1px solid #DB143D"}
            color={"#DB143D"}
            mr={"auto"}
            ml={"12px"}
            padding={"4px 7px"}
            borderRadius={9}
            onClick={showModalHandler}
          >
            وضعیت درخواست
          </Button>
          {props.showModal.id === props.post.id && (
            <CompanyAdDialogue
              setShow={() =>
                props.setShowModal({ show: false, id: props.post.id })
              }
              show={props.showModal.show}
              type={props.post.status}
              id={props.post.id}
              date={convertUnixTimestamp()}
              key={parseInt(props.post.id)}
            />
          )}

          <Descript className="description">{convertUnixTimestamp()}</Descript>
        </DivContainer>
      </Main>
      {showDetails && (
        <Details>
          {mockRecords.recieved && (
            <Record onClick={() => resumesRouteHandler("ALL")}>
              <RecordLabel>رزومه دریافت شـده</RecordLabel>
              <Line />
              <Span fontSize={"18px"}>{mockRecords.recieved}</Span>
            </Record>
          )}
          {mockRecords.unreview && (
            <Record onClick={() => resumesRouteHandler("SEND")}>
              <RecordLabel>بررسی نشده</RecordLabel>
              <Line />
              <Span fontSize={"18px"}>{mockRecords.unreview}</Span>
            </Record>
          )}
          {mockRecords.waiting && (
            <Record onClick={() => resumesRouteHandler("SHOW")}>
              <RecordLabel>در انتظار تعیین وضعیت</RecordLabel>
              <Line />
              <Span fontSize={"18px"}>{mockRecords.waiting}</Span>
            </Record>
          )}
          {mockRecords.registered && (
            <Record onClick={() => resumesRouteHandler("ACCEPT")}>
              <RecordLabel>تایید برای مصاحبه</RecordLabel>
              <Line />
              <Span fontSize={"18px"}>{mockRecords.registered}</Span>
            </Record>
          )}
        </Details>
      )}
    </Card>
  );
}

CompanyAdCard.defaultsProps = {
  background:
    "linear-gradient(to bottom, rgba(71, 69, 70, 0) 3%, #47454682 74%)",
  name: "",
  path: "",
};

export default CompanyAdCard;
