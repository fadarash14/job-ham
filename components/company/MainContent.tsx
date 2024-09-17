import { Ads, Company } from "@/types";
import { convertIdsToTitles } from "@/utils/helper";
import React, { useState } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import Field from "./Field";
import dynamic from "next/dynamic";
import CardBox from "../wizard/CardBox";
import Col from "../utility/Col";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import EditCompany from "./EditCompany";
const companyFilters = require("@/dictionaries/company-filters.json");
const SimpleFilters = require("@/dictionaries/simple-filters.json");
const CvFilters = require("@/dictionaries/cv-filters.json");
const cities = require("@/dictionaries/cityId.json");
const MapWithNoSSR = dynamic(() => import("@/components/wizard/Map"), {
  ssr: false,
});
type Props = {
  data: Company;
  ads?: { rows: Ads[]; count: number };
  editMode?: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: white;
  padding: 24px 18px;
  padding-top: 40px;
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button<{ isClicked: boolean }>`
  display: flex;
  padding: 8px 32px;
  font-size: 15px;
  background: ${(props) => (props.isClicked ? "#db143d" : "white")};
  color: ${(props) => (props.isClicked ? "white" : "#db143d")};
  border: ${(props) =>
    props.isClicked ? "1px solid white" : " 1px solid #db143d"};
  border-radius: 12px;
  margin-left: 20px;
  text-align: center;
  cursor: pointer;
white-space: nowrap;
  @media (max-width: 870px) {
    font-size: 14px;
    padding-inline: 14px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
position: relative;
`;
const AdDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
`;
const Gps = styled.div<SpaceProps>`
  border: 1px soild #474546;
  height: 160px;
  width: 380px;
  border-radius: 18px;
  overflow: hidden;
  padding: 5px;
  &.mobile {
    display: none;
  }
  @media (max-width: 870px) {
    &.web {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
  ${space}
`;

const dictionary = (val: keyof typeof changer): string => {
  const changer: Record<string, string> = {
    typeCooperationId: "نوع همکاری",
    workHour: "روز و ساعت کاری",
    businessTrips: "سفرهای کاری",
    salaryId: "حقوق",
    advantageId: "مزایا و تسهیلات",
    jobDescription: "شرح شغل",
    description: "درباره شرکت",
    industryId: "صنعت",
    sizeCompanyId: "اندازه سازمان",
    typeOwnerShipId: "نوع مالکیت",
    typeActivityCompanyId: "نوع فعالیت",
    establishedYear: "سال تاسیس",
    descriptionServices: "محصولات و خدمات",
    skillDescription: "مهارت های مورد نیاز",
  };
  return changer[val] || "";
};

export default function MainContent({ data, ads, editMode }: Props) {
  const router = useRouter();
  const routerQueryTab = router.query.tab;
  const [tab, setTab] = useState(routerQueryTab ? +routerQueryTab : 0);
  //@ts-ignore
  const cData: Company = convertIdsToTitles(companyFilters, data);
  const locationString = () => {
    let location = {
      area: "",
      city: "",
    };
    const cityId = cData.cityId;
    const areaId = cData.areaId;
    console.log(data);
    console.log(cData);

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
  const convertData = () => {
    let datas: any[] = [];
    ads!.rows.map((ad) => {
      const salaryTitle = SimpleFilters.filters
        .find((x: any) => x.id === 2)
        .options.find((x: any) => x.id == ad.salaryId).title;
      const jobTypeTitle = CvFilters.typeCooperations.find(
        (x: any) => x.id == ad.typeCooperationId
      ).title;
      const post = {
        ...ad,
        company: data,
        areaString: locationString(),
        releasedAt: ad.registerDate,
        cityName: "",
        modifiedAt: 0,
        submitedAt: 0,
        salaryId: {
          title: salaryTitle,
        },
        typeCooperationId: {
          title: jobTypeTitle,
        },
      };
      datas.push(post);
      return ad;
    });
    return datas;
  };

  return (
    <>
      <ButtonWrapper>
        <Button onClick={() => setTab(0)} isClicked={tab === 0}>
          درباره شرکت
        </Button>
        {ads && (
          <Button
            className="ads"
            onClick={() => setTab(1)}
            isClicked={tab === 1}
          >
            {`${ads.count}  فرصت شغلی`}
          </Button>
        )}
        {editMode && (
          <Button
            className="edit"
            onClick={() => setTab(3)}
            isClicked={tab === 3}
          >
            ویرایش
          </Button>
        )}
      </ButtonWrapper>
      <Container>
        {tab === 0 ? (
          <>
            <RightDiv>
              {Object.entries(cData).map(([key, value], index) => {
                const title = dictionary(key);
                if (typeof value === "string" && title !== "")
                  return <Field key={index} label={title} content={value} />;
              })}
            </RightDiv>
            <LeftDiv>
              <Gps className={"web"} mb={"10px"}>
                <MapWithNoSSR cityId={cData.cityId} areaId={cData.areaId} />
              </Gps>
            </LeftDiv>
          </>
        ) : tab === 1 ? (
          <>
            <AdDiv>
              {convertData().map((ad, index) => {
                return (
                  <Col
                    flexGrow={1}
                    flexShrink={1}
                    pb={"8px"}
                    maxWidth={["500px", "500px", "500px", "500px", "500px"]}
                    flexBasis={["50%", "50%", "50%", "50%", "50%"]}
                    key={index}
                  >
                    <CardBox border={"1px solid #D5D5D5"} post={ad} />
                  </Col>
                );
              })}
            </AdDiv>
          </>
        ) : (
          <>
            <EditCompany data={data}></EditCompany>
          </>
        )}
      </Container>
    </>
  );
}
