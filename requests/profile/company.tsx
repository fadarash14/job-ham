import { Company, CompanyAds, Response } from "@/types";
import { RequestOptions, mutation } from "../../utils/request";

type ManagerComapanyList = {
  data: Company[];
} & Response;
type SingleCompany = {
  data: Company;
} & Response;
type CompanyList = {
  count: number;
  rows: Company[];
};
export type CompanyListDataOut = { data: CompanyList } & Response;

export const getCompany = async function (
  token: string
): Promise<ManagerComapanyList> {
  return await mutation(
    "getCompany",
    null,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        user_id: true,
        name: true,
        family: true,
        organizationPost: true,
        mobile: true,
        phoneNumber: true,
        nameCompany: true,
        cityId: true,
        areaId: true,
        areaString: true,
        industryId: true,
        establishedYear: true,
        typeActivityCompanyId: true,
        typeOwnerShipId: true,
        sizeCompanyId: true,
        webSiteUrl: true,
        telCompany: true,
        logoId: true,
        description: true,
        descriptionServices: true,
        bannerId: true,
      },
    },
    { token }
  );
};

export const getCompanyList = async function (
  data: {
    skip: number;
    limit: number;
    sort: "Desc" | "Asc";
    nameCompany: string;
    industryId: number;
    cityId: number;
  },
  options?: RequestOptions
): Promise<CompanyListDataOut> {
  return await mutation(
    "getCompanyList",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        count: true,
        rows: {
          id: true,
          user_id: true,
          name: true,
          family: true,
          organizationPost: true,
          mobile: true,
          phoneNumber: true,
          nameCompany: true,
          cityId: true,
          areaId: true,
          areaString: true,
          industryId: true,
          establishedYear: true,
          typeActivityCompanyId: true,
          typeOwnerShipId: true,
          sizeCompanyId: true,
          webSiteUrl: true,
          telCompany: true,
          logoId: true,
          description: true,
        },
      },
    },
    options
  );
};
export const getSingleCompany = async function (
  id: number,
  options?: RequestOptions
): Promise<SingleCompany> {
  return await mutation(
    "getCompanyById",
    { id },
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        name: true,
        family: true,
        organizationPost: true,
        mobile: true,
        phoneNumber: true,
        logoId: true,
        nameCompany: true,
        areaId: true,
        cityId: true,
        industryId: true,
        establishedYear: true,
        typeActivityCompanyId: true,
        typeOwnerShipId: true,
        sizeCompanyId: true,
        webSiteUrl: true,
        telCompany: true,
        description: true,
        descriptionServices: true,
        bannerId: true,
      },
    },
    options
  );
};
export const setBanner = async function (
  picture: string,
  id: number,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "setBannerForCompany",
    { picture, id },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const removeBannerForCompany = async function (
  bannerId: string,
  companyId: number,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "removeBannerForCompany",
    { bannerId, companyId },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const updateCompany = async function (
  data: any,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "updateCompany",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        user_id: true,
        name: true,
        family: true,
        organizationPost: true,
        mobile: true,
        phoneNumber: true,
        nameCompany: true,
        cityId: true,
        areaId: true,
        areaString: true,
        industryId: true,
        establishedYear: true,
        typeActivityCompanyId: true,
        typeOwnerShipId: true,
        sizeCompanyId: true,
        webSiteUrl: true,
        telCompany: true,
        bannerId: true,
        description: true,
        descriptionServices: true,
      },
    },
    { token }
  );
};
