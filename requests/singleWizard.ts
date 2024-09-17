import { IAdJob, LoadAdsOut, Response } from "@/types";
import { query, RequestOptions } from "../utils/request";

type LoadSingleAdsOut = Response & {
  data: IAdJob[];
  status: boolean;
  page: number;
  perPage: number;
  count: number;
};

export const loadSingleWizard = async function (
  data: { id: number },
  options?: RequestOptions
): Promise<LoadSingleAdsOut> {
  return await query(
    "searchAds",
    data,
    {
      page: true,
      count: true,
      perPage: true,
      errorCode: true,
      errorMessage: true,
      data: true,
      status: true,
    },
    options
  );
};

export const loadRelated = async function (
  data: { text: string; categoryId?: number },
  options?: RequestOptions
) {
  return await query(
    "search",
    data,
    {
      data: {
        id: true,
        name: true,
        badges: true,
        location: {
          cityId: true,
          cityString: true,
          areaString: true,
        },
        releasedAt: true,
        content: true,
        category: {
          categoryString: true,
          categoryId: true,
        },
        filters: {
          id: true,
          is_visibleoncard: true,
          label: true,
          unit: true,
          options: {
            id: true,
            name: true,
          },
        },
        pictures: {
          thumbnail: {
            name: true,
            image: true,
            thumbnail: true,
          },
        },
      },
    },
    options
  );
};
