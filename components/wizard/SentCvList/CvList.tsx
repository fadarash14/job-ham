import { Company, ResumeStatuses, SentResume } from "@/types";
import Col from "@/components/utility/Col";
import CompanyAdCard from "@/components/wizard/CompanyAds/CompanyAdCard";
import React, { useState } from "react";
import CVListCard from "./CvCard";

type Props = {
  data: {
    count: number;
    data: SentResume[];
    role: number;
  };
  filter?: number;
};

export default function CvList({ data, filter }: Props) {
  const [postModal, setPostModal] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const validateState = (status: ResumeStatuses) => {
    let adState = {
      color: "",
      background: "",
      name: "",
      path: "",
    };
    switch (status) {
      case "ACCEPT":
        adState = {
          color: "#000000",
          background: "#00C39C",
          name: "تایید شده",
          path: "",
        };
        break;
      case "SEND":
        adState = {
          color: "#000000",
          background: "#FDCB66",
          name: "ارسال شده",
          path: "",
        };
        break;
      case "SHOW":
        adState = {
          color: "#000000",
          background: "#30BFF3",
          name: "دیده شده",
          path: "",
        };
        break;
      case "CANCEL":
        adState = {
          color: "#000000",
          background: "#D1D1D1",
          name: "انصراف داده شده",
          path: "",
        };
        break;
      case "REJECT":
        adState = {
          color: "#FFFFFF",
          background: "#DB143D",
          name: "رد شده",
          path: "",
        };
        break;
      default:
        break;
    }
    return adState;
  };
  const manageOnClick = (Id: string) => {};
  const convertFiterToStatus = (filter: string) => {
    const statuses: { [key: string]: number } = {
      SEND: 50,
      ACCEPT: 1,
      SHOW: 20,
      REJECT: 33,
    };
    return statuses[filter];
  };

  return (
    <>
      {data.data
        .filter((x) => {
          if (filter || filter !== 0) {
            return convertFiterToStatus(x.status) === filter;
          } else {
            return x;
          }
        })
        .map((post, index) => {
          const specifications = validateState(post.status);
          return (
            <Col
              px={"8px"}
              pb={"8px"}
              maxWidth={["100%", "100%", "100%", "100%", "100%"]}
              flexBasis={["100%", "100%", "100%", "100%", "100%"]}
              key={index}
            >
              <CVListCard
                {...specifications}
                setShowModal={setPostModal}
                showModal={postModal}
                post={post}
                company={post.company}
                handleOnclick={() => manageOnClick(post.id)}
              />
            </Col>
          );
        })}
    </>
  );
}
