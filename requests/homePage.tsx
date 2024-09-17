import { LoadAdsOut, QueryKeys, QueryParameters } from "@/types";
import { query, RequestOptions } from "../utils/request";
import { ParsedUrlQuery } from "querystring";

export async function fetchJobAdsData(
  queryParams: QueryParameters
): Promise<LoadAdsOut> {
  try {
    const response = await loadAdvertises(queryParams);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: [],
      page: 0,
      count: 0,
      perPage: 0,
      errorMessage: "An error occurred",
      errorCode: 1,
    };
  }
}
export function parseQueryParameters(query: ParsedUrlQuery): QueryParameters {
  const queryParameters: QueryKeys[] = [
    QueryKeys.Skip,
    QueryKeys.Limit,
    QueryKeys.Sort,
    QueryKeys.Text,
    QueryKeys.JobId,
    QueryKeys.CityIds,
    QueryKeys.OrganizationPostIds,
    QueryKeys.TypeCooperationIds,
    QueryKeys.ExperienceId,
    QueryKeys.SalaryId,
    QueryKeys.AdvantageIds,
  ];
  const params: QueryParameters = {
    skip: 0,
    limit: 24,
    sort: "Desc",
    text: "",
    jobId: 0,
    cityIds: [],
    organizationPostIds: [],
    typeCooperationIds: [],
    experienceId: 0,
    salaryId: 0,
    advantageIds: [],
  };
  for (const param of queryParameters) {
    if (query[param]) {
      if (param !== "sort" && param !== "text") {
        if (Array.isArray(params[param]) && query[param]) {
          const oldParams = params[param];
          //@ts-ignore
          const newParam = parseInt(query[param]);
          //@ts-ignore
          params[param] = [...oldParams, newParam];
        } else {
          //@ts-ignore
          params[param] = parseInt(query[param]);
        }
      } else {
        //@ts-ignore
        params[param] = query[param];
      }
    }
  }
  return params;
}
export const loadAdvertises = async function (
  data?: any,
  options?: RequestOptions
): Promise<LoadAdsOut> {
  return await query(
    "search",
    data,
    {
      page: true,
      count: true,
      perPage: true,
      errorCode: true,
      errorMessage: true,
      data: true,
    },
    options
  );
};
