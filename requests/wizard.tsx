import { Response } from "@/types";
import { mutation, query, RequestOptions } from "../utils/request";

type UpdateAdStatus = Response & { status: boolean };

export const registerAdsRequest = async function (data: any) {
  return await mutation("adsUpload", data, {
    errorCode: true,
    errorMessage: true,
    data: {
      company: {
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
      },
      id: true,
      isSigned: true,
      isLoged: true,
      status: true,
      jobId: true,
      jobTitle: true,
      organizationPostId: true,
      typeCooperationId: true,
      sexId: true,
      cityId: true,
      areaId: true,
      areaString: true,
      location: true,
      address: true,
      businessTrips: true,
      workHour: true,
      salaryId: true,
      advantageId: true,
      workDay: true,
      fieldStudyId: true,
      gradeId: true,
      ageMinId: true,
      ageMaxId: true,
      experienceId: true,
      languages: true,
      skills: true,
      jobDescription: true,
      skillDescription: true,
      registerDate: true,
    },
  });
};
export const verifyAdsRequest = async function (data: any) {
  return await mutation("dataVerify", data, {
    errorCode: true,
    errorMessage: true,
    id: true,
    mobile: true,
    payable: true,
    priceId: true,
    token: true,
    company_id:true
  });
};

export const updateAds = async function (data: any, token: string) {
  return await mutation(
    "updateAds",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        isSigned: true,
        isLoged: true,
        status: true,
        jobId: true,
        jobTitle: true,
        organizationPostId: true,
        typeCooperationId: true,
        sexId: true,
        cityId: true,
        areaId: true,
        areaString: true,
        location: true,
        address: true,
        businessTrips: true,
        workHour: true,
        salaryId: true,
        advantageId: true,
        workDay: true,
        fieldStudyId: true,
        gradeId: true,
        ageMinId: true,
        ageMaxId: true,
        experienceId: true,
        languages: true,
        skills: true,
        jobDescription: true,
        skillDescription: true,
        registerDate: true,
      },
    },
    { token }
  );
};
export const updateAdsStatus = async function ({
  adsId,
  statusId,
  token,
}: {
  adsId: number;
  statusId: number;
  token: string;
}): Promise<UpdateAdStatus> {
  return await mutation(
    "updateStatusAds",
    { adsId, statusId },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
