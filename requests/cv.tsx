import { Response, ResumeStatuses } from "@/types";
import { mutation, query, RequestOptions } from "../utils/request";

interface SetCvOut extends Response {
  data: any;
}
type UpdateCvStatus = Response & { status: boolean };

export const setCV = async function (data: any): Promise<SetCvOut> {
  return await mutation("cvUpload", data, {
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
    },
  });
};

export const updateCV = async function (data: any, token: string) {
  return await mutation(
    "updateCv",
    data,
    {
      errorCode: true,
      errorMessage: true,
      data: { id: true, name: true, family: true, areaId: true, cityId: true },
    },
    { token }
  );
};
export const updateSentCvToCompany = async function ({
  id,
  status,
  token,
}: {
  id: number;
  status: string;
  token: string;
}): Promise<UpdateCvStatus> {
  return await mutation(
    "updateSendCvToCompany",
    { id, status },
    {
      errorCode: true,
      errorMessage: true,
      status: true,
    },
    { token }
  );
};
export const verifyCV = async function (data: any) {
  return await mutation("dataVerify", data, {
    errorCode: true,
    errorMessage: true,
    id: true,
    mobile: true,
    payable: true,
    priceId: true,
    token: true,
  });
};
export const getCV = async function (token: string) {
  return await mutation(
    "getCv",
    null,
    {
      errorCode: true,
      errorMessage: true,
      data: {
        id: true,
        user_id: true,
        name: true,
        family: true,
        jobTitle: true,
        pictureId: true,
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
      },
    },
    { token }
  );
};
export const sendCvToCompany = async function (
  cv_id: number,
  company_id: number,
  adv_id: number,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "sendCvToCompany",
    { cv_id, company_id, adv_id },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const setPicture = async function (
  picture: string,
  role: number,
  token: string,
  id?: number
): Promise<Response & { status: boolean }> {
  return await mutation(
    "setPicture",
    role === 1 ? { picture, role, id } : { picture, role },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const setPictureResume = async function (
  picture: string,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "setPictureResume",
    { picture },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const updateCvPicture = async function (
  picture: string,
  role: number,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "updatePicture",
    { picture, role },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const removePicture = async function (
  picture: string,
  role: number,
  id: number,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "removePicture",
    { picture, role, id },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const setFileResume = async function (
  file: string,
  fileName: string,
  token: string
): Promise<Response & { status: boolean }> {
  return await mutation(
    "setFileResume",
    { file, fileName },
    { status: true, errorCode: true, errorMessage: true },
    { token }
  );
};
export const getFileResume = async function (
  token: string
): Promise<{ id: number; filename: string; link: string }> {
  return await mutation(
    "getFileResume",
    null,
    {
      id: true,
      filename: true,
      link: true,
    },

    { token }
  );
};
export const getCvById = async function (id: number, token: string) {
  return await mutation(
    "getCvById",
    { id },
    {
      data: {
        id: true,
        user_id: true,
        name: true,
        family: true,
        jobTitle: true,
        pictureId: true,
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
        areaString: true,
        address: true,
        email: true,
        mobile: true,
        phone: true,
        webSiteUrl: true,
        socialMedias: true,
      },
      errorCode: true,
      errorMessage: true,
    },

    { token }
  );
};
