import React from "react";
import styled from "styled-components";
import { IAdJob } from "../../types";
import moment from "jalali-moment";
import Image from "next/image";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import { getJobDetail } from "@/store/jobInformation";

const Card = styled.div<ColorProps | BorderProps | SpaceProps>`
  padding: 9px;
  border: 1px solid rgba(209, 209, 209, 0.4);
  border-radius: 7px;
  direction: rtl;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  /* max-width: 390px; */
  max-height: 150px;
  ${color} ${space} ${border};
`;

const ImageData = styled.div`
  position: relative;
  height: 60px;
  min-width: 60px;
  overflow: hidden;
  border-radius: 15px;
  margin: auto;
  img .main-img {
    object-position: center;
  }
`;

const Where = styled.label`
  color: #acacac;
  margin-right: 5px;
  font-size: 12px;
`;

const Content = styled.div`
  margin-right: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const Header = styled.div`
  color: #474546;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  overflow: hidden;
  & .title {
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .titleWrapper {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  & .cTitle {
    font-size: 12px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 20 !important;
  }
  & .tTitle {
    font-size: 12px;
  }
  @media (min-width: 470px) and (max-width: 768px) {
    max-width: 350px;
  }
  @media (min-width: 420px) and (max-width: 470px) {
    max-width: 310px;
  }
`;

const Main = styled.div`
  display: flex;
`;

const RightDiv = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 100px;
  height: 100%;
  align-items: flex-end;
  position: absolute;
  left: 0;
  top: 0;
`;
const Location = styled.div``;
const LabelInfo = styled.div<
  BorderProps | LayoutProps | SpaceProps | ColorProps
>`
  font-size: 10px;
  border-radius: 2px;
  align-items: center;
  text-align: center;
  width: 80px;

  padding: 3px;
  ${border}
  ${layout}
  ${space}
  ${color}
`;

interface IProps {
  post: IAdJob;
  background: string;
  border: string;
  faveWizard?: Function;
}

export default function CardBox(props: IProps) {
  const dispatch = useAppDispatch();
  moment.locale("fa");
  const src: string = props.post.logoId
    ? props.post.logoId
    : "/icons/null-svg/1180n.svg";
  const router = useRouter();

  const dispatchJobHandler = () => {
    let width: number = 0;

    if (typeof window !== "undefined") {
      width = window.innerWidth;
    }
    if (router.pathname.includes("companies")) {
      router.push(`/job-detail/${props.post.id}`);
    } else if (width > 1024) {
      dispatch(getJobDetail(props.post));
    } else {
      router.push(`/job-detail/${props.post.id}`);
    }
  };

  return (
    <Card
      mx={["0", "5px"]}
      bg={props.background}
      border={props.border}
      onClick={() => dispatchJobHandler()}
    >
      <Main>
        <ImageData>
          <Image
            fill
            src={src}
            unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
            alt={props.post.jobTitle}
            priority
          />
        </ImageData>
        <Content className="content">
          <RightDiv>
            <Header>
              <span className="title">{props.post.jobTitle}</span>
              <div>
                <div className="titleWrapper">
                  <span dir="rtl" className="cTitle">
                    {props.post.company.nameCompany}
                  </span>
                </div>
                <span dir="rtl" className="tTitle">
                  {moment(
                    String(props.post?.releasedAt).length < 11
                      ? props.post?.releasedAt * 1000
                      : props.post?.releasedAt
                  ).fromNow()}
                </span>
              </div>
            </Header>
            <Location>
              <Image
                src={"/icons/Location.svg"}
                alt="location"
                width={12}
                height={12}
              />
              <Where>
                {props.post.areaString
                  ? props.post.areaString.replace("/", "،")
                  : props.post.cityName}
              </Where>
            </Location>
          </RightDiv>
          <LeftDiv>
            <div>
              <Image
                src={"/icons/Heart.svg"}
                alt="favourite"
                width={14}
                height={14}
              />
            </div>
            <div>
              <LabelInfo
                mb={"2px"}
                color="#757575"
                border={"1px solid #757575"}
                width={"100%"}
              >
                {props.post.typeCooperationId?.title}
              </LabelInfo>
              <LabelInfo
                width={"100%"}
                color="#50F36B"
                border={"1px solid #50F36B"}
              >
                {props.post.salaryId?.title}
              </LabelInfo>
            </div>
          </LeftDiv>
        </Content>
      </Main>
    </Card>
  );
}

CardBox.defaultProps = {
  background: "white",
  border: "1px solid rgba(209, 209, 209, 0.4)",
};
