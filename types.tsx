import React, { Dispatch } from "react";
import { search_not_found } from "./utils/searchConfig";
export type Category = {
  id: number;
  name: string;
  title: string;
  slug: string;
  prefix: string;
  filters: any[];
  subs: Category[];
  address: string;
};

export type SelectedCategory = {
  id: number;
  title: string;
  parent_id: number;
  status: number;
  metakeyword: string | null;
  icon: string | null;
  slug: string;
  address: string | null;
  layer: number;
  ordernumber: number;
  metadescription: string | null;
  name: string;
  has_child: boolean;
};

export type SideBarContextProps = {
  modalCityIsOpen: boolean;
  openModalCity: Dispatch<boolean>;
  sideBarIsOpen: boolean;
  openSideBar: Dispatch<boolean>;
  currentFilters: string[];
  setCurrentFilters: Dispatch<string[]>;
  openFilter: number;
  setOpenFilter: Dispatch<number>;
};

export type Filter = {
  id: string;
  value: string;
  name: string;
  key: string;
  filter_id: number;
  is_required: boolean;
  ordernumber: number;
  label: string;
  valueLabel: string;
  unit: string;
  description: string;
  placeholder: string;
  options: { title: string; id: number; value: number }[];
  filters: {
    code: number;
    label: string;
    name: string;
    value: number;
    valueLabel: string;
  };
  is_visibleoncard: boolean;
  is_header: boolean;
  validation: {
    max: number;
    min: number;
    maxlength: number;
    minlength: number;
  };
  type: string;
  help?: string;
};
export type SimpleFilter = {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  filter_id: string;
  options: { title: string; id: number; value: number }[];
  key: string;
  help: string;
  ordernumber: number;
  is_required: boolean;
  validation: {
    max: number;
    min: number;
    maxlength: number;
    minlength: number;
  };
  unit: string;
};
export type Clicked = {
  [x: number]: { id: number; price: number };
};

export type Post = {
  errorCode?: number;
  code: string;
  id: number;
  name: string;
  content: string;
  badges: string[] | null;
  categoryId?: number | null;
  open_invoice: boolean;
  price: number;
  ads_view_count: number;
  contact_view_count: number;
  category: {
    categoryId: number;
    groupString: string;
    categoryString: string;
    groupId: number;
  };
  rejectreasons_id: number;
  registerDate: number;
  releasedAt: any;
  confirmDate: number;
  filters: Filter[];
  cityString?: string;
  status: number;
  expireDate?: number;
  payment: number;
  contact: {
    mobileShow: boolean;
  };
  location: {
    cityId: number;
    areaId: number;
    cityString: string;
    areaString: string;
  };
  pictures: {
    thumbnail: {
      thumbnail: string;
    }[];
    all: { image: string; thumbnail: string }[];
  }[];
  adverties: [
    {
      transactionnumber: number;
      is_pay: boolean;
      id: number;
      finalprice: number;
      registerdate: number;
      rows: [
        {
          description: string;
          vas_id: number;
          price_id: number;
          price: number;
        }
      ];
    }
  ];
};
export type Feature = {
  id: number;
  header: string;
  desc: string;
};

export type SearchItemSingle = {
  keywords: string;
  weight: number;
  categoryId: number;
  categoryName: string;
};
export type SearchItemType = {
  item: SearchSuggestItem;
  onDelete?: Function;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  onSelect?: Function;
  onPin?: Function;
  mobile: boolean;
  pinned?: boolean;
};

export type PinnedSearch = {
  id: number;
  categoryId: number;
  label: string;
};

export type Item = {
  name: string;
  id: number;
};

export interface SelectedCities {
  [ostan: string]: { [city: string]: Array<string> };
}

export type UrlTypes = {
  city_area: SelectedCities;
  category: Category;
  hasPicture: boolean;
  instant: boolean;
  newspaper: boolean;
  graphical: boolean;
  [search_not_found]: boolean;
} & {
  [key: string]: string;
};

export type User = {
  errorCode: number;
  errorMessage: string;
  id: number;
  name: string;
  lastname: string;
  mobile: string;
  telephone: string;
  email: string;
  token: string;
  roles: any;
  isLogged: boolean;
  errors: [
    {
      message: string;
    }
  ];
};
export type SignUpResult = {
  page: string;
  status: boolean;
  errors: [
    {
      message: string;
    }
  ];
};
export type AuthResult = {
  status: boolean;
  errorCode: number;
};
export type ChangePassResult = {
  status: boolean;
  userId: number;
};

export type Status = {
  id: number;
  name: string;
  color: string;
  background: string;
  path: string;
  state: boolean;
};

export type MyAds = {
  id: number;
  isSigned: boolean;
  status: number;
  rejectreasons_id: number | null;
  rejectdescription: number | null;
  name: string;
  content: string;
  description: string;
  payment: number;
  categoryId: number;
  cityId: number;
  areaId: number;
  cityString: string;
  areaString: string;
  filters: Filter[];
  contact: {
    email: string;
    mobile: string;
    telephone: string;
    email_show: boolean;
    mobile_show: boolean;
    telephone_show: boolean;
  };
  clear: boolean;
  pictures: {
    name: string;
    thumbnail: {
      thumbnail: string;
    };
    all: { image: string; thumbnail: string }[];
  }[];
  open_invoice: number | null;
  badges: string[];
  registerDate: number;
  modifyDate: number;
  confirmDate: number;
  expireDate: number;
  search_view_count: number;
  ads_view_count: number;
  contact_view_count: number;
  suggest_view_count: number;
};

export type City = {
  id: number;
  parent_id: number;
  ostan: string;
  slug: string;
  name: string;
  lat: number;
  long: number;
  areas: { name: string; id: number }[];
  cities: { [key: string]: City };
};

export type Toggle = {
  toggle: boolean;
};
export type AddressType = {
  name: string;
  path: string;
};
export type JOb = {
  id: number;
  title: string;
  parentId: number;
};
export type Option = { title: string; id: string | number } | null;
export type CvProps = {
  BasicInfo?: {
    sex: Option[];
    militaryServices: Option[];
  };
  JobsRecords?: {
    typeCooperations: Option[];
  };
  EducationalInfo?: {
    levels: Option[];
    fieldStudies: Option[];
    typeOwnerShips: Option[];
    educationGrade: Option[];
  };
  LanguagesInfo?: {
    levels: Option[];
    languages: Option[];
  };
  SkillsInfo?: {
    levels: Option[];
  };
};
export type CustomDate = {
  Day: number;
  Month: string;
  Year: number;
};
export type PartlyDate = {
  Day?: number;
  Month: string;
  Year: number;
};
export type BaseInfo = {
  id: string;
  user_id: string;
  name: string;
  family: string;
  jobTitle: string;
  sexId: Option;
  birthDate: CustomDate;
  isMarried: Option;
  militaryServiceId: Option;
  description?: string;
  address?: string;
  email?: string;
  mobile: string;
  phone: string;
  webSiteUrl: string;
  socialMedias?: Option;
  location: Location;
  pictureId?: string;
};
export type Location = {
  area?: { name: string; id: number };
  city?: { name: string; id: number };
};
export type JobExperience = {
  cityId?: number;
  areaId?: number;
  id: number;
  title: string;
  companyName: string;
  location: Location;
  typeCooperations: Option;
  startDate: PartlyDate;
  endDate: PartlyDate;
  stillWorking: boolean;
  achievements: string;
};
export type JobExperiences = JobExperience[];
export type EducationalInfo = {
  courseName: string;
  instituteName: string;
  startDate: PartlyDate;
  endDate: PartlyDate;
  courseLink: string;
  hasLicence: boolean;
}[];
export type Language = {
  id: number;
  title: string;
  reading: Option;
  hearing: Option;
  writing: Option;
  speaking: Option;
  totalLevel: Option;
  explain: string;
};
export type LanguagesInfo = Language[];
export type DegreesInfo = {
  areaId?: number;
  cityId?: number;
  fieldStudies: Option;
  typeOwnerShips: Option;
  institutionName: String;
  location: Location;
  educationGrade: Option;
  specialization: string;
  gpa: string;
  startDate: PartlyDate;
  endDate: PartlyDate;
  stillLearning: boolean;
}[];
export type Skill = {
  id: number;
  title: string;
  skillLevel: Option;
};
export type SkillsInfo = Skill[];
export type ResearchesInfo = {
  title: string;
  applicantReference: string;
  link: string;
}[];
export type Completeness = {
  percentage: number;
  missed: string[];
};
export type AllCvData = {
  baseInfo: BaseInfo;
  jobExperiences: JobExperiences;
  educationCourses: EducationalInfo;
  languages: LanguagesInfo;
  level: number;
  degrees: DegreesInfo;
  skills: SkillsInfo;
  projects: ResearchesInfo;
  completeness: Completeness;
  isEdited: boolean;
};

export type ResultCV = {
  id: string;
  user_id: string;
  name: string;
  family: string;
  jobTitle: string;
  pictureId: string;
  sexId: number;
  birthDate: string;
  isMarried: boolean;
  militaryServiceId: number;
  description: string;
  projects: ResearchesInfo;
  skills: SkillsInfo;
  educationCourses: EducationalInfo;
  languages: LanguagesInfo;
  degrees: DegreesInfo;
  jobExperiences: JobExperiences;
  cityId: number;
  areaId: number;
  address: string;
  email: string;
  mobile: string;
  phone: string;
  webSiteUrl: string;
  socialMedias: any[];
  areaString?: string;
};
export type ModifiedResultCV = Omit<ResultCV, "sexId"> & {
  sexId: { id: number; title: string };
};

export type Response = {
  errorMessage: string;
  errorCode: number;
};
export type Ads = {
  id: string;
  isSigned: boolean;
  isLoged: boolean;
  status: number;
  jobId: number;
  jobTitle: string;
  organizationPostId: number;
  typeCooperationId: number;
  sexId: number;
  cityId: number;
  areaId: number;
  areaString: string;
  location: string;
  address: string;
  businessTrips: string;
  workHour: string;
  salaryId: number;
  advantageIds: any[];
  workDay: string;
  fieldStudyId: number;
  gradeId: number;
  ageMinId: number;
  ageMaxId: number;
  experienceId: number;
  languages: any[];
  skills: any[];
  jobDescription: string;
  skillDescription: string;
  registerDate: number;
};
export type Company = {
  id: string;
  user_id: string;
  name: string;
  family: string;
  organizationPost: string;
  mobile: string;
  phoneNumber: string;
  nameCompany: string;
  cityId: number;
  areaId: number;
  areaString?: string;
  industryId: number;
  establishedYear: string;
  typeActivityCompanyId: number;
  typeOwnerShipId: number;
  sizeCompanyId: number;
  webSiteUrl: string;
  telCompany: string;
  logoId?: string;
  bannerId: string;
  description: string;
  descriptionServices: string;
};

export type CompanyAds = {
  count: number;
  rows: Ads[];
  company: Company;
};
export type CompanyAdCvs = {
  count: number;
  rows: AdCvs[];
};
export type AdCvs = {
  id: number;
  cv_id: number;
  adv_id: number;
  company_id: number;
  user_id: number;
  status: ResumeStatuses;
  reasonForReject: number;
  modifiedAt: string;
  confirmedAt: string;
  company: Company;
  adv: Ads;
  cv: ResultCV;
};
export enum ResumeStatuses {
  SEND = "SEND",
  SHOW = "SHOW",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  CANCEL = "CANCEL",
}
export enum AdStatuses {
  SEND = 50,
  ARCHIVE = 73,
  ACCEPT = 1,
  DELETE = 5,
  CANCEL = 72,
  REJECT = 51,
}
export enum OperationTypes {
  EDIT = "edit",
  DELETE = "delete",
  SIMILAR = "similar",
  REJECTREASON = "rejectReason",
  RESEND = "resend",
  WATCH = "watch",
  ARCHIVE = "archive",
}

export type SentResume = {
  id: string;
  cv_id: number;
  adv_id: number;
  company_id: number;
  user_id: number;
  status: ResumeStatuses;
  reasonForReject: string;
  modifiedAt: string;
  confirmedAt: string;
  company: Company;
  adv: Ads;
};
export interface IJobInfo {
  id: number;
  parent_id: number;
  title: string;
  name: string;
  metadescription: string;
  help: string;
  ordernumber: number;
  fromdate: number;
  todate: number;
  status: number;
  icon: string;
  layer: number;
  address: string;
  address_ids: string;
  metakeyword: string;
  slug: string;
  has_child: boolean;
}
export interface IAdJob {
  id: string;
  jobId: IJobInfo;
  jobTitle: string;
  organizationPostId: Option;
  typeCooperationId: Option;
  sexId: Option;
  cityId: number;
  location: string;
  address: string;
  businessTrips: string;
  salaryId: Option;
  advantageIds: Option[];
  ageMinId: Option;
  ageMaxId: Option;
  workDay: string;
  fieldStudyId: Option;
  gradeId: Option;
  experienceId: Option;
  languages: any[];
  skills: {
    id: number;
    title: string;
    jobId: number;
  }[];
  jobDescription: string;
  skillDescription: string;
  company: Company;
  cityName: string;
  areaId: {
    id: number;
    lat: number;
    long: number;
    name: string;
    address: string;
  };
  bannerId: string | null;
  logoId: string | null;
  areaString: string;
  modifiedAt: number;
  submitedAt: number;
  releasedAt: number;
}
export interface IEditJob {
  id: string;
  jobId: IJobInfo;
  jobTitle: string;
  organizationPostId: Option;
  typeCooperationId: Option;
  sexId: Option;
  cityId: number;
  location: string;
  address: string;
  businessTrips: string;
  salaryId: Option;
  advantageIds: Option[];
  ageMinId: Option;
  ageMaxId: Option;
  workDay: string;
  fieldStudyId: Option;
  gradeId: Option;
  experienceId: Option;
  languages: any[];
  skills: {
    id: number;
    label: string;
    levelId: number;
  }[];
  jobDescription: string;
  skillDescription: string;
  company: Company;
  cityName: string;
  areaId: {
    id: number;
    lat: number;
    long: number;
    name: string;
    address: string;
  };
  areaString: string;
  modifiedAt: number;
  submitedAt: number;
  releasedAt: number;
}

export type LoadAdsOut = {
  data: IAdJob[];
  page: number;
  perPage: number;
  errorMessage: string;
  errorCode: number;
  count: number;
};
export enum QueryKeys {
  Skip = "skip",
  Limit = "limit",
  Sort = "sort",
  Text = "text",
  JobId = "jobId",
  CityIds = "cityIds",
  OrganizationPostIds = "organizationPostIds",
  TypeCooperationIds = "typeCooperationIds",
  ExperienceId = "experienceId",
  SalaryId = "salaryId",
  AdvantageIds = "advantageIds",
}
export enum ResumeBankKeys {
  Text = "text",
  CityId = "cityId",
  Name = "name",
  Family = "family",
  JobTitle = "jobTitle",
  SexIds = "sexIds",
  MilitaryServiceIds = "militaryServiceIds",
  SkillIds = "skillIds",
  EducationCourseIds = "educationCourseIds",
  LanguageIds = "languageIds",
  DegreeIds = "degreeIds",
  FromBirthDate = "fromBirthDate",
  ToBirthDate = "toBirthDate",
  JobExperienceIds = "jobExperienceIds",
  SalaryId = "salaryId",
  WithoutExperience = "withoutExperience",
  Skip = "skip",
  Limit = "limit",
  Sort = "sort",
}
type PrimitiveTypes = string | number | null;
type NumberArray = number[];

export type QueryParameters = {
  [key in QueryKeys]: key extends
    | "skip"
    | "limit"
    | "sort"
    | "text"
    | "jobId"
    | "salaryId"
    | "experienceId"
    ? PrimitiveTypes
    : NumberArray;
};

export type SearchSuggestItem = {
  id: string;
  title: string;
  jobId: number;
  jobTitle: string;
};
