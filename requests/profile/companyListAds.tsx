import { CompanyAds, Response } from "@/types";
import { mutation, query, RequestOptions } from "../../utils/request";

export type AdsDataOut = { data: CompanyAds } & Response;

export const getCompanyAdsList = async function (
  data: { id: number; skip: number; limit: number; sort: "Desc" | "Asc" },
  options?: RequestOptions
): Promise<AdsDataOut> {
  return await mutation(
    "getListAdsCompany",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        count: true,
        rows: {
          id: true,
          jobId: true,
          jobTitle: true,
          status: true,
          registerDate: true,
          cityId: true,
          areaId: true,
          typeCooperationId: true,
          salaryId: true,
        },
        company: {
          nameCompany: true,
          cityId: true,
          areaId: true,
        },
      },
    },
    options
  );
};
