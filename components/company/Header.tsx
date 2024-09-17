import { Company } from "@/types";
import { convertIdsToTitles } from "@/utils/helper";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
const companyFilters = require("@/dictionaries/company-filters.json");
const cities = require("@/dictionaries/cityId.json");
import { isEmpty } from "lodash";
import { LayoutProps, SpaceProps, layout, space } from "styled-system";
import UploadProfile from "../cv/UploadProfile";
import UplaodBanner from "./UploadBanner";
import { removePicture } from "@/requests/cv";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  data: Company;
  editMode?: boolean;
};
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border: 1px solid #d1d1d1;
  height: 280px;
  margin-top: 24px;
  position: relative;
  overflow-x: hidden;
  @media (max-width: 768px) {
    min-height: 350px;
  }
`;
const Banner = styled.div<{ banner: string }>`
  display: flex;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  width: 100%;
  height: 180px;

  background-image: ${({ banner }) => `url("${banner}")`};
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  img {
    cursor: pointer;
  }
`;
const Logo = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 8px;
  bottom: 40px;
  background-color: white;
  right: 40px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.59);
  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.59);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.59);
  position: absolute;
  & img {
    border-radius: 8px;
  }
  &.image-size {
    width: 112px;
    height: 112px;
    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
      top: 120px;
      /* transform: translateY(-50%); */
      right: 10px;
    }
  }
  .remove {
    position: absolute;
    top: -6px;
    right: -6px;
    cursor: pointer;
  }
`;
const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 170px;
  @media (max-width: 768px) {
    margin-right: 10px;
    & > :nth-child(2) {
      margin-right: 100px;
      margin-top: 5px;
    }
  }
`;
const Flex = styled.div<SpaceProps | LayoutProps>`
  display: flex;
  align-items: center;
  ${layout}
  ${space}
`;
const Content = styled(Flex)`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    min-height: 110px;
  }
`;
const Span = styled.span``;
const Category = styled.div`
  display: flex;
  border-radius: 16px;
  padding: 3px 7px;
  border: 1px solid #d1d1d1;
  color: #d1d1d1;
  font-size: 12px;
  text-align: center;
  width: fit-content;
`;
const Title = styled.span`
  color: #474546;
  margin-top: 4px;
  font-size: 24px;
  white-space: nowrap;
  font-weight: 500;
  @media (max-width: 768px) {
    white-space: normal;
    font-size: 20px;
    margin-right: 100px;
  }
`;
const Where = styled.label`
  color: #acacac;
  margin-right: 5px;
  font-size: 13px;
`;
const LogoWrapper = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 8px;
  bottom: 7px;
  right: 40px;
  position: absolute;

  @media (max-width: 768px) {
    top: 150px;
    right: 5px;
  }
`;
const Cell = styled(Where)``;

export default function Header({ data, editMode }: Props) {
  const [image, setImage] = useState(data.bannerId);
  const [logo, setLogo] = useState(data.logoId ? data.logoId : "");
  console.log(logo);

  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const token = Cookies.get("token")!;
  const queryClient = useQueryClient();
  //@ts-ignore
  const cData: Company = convertIdsToTitles(companyFilters, data);
  console.log(data);

  const locationString = () => {
    let location = {
      area: "",
      city: "",
    };
    const cityId = cData.cityId;
    const areaId = cData.areaId;

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
  const removeImage = async () => {
    const res = await removePicture(logo!, 1, +data.id!, token);
    if (res.errorCode == 200) {
      queryClient.invalidateQueries({ queryKey: ["getMyCompany"] });
      setToast(true);
      setMessage("عملیات با موفقیت انجام شد.");

      setLogo("");
    } else {
      console.log(res.errorMessage);
    }
  };
  const bannerSrc = "/images/company-banner.png";
  return (
    <HeaderContainer>
      <Banner banner={image ? image : bannerSrc}>
        {editMode && (
          <UplaodBanner
            image={image ? image : ""}
            id={+data.id}
            setImage={setImage}
          />
        )}
      </Banner>

      {editMode ? (
        <>
          {logo != "" ? (
            <Logo className="image-size">
              <Image
                src={logo}
                alt={data.nameCompany}
                style={{ objectFit: "contain" }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Image
                height={20}
                width={20}
                src={"/icons/grey-remove.svg"}
                alt=""
                className="remove"
                onClick={removeImage}
              />
            </Logo>
          ) : (
            <LogoWrapper >
              <UploadProfile
                image={logo ? logo : ""}
                companyId={+data.id}
                setImage={setLogo}
                setToast={setToast}
                setMessage={setMessage}
              />
            </LogoWrapper>
          )}
        </>
      ) : data.logoId != null ? (
        <Logo className="image-size">
          <Image
            src={data.logoId}
            alt={data.nameCompany}
            fill
            style={{ objectFit: "fill" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Logo>
      ) : (
        <Logo className="image-size">
          <Image
            src={"/icons/companyL.svg"}
            alt={data.nameCompany}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Logo>
      )}

      <MainInfo>
        <Title>{cData.nameCompany}</Title>
        <Category>{cData.industryId}</Category>
        <Content mt={"4px"}>
          <Flex>
            <Image
              src={"/icons/Location.svg"}
              alt="location"
              width={12}
              height={12}
            />
            <Where>{locationString()}</Where>
          </Flex>
          <Flex>
            <Cell>{cData.sizeCompanyId}</Cell>
          </Flex>
          <Flex>
            <Image
              src={"/icons/laptop.svg"}
              alt={cData.webSiteUrl}
              width={19}
              height={19}
            />
            <Cell>
              <a
                rel="noreferrer"
                target="_blank"
                href={
                  cData.webSiteUrl.includes("http")
                    ? cData.webSiteUrl
                    : `//${cData.webSiteUrl}`
                }
              >
                {cData.webSiteUrl}
              </a>
            </Cell>
          </Flex>
        </Content>
      </MainInfo>
      {toast && (
        <Toast
          setIsHovering={setToast}
          isHovering={toast}
          type={"success"}
          text={message}
          confirm={false}
        />
      )}
    </HeaderContainer>
  );
}
