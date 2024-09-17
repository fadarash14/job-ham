import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import moment from "jalali-moment";
import CvModal from "./CvModal";
import { getCvById } from "@/requests/profile/cvListAds";
import Cookies from "js-cookie";
import { ResultCV, ResumeStatuses } from "@/types";
import { useRouter } from "next/router";
import { useMediaPredicate } from "react-media-hook";
import { updateSentCvToCompany } from "@/requests/cv";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hook";
import { setStatuses } from "@/store/cvForAd";
const Items = styled.div`
  width: 100%;
  height: 50px;
  background: transparent;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  cursor: pointer;
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 800px) {
    height: 55px;
  }
`;
const Icon = styled.div`
  width: 26px;
  height: 26px;
  background-color: #474546;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
`;
const Info = styled.div`
  display: flex;
  font-size: 14px;
  color: #474546;
  align-items: center;
  span {
    min-width: 120px;
  }
  @media (max-width: 800px) {
   id: number, p0: string, token: string, { id, status, token, }: { id: number; status: string; token: string; }ring;
  token: string;
}: center;
    gap: 5px;
  }
`;
const Date = styled.div`
  font-size: 8px;
  color: #a7a3a5;
  display: flex;
  div {
    width: 1px;
    height: 11px;
    background-color: #a7a3a5;
    transform: rotate(20deg);
    margin-left: 8px;
    margin-right: 50px;
  }
  @media (max-width: 800px) {
    div {
      margin-right: 0px;
      display: none;
    }
  }
`;
const Status = styled.div<{ status: string }>`
  font-size: 14px;
  color: ${({ status }) =>
    status === "CANCEL" || status === "REJECT"
      ? "#DB143D"
      : status === "ACCEPT"
      ? "#00C39C"
      : status === "SEND"
      ? "#FBA303"
      : status === "SHOW"
      ? "#14A5DB"
      : ""};
`;
const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  img {
    margin-right: 20px;
    font-size: 12px;
    color: black !important;
    margin-left: 20px;
  }
`;
type Props = {
  name: string;
  family: string;
  date: string;
  status: ResumeStatuses;
  cv_id: number;
  id: number;
  statusInterview: string;
  dateInterview: string;
  timeInterview: string;
  descInterview: string;
  reasonId:number
};
const CvBox = ({
  name,
  family,
  date,
  status,
  cv_id,
  id,
  statusInterview,
  dateInterview,
  timeInterview,
  descInterview,
  reasonId
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [cvData, setCvData] = useState<ResultCV | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useMediaPredicate("(max-width:800px)");
  const queryClient = useQueryClient();
  const renderStatus = (status: ResumeStatuses) => {
    const statusMessages = {
      ACCEPT: <Status status={status}>تایید برای مصاحبه</Status>,
      SEND: <Status status={status}>بررسی نشده</Status>,
      SHOW: <Status status={status}>در انتظار تعیین</Status>,
      CANCEL: <Status status={status}>لغو شده</Status>,
      REJECT: <Status status={status}>رد شده</Status>,
    };
    return statusMessages[status] || null;
  };
  const convertUnixTimestamp = (date: string | null) => {
    const converted =
      date !== null ? moment.from(date, "en").locale("fa").fromNow() : "نامشخص";
    console.log(converted);
    return converted;
  };
  const resumeHandler = async (id: number, cv_id: number) => {
    let token = Cookies.get("token")!;
    const res = await getCvById(cv_id, token);
    if (status === "SEND") {
      const input = { id, status: "SHOW", token };
      const resStatus = await updateSentCvToCompany(input);
      console.log(resStatus);
      queryClient.invalidateQueries({ queryKey: ["getListCvSendForAds"] });
    }
    dispatch(
      setStatuses({
        statusInterview,
        dateInterview,
        descInterview,
        timeInterview,
        reasonId
      })
    );
    setCvData(res.data);
    setShowModal(true);
  };
  return (
    <>
      <Items
        onClick={() => {
          if (!isMobile) {
            resumeHandler(id, cv_id);
          } else {
            router.push({
              pathname: `/resumeList/${cv_id}`,
              query: {
                status,
                ID: id,
              },
            });
            dispatch(
              setStatuses({
                statusInterview,
                dateInterview,
                descInterview,
                timeInterview,
                reasonId
              })
            );
          }
        }}
      >
        <div className="item">
          <Icon>
            <Image
              src={"/icons/Icon ionic-ios-person.png"}
              alt=""
              width={15}
              height={15}
            />
          </Icon>
          <Info>
            {" "}
            <span>
              {name} {family}
            </span>
            <Date>
              <div></div>
              {convertUnixTimestamp(date)}
            </Date>
          </Info>
        </div>
        <StatusWrapper>
          {renderStatus(status)}
          <Image
            src={"/icons/left-arrow-resumelist.svg"}
            alt=""
            width={7}
            height={10}
          />
        </StatusWrapper>
      </Items>
      {showModal && cvData !== null && (
        <CvModal
          id={id}
          cv={cvData}
          status={status}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CvBox;
