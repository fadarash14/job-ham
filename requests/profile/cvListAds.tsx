import { CompanyAdCvs, Response, ResultCV } from "@/types";
import { mutation } from "../../utils/request";

export type AdsDataOut = { data: CompanyAdCvs } & Response;
export type CvDataOut = { data: ResultCV } & Response;
export type RejectDataOut = { status: boolean } & Response;
export const getListCvSendForAds = async function (
  data: { skip: number; limit: number; sort: "Desc" | "Asc"; adsId: number },
  token: string
): Promise<AdsDataOut> {
  return await mutation(
    "getListCvSendForAds",
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
          company_id: true,
          user_id: true,
          status: true,
          reasonForReject: true,
          modifiedAt: true,
          confirmedAt: true,
          statusInterview:true,
          dateInterview:true,
          timeInterview:true,
          descInterview:true,
          cv: {
            name: true,
            family: true,
          },
        },
      },
    },
    { token }
  );
};
export const getCvById = async function (
  id: number,
  token: string
): Promise<CvDataOut> {
  return await mutation(
    "getCvById",
    { id },
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        user_id: true,
        name: true,
        family: true,
        jobTitle: true,
        sexId: true,
        birthDate: true,
        isMarried: true,
        militaryServiceId: true,
        description: true,
        projects: true,
        skills: true,
        educationCourses: true,
        languages: true,
        degrees: true,
        jobExperiences: true,
        cityId: true,
        areaId: true,
        address: true,
        email: true,
        mobile: true,
        phone: true,
        webSiteUrl: true,
        socialMedias: true,
        pictureId: true,
      },
    },
    { token }
  );
};
export const setReject = async function (
  companyCvId: number,
  reasonForReject: number,
  token: string
): Promise<RejectDataOut> {
  return await mutation(
    "setReject",
    { companyCvId, reasonForReject },
    {
      status: true,
      errorCode: true,
      errorMessage: true,
    },
    {
      token,
    }
  );
};
export const setAcceptInterview = async function (
  companyCvId: number,
  statusInterview: string|null,
  dateInterview: string|null,
  timeInterview: string|null,
  descInterview: string|null,
  token: string
): Promise<RejectDataOut> {
  return await mutation(
    "setInterview",
    {
      companyCvId,
      statusInterview,
      dateInterview,
      timeInterview,
      descInterview,
    },
    {
      status: true,
      errorCode: true,
      errorMessage: true,
    },
    {
      token,
    }
  );
};
