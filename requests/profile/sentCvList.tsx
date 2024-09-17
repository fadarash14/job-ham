import { CompanyAds, Response, SentResume } from "@/types";
import { mutation, query, RequestOptions } from "../../utils/request";

export type CvListDataOut = {
  data: { count: number; rows: SentResume[] };
} & Response;
interface IgetSentSvIds extends Response {
  data: {
    rows: { adv: { id: string } }[];
  } | null;
}

export const getListCvSendToCompany = async function (
  data: { skip: number; limit: number; sort: "Desc" | "Asc" },
  options?: RequestOptions
): Promise<CvListDataOut> {
  return await mutation(
    "getListCvSendToCompany",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        count: true,
        rows: {
          id: true,
          cv_id: true,
          adv_id: true,
          status: true,
          reasonForReject: true,
          modifiedAt: true,
          confirmedAt: true,
          company: {
            id: true,
            cityId: true,
            areaId: true,
            nameCompany: true,
          },
          adv: {
            id: true,
            jobTitle: true,
          },
        },
      },
    },
    options
  );
};
export const getSentSvIds = async function (
  data: { skip: number; limit: number; sort: "Desc" | "Asc" },
  options?: RequestOptions
): Promise<IgetSentSvIds> {
  return await mutation(
    "getListCvSendToCompany",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        count: true,
        rows: {
          adv: {
            id: true,
          },
        },
      },
    },
    options
  );
};
