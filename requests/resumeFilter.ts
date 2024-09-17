import { mutation } from "@/utils/request";

export const searchCVRequest = async function (
  input: SearchCVInput,
  token: string
) {
  return await mutation(
    "searchCv",
    input,
    {
      errorCode: true,
      errorMessage: true,
      status: true,
      count: true,
      perPage: true,
      page: true,
      data: true,
    },
    { token }
  );
};
export const searchCVSuggest = async function (
  input: SearchCVSuggest,
  token: string
) {
  return await mutation(
    "searchCvSuggest",
    input,
    {
      errorCode: true,
      errorMessage: true,
      status: true,
      count: true,
      perPage: true,
      page: true,
      data: true,
    },
    { token }
  );
};
export type SearchCVSuggest = {
  skip: number;
  limit: number;
  sort: string;
  text: string;
};

export type SearchCVInput = {
  text: string;
  cityId?: number;
  name?: string;
  family?: string;
  jobTitle?: string;
  sexIds?: number[];
  militaryServiceIds?: number[];
  skillIds?: number[];
  jobExperienceIds?: number[];
  educationCourseIds?: number[];
  languageIds?: number[];
  degreeIds?: number[];
  fromBirthDate?: string;
  toBirthDate?: string;
  salaryIds?: number;
  skip: number;
  limit: number;
  sort: string;
};
