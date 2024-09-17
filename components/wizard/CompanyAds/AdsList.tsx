import { Ads, Company } from "@/types";
import Col from "@/components/utility/Col";
import CompanyAdCard from "@/components/wizard/CompanyAds/CompanyAdCard";
import React, { useState } from "react";

type Props = {
  data: {
    count: number;
    data: Ads[];
    company: Company;
    role: number;
  };
  filter?: number;
};

export default function AdsList({ data, filter }: Props) {
  const [postModal, setPostModal] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const validateState = (id: number) => {
    let adState = {
      color: "",
      background: "",
      name: "",
      path: "",
    };
    switch (id) {
      case 1:
        adState = {
          color: "#000000",
          background: "#00C39C",
          name: "تایید شده و فعال",
          path: "",
        };
        break;
      case 50:
      case 52:
      case 57:
      case 55:
      case 1:
        adState = {
          color: "#000000",
          background: "#FDCB66",
          name: "ارسال شده",
          path: "",
        };
        break;
      case 56:
      case 54:
      case 51:
      case 33:
        adState = {
          color: "#FFFFFF",
          background: "#DB143D",
          name: "رد شده",
          path: "",
        };
        break;
      case 71:
        adState = {
          color: "#000000",
          background: "#D1D1D1",
          name: "انصراف داده شده",
          path: "",
        };
        break;
      case 5:
        adState = {
          color: "#000000",
          background: "#707070",
          name: "حذف شده",
          path: "",
        };
        break;

      default:
        break;
    }
    return adState;
  };
  const manageOnClick = (Id: string) => {};

  return (
    <>
      {data.data
        .filter((x) => {
          if (filter || filter !== 0) {
            return x.status === filter;
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
              <CompanyAdCard
                {...specifications}
                setShowModal={setPostModal}
                showModal={postModal}
                post={post}
                company={data.company}
                handleOnclick={() => manageOnClick(post.id)}
              />
            </Col>
          );
        })}
    </>
  );
}
