import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";
import Image from "next/image";
import { space, SpaceProps } from "styled-system";
import { Filter, Post } from "../../types";
import { uniqueArrayByProperty } from "../../utils/helper";
import Location from "../../public/icons/white location.svg";
import moment from "jalali-moment";
import OnCard from "./OnCard";

const X: {
  [key: number]: {
    address: any;
    slug: "string";
  };
} = require("../../dictionaries/withId.json");

interface Props {
  posts: [object];
  perPage: number;
  page: number;
  count: number;
}

const Wizard = styled.a<AnchorHTMLAttributes<any>>`
  padding: 6px;
  text-align: right;
  background: white;
  border-radius: 15px;
  min-width: 168px;
  max-width: 168px;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 960px) {
    min-width: 168px !important;
  }
`;
const ImageData = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
  object-fit: cover;
  top: 0;
`;

const WizardImage = styled.div`
  border-radius: 15px;
  position: relative;
  width: 100%;
`;

const WizardTitle = styled.div`
  font-size: 14px;
  color: #474546;
  font-weight: 500;
  margin: 10px 0;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-width: 154px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 42px;
`;

const WizardDescription = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin: 8px 0;
`;
const ReleasedAt = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #db143d;
  margin-top: auto;
`;
const Img = styled.div<SpaceProps>`
  border-radius: 15px;
  object-fit: cover;
  cursor: pointer;
  & > div {
    border-radius: 15px;
  }
  ${space}
`;

const Main1 = styled.div`
  display: flex;
  align-items: center;
`;
const Where = styled.label`
  color: white;
  margin-right: 5px;
  font-size: 12px;
`;

const BadgeIcon = styled.img<any>`
  position: absolute;
  top: 0;
  right: 10%;
  width: 23px;
`;
const InstantBadge = styled.span`
  background: #fcc155;
  padding: 0.5px 11.6px 0.5px 11.5px;
  border-radius: 8px;
  color: black;
  font-size: 12px;
  position: absolute;
  left: 5%;
  top: 5%;
`;
const Label = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0;
  left: 0;
  width: 100%;
  height: 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  line-height: 30px;
  font-size: 12px;
  display: flex;
  align-content: center;
  padding-right: 10px;
  align-items: center;
  line-height: 12px;
  background-image: linear-gradient(
    to bottom,
    rgba(71, 69, 70, 0) 3%,
    #47454682 74%
  );
`;

const Div = styled.div`
  height: 127px;
  & img {
    object-fit: cover;
  }
`;

const Tozihat = styled.div`
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: justify;
`;
const Piece = styled.div`
  opacity: 32%;
`;
export default function SimilarJobs({ post }: { post: Post }) {
  const icon = {
    color: "white",
    width: "12px",
    lineHeight: "30px",
    fill: "white",
  };
  moment.locale("fa");
  const filters = uniqueArrayByProperty(post.filters, (f: Filter) => {
    if (f.label) {
      return f.label;
    }
    return false;
  });

  let badge = post.badges?.includes("realState")
    ? "/icons/agency_tag.svg"
    : post.badges?.includes("carDealership")
    ? "/icons/car_tag.svg"
    : post.badges?.includes("pictorial")
    ? "/icons/GERAPHIC.svg"
    : post.badges?.includes("newsPaper")
    ? "/icons/newspaper_tag.svg"
    : null;
  const instant = post.badges?.includes("InstantBadge");
  const pic = post.pictures?.[0]?.thumbnail
    ? post.pictures?.[0]?.thumbnail
    : //@ts-ignore
      post.pictures?.thumbnail?.thumbnail;

  const address = X[post.category.categoryId]?.address;
  var result = address?.split(/[:]+/);

  let src: string =
    pic && pic.startsWith("http")
      ? pic
      : [1161, 1128, 1180, 1210, 1218, 1225, 1251, 1264, 1271, 1283].includes(
          parseInt(result?.[1])
        )
      ? `/icons/null-svg/${result?.[1]}n.svg`
      : "/null.svg";

  return (
    <Wizard href={`/job-detail/${post.id}`}>
      <ImageData>
        {badge && <BadgeIcon src={badge} alt="" />}
        {instant && <InstantBadge>{"فـوری"}</InstantBadge>}
        <Div>
          <Image
            fill
            src={src}
            unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
            alt=""
          />
          <Label>
            <Main1>
              <Location style={icon} />
              <Where>
                {post.location.cityString},{post.location.areaString}
              </Where>
            </Main1>
          </Label>
        </Div>
      </ImageData>
      <WizardTitle>{post.name ? post?.name : "بدون عنوان"}</WizardTitle>
      {
        //@ts-ignore
        Object.values(filters).filter((item: any) => item.is_visibleoncard) &&
        Object.values(filters).filter((item: any) => item.is_visibleoncard)
          .length !== 0 ? (
          <WizardDescription>
            {Object.values(filters).filter((item: any) => item.is_visibleoncard)
              .length === 1
              ? Object.values(filters)
                  .filter((item: any) => item.is_visibleoncard)
                  .map((item: any, index) => (
                    <div key={index}>
                      <OnCard
                        type={filters.key}
                        label={item?.label}
                        value={item?.options?.[0]?.name}
                        unit={item?.unit}
                        show={item?.is_visibleoncard}
                      />
                      <WizardDescription>
                        <Piece>توضیحات</Piece>
                        <Tozihat>{post.content}</Tozihat>
                      </WizardDescription>
                    </div>
                  ))
              : Object.values(filters).filter(
                  (item: any) => item.is_visibleoncard
                ).length > 1
              ? Object.values(filters)
                  .filter((item: any) => item.is_visibleoncard)
                  .map((item: any, index) => (
                    <OnCard
                      type={filters.key}
                      key={index}
                      label={item?.label}
                      value={item?.options?.[0]?.name}
                      unit={item?.unit}
                      show={item?.is_visibleoncard}
                    />
                  ))
              : null}
          </WizardDescription>
        ) : (
          <WizardDescription>
            <Piece>توضیحات</Piece>
            <Tozihat>{post.content}</Tozihat>
          </WizardDescription>
        )
      }
      <ReleasedAt>{moment(parseInt(post.releasedAt)).fromNow()}</ReleasedAt>
    </Wizard>
  );
}
