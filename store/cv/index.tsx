import {
  BaseInfo,
  Completeness,
  DegreesInfo,
  EducationalInfo,
  JobExperiences,
  LanguagesInfo,
  ResearchesInfo,
  Response,
  SkillsInfo,
} from "@/types";
import cities from "@/dictionaries/cityId.json";
import {
  _Genders,
  _MaritalStatus,
  _MilitaryService,
  _SocialMedia,
} from "@/mock/_cv";
import { convertNumberToMonth, convertToJalaliString } from "@/utils/helper";
import filters from "@/dictionaries/cv-filters.json";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { updateCV } from "@/requests/cv";
import Cookies from "js-cookie";
export interface IState {
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
}

const initialState: IState = {
  baseInfo: {
    id: "",
    user_id: "",
    name: "",
    family: "",
    jobTitle: "",
    sexId: null,
    birthDate: { Day: 0, Month: "", Year: 0 },
    location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
    isMarried: null,
    militaryServiceId: null,
    description: "",
    address: "",
    email: "",
    mobile: "",
    phone: "",
    webSiteUrl: "",
    socialMedias: null,
    pictureId: "",
  },
  jobExperiences: [
    {
      id: 0,
      title: "",
      companyName: "",
      location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
      typeCooperations: null,
      startDate: { Day: 0, Month: "", Year: 0 },
      endDate: { Day: 0, Month: "", Year: 0 },
      stillWorking: false,
      achievements: "",
    },
  ],
  degrees: [
    {
      fieldStudies: null,
      typeOwnerShips: null,
      institutionName: "",
      location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
      educationGrade: null,
      specialization: "",
      gpa: "",
      startDate: { Day: 0, Month: "", Year: 0 },
      endDate: { Day: 0, Month: "", Year: 0 },
      stillLearning: false,
    },
  ],
  languages: [
    {
      id: 0,
      title: "",
      reading: null,
      hearing: null,
      writing: null,
      speaking: null,
      totalLevel: null,
      explain: "",
    },
  ],
  educationCourses: [
    {
      courseName: "",
      instituteName: "",
      startDate: { Day: 0, Month: "", Year: 0 },
      endDate: { Day: 0, Month: "", Year: 0 },
      courseLink: "",
      hasLicence: false,
    },
  ],
  skills: [
    {
      id: 0,
      title: "",
      skillLevel: null,
    },
  ],
  projects: [{ title: "", applicantReference: "", link: "" }],
  level: 1,
  isEdited: false,
  completeness: {
    percentage: 0,
    missed: [],
  },
};

function transformData(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const newObj: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (key === "location") {
      const { city, area, ...rest } = obj[key];
      if (city.id !== -1 && area.id !== -1) {
        newObj.cityId = city.id;
        newObj.areaId = area.id;
        console.log(newObj.areaId);
      }
    } else if (key === "sexId") {
      newObj[key] = obj[key].id;
    } else if (key === "militaryServiceId") {
      newObj[key] = obj[key].id;
    } else if (key === "isMarried") {
      newObj[key] = obj[key].id === 1 ? true : false;
    } else if (key === "id") {
      console.log(obj.id);

      newObj[key] = obj.id ? +obj.id : 0;
    } else {
      newObj[key] = key.includes("birthDate")
        ? convertToJalaliString(obj[key])
        : transformData(obj[key]);
    }
  }
  console.log(newObj);
  return newObj;
}
function FilterFields(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const newObj: any = Array.isArray(obj) ? [] : {};
  console.log(obj);

  for (const key in obj) {
    if (key === "jobExperiences") {
      newObj[key] = obj[key].filter((item: any) => item.title !== "");
    } else if (key === "degrees") {
      newObj[key] = obj[key].filter(
        (item: any) => item.fieldStudies && item.institutionName !== ""
      );
    } else if (key === "languages") {
      newObj[key] = obj[key].filter((item: any) => item.title !== "");
    } else if (key === "educationCourses") {
      newObj[key] = obj[key].filter((item: any) => item.courseName !== "");
    } else if (key === "skills") {
      newObj[key] = obj[key].filter((item: any) => item.title !== "");
    } else if (key === "projects") {
      newObj[key] = obj[key].filter((item: any) => item.title !== "");
    } else {
      newObj[key] = FilterFields(obj[key]);
    }
  }
  console.log(newObj);

  return newObj;
}
export const updateCVInfo = createAsyncThunk(
  "cvInfo/update",
  async (
    section: { data: any; key: keyof IState; token: string },
    thunkAPI
  ) => {
    //@ts-ignore
    const states = thunkAPI.getState()!.cvInfo as IState;
    let data = {};
    if (section.key === "baseInfo") {
      console.log("baseinfo");
      const transfromData = transformData(section.data);
      let newObj = { ...states, [section.key]: transfromData };
      let {
        baseInfo: { pictureId, location, user_id, ...other },
        level,
        completeness,
        isEdited,
        ...othervalues
      } = newObj;
      othervalues = {
        ...othervalues,
        ...other,
      };

      data = FilterFields(othervalues);
      console.log(data);
    } else {
      let newObj = { ...states, [section.key]: section.data };
      let {
        baseInfo: { pictureId, location, user_id, ...other },
        level,
        completeness,
        isEdited,
        ...othervalues
      } = newObj;
      othervalues = {
        ...othervalues,
        ...other,
      };
      const newdata = FilterFields(othervalues);
      data = transformData(newdata);
      console.log(data);
    }

    try {
      const response: Response & { data: any } = await updateCV(
        data,
        section.token
      );
      console.log(response);

      if (!response.errorCode) {
        return { data: section.data, key: section.key };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const CvInformation = createSlice({
  name: "cvInfo",
  initialState,
  reducers: {
    setCompeletness: (
      state,
      action: PayloadAction<{ percentage: number; missed: string[] }>
    ) => {
      state.completeness = action.payload;
    },
    setBaseInfo: (state, action: PayloadAction<BaseInfo>) => {
      state.baseInfo = action.payload;
    },
    setJobExperiences: (state, action: PayloadAction<JobExperiences>) => {
      state.jobExperiences = action.payload;
    },
    setEducationalInfo: (state, action: PayloadAction<EducationalInfo>) => {
      state.educationCourses = action.payload;
    },
    setLanguageInfo: (state, action: PayloadAction<LanguagesInfo>) => {
      state.languages = action.payload;
    },
    setDegreesInfo: (state, action: PayloadAction<DegreesInfo>) => {
      state.degrees = action.payload;
    },
    setSkillsInfo: (state, action: PayloadAction<SkillsInfo>) => {
      state.skills = action.payload;
    },
    setResearchesInfo: (state, action: PayloadAction<ResearchesInfo>) => {
      state.projects = action.payload;
    },
    setMyCv: (state, action: PayloadAction<any>) => {
      let {
        projects,
        skills,
        educationCourses,
        languages,
        degrees,
        jobExperiences,
        ...baseInfo
      } = action.payload;

      const convertOptionTypeValues = (items: any[], filters: any) => {
        items.forEach((item: any) => {
          Object.keys(item).forEach((key) => {
            if (typeof item[key] === "number") {
              if (filters[key]) {
                item[key] = filters[key].find((x: any) => x.id === item[key]);
              } else if (key !== "areaId" && key !== "cityId") {
                item[key] = filters.levels.find((x: any) => x.id === item[key]);
              }
            }
          });
        });
      };
      const processProperty = (
        propertyName: string,
        items: any[],
        cities: any
      ) => {
        const isDateProperty = (
          propertyName: string,
          value?: string | object
        ): boolean => {
          if (value) {
            return (
              propertyName.toLowerCase().includes("date") &&
              typeof value === "string"
            );
          }
          return propertyName.toLowerCase().includes("date");
        };

        const isValidDate = (dateObject: any): boolean => {
          return dateObject !== "undefined";
        };

        items.forEach((item: any) => {
          Object.keys(item).forEach((key) => {
            if (isDateProperty(key, item[key])) {
              if (isValidDate(item[key])) {
                const Day = parseInt(item[key].substr(6, 2));
                const Month = convertNumberToMonth[item[key].substr(4, 2)];
                const Year = parseInt(item[key].substr(0, 4));
                item[key] = { Day, Month, Year };
              } else {
                item[key] = { Day: 0, Month: "", Year: 0 };
              }
            } else if (key === "cityId" || key === "areaId") {
              const cityId = item.cityId.toString();
              const areaId = item.areaId.toString();

              const cityIndex = Object.keys(cities).find((x) => x === cityId);

              if (cityIndex !== undefined) {
                const cityInfo = cities[cityIndex];
                const areaInfo = cityInfo.areas[areaId];

                const area = {
                  name: areaInfo ? areaInfo.name : "",
                  id: areaInfo ? areaInfo.id : -1,
                };

                item.location = {
                  area,
                  city: {
                    name: cityInfo.name,
                    id: cityInfo.id,
                  },
                };
              } else {
                item.location = {
                  area: { name: "", id: -1 },
                  city: { name: "", id: -1 },
                };
              }
            }
          });
        });
        convertOptionTypeValues(items, filters);
      };
      processProperty("jobExperiences", jobExperiences, cities);
      processProperty("educationCourses", educationCourses, cities);
      processProperty("languages", languages, cities);
      processProperty("degrees", degrees, cities);
      convertOptionTypeValues(skills, filters);
      if (baseInfo.pictureId === null) {
        baseInfo.pictureId = "";
      }

      baseInfo.mobile = "0" + baseInfo.mobile;
      baseInfo.sexId = filters.sex.find((x) => x.id === baseInfo.sexId);
      baseInfo.militaryServiceId = filters.militaryServices.find(
        (x) => x.id === baseInfo.militaryServiceId
      );
      baseInfo.isMarried = baseInfo.isMarried
        ? _MaritalStatus[1]
        : _MaritalStatus[0];
      const cityIndex = Object.keys(cities).find(
        (x) => x === baseInfo.cityId.toString()
      )!;
      let area = {};
      //@ts-ignore
      if (Object.keys(cities[cityIndex].areas).length === 0) {
        area = { name: "تمام محله ها", id: 0 };
      } else {
        area = {
          //@ts-ignore
          name: cities[cityIndex].areas[baseInfo.areaId.toString()].name,
          id: baseInfo.areaId,
        };
      }
      baseInfo.location = {
        area: area,
        //@ts-ignore
        city: { name: cities[cityIndex].name, id: cities[cityIndex].id },
      };
      const Day = parseInt(baseInfo.birthDate.substr(6, 2));
      const Month = convertNumberToMonth[baseInfo.birthDate.substr(4, 2)];
      const Year = parseInt(baseInfo.birthDate.substr(0, 4));
      //@ts-ignore
      baseInfo.birthDate = { Day, Month, Year };
      const excludedProperties = ["level", "completeness", "isEdited"]; // Properties to exclude from comparison

      const totalProperties =
        Object.keys(initialState).length - excludedProperties.length;
      let matchingProperties = 0;

      for (const key in initialState) {
        if (
          !excludedProperties.includes(key) &&
          isEqual(initialState[key as keyof IState], action.payload[key])
        ) {
          state.completeness.missed.push(key);
          matchingProperties++;
        }
      }

      const matchingPercentage = (
        100 -
        (matchingProperties / totalProperties) * 100
      )
        .toString()
        .slice(0, 3);
      state.completeness.percentage = parseInt(matchingPercentage);
      state.projects = projects;
      state.skills = skills;
      state.educationCourses = educationCourses;
      state.languages = languages;
      state.degrees = degrees;
      state.jobExperiences = jobExperiences;
      state.baseInfo = baseInfo;
    },

    setYear: (state, action: PayloadAction<number>) => {
      state.baseInfo.birthDate.Year = action.payload;
    },
    setMonth: (state, action: PayloadAction<string>) => {
      state.baseInfo.birthDate.Month = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.baseInfo.birthDate.Day = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setEdited: (state, action: PayloadAction<boolean>) => {
      state.isEdited = action.payload;
    },
    setPicture: (state, action: PayloadAction<string>) => {
      state.baseInfo.pictureId = action.payload;
    },
    clearCv: (state) => {
      state.baseInfo = {
        id: "",
        user_id: "",
        name: "",
        family: "",
        jobTitle: "",
        sexId: null,
        birthDate: { Day: 0, Month: "", Year: 0 },
        location: { area: { name: "", id: -1 }, city: { name: "", id: -1 } },
        isMarried: null,
        militaryServiceId: null,
        description: "",
        address: "",
        email: "",
        mobile: "",
        phone: "",
        webSiteUrl: "",
        socialMedias: null,
        pictureId: "",
      };
      state.jobExperiences = [
        {
          id: 0,
          title: "",
          companyName: "",
          location: {
            area: { name: "", id: -1 },
            city: { name: "", id: -1 },
          },
          typeCooperations: null,
          startDate: { Day: 0, Month: "", Year: 0 },
          endDate: { Day: 0, Month: "", Year: 0 },
          stillWorking: false,
          achievements: "",
        },
      ];
      state.educationCourses = [
        {
          courseName: "",
          instituteName: "",
          startDate: { Day: 0, Month: "", Year: 0 },
          endDate: { Day: 0, Month: "", Year: 0 },
          courseLink: "",
          hasLicence: false,
        },
      ];
      state.languages = [
        {
          id: 0,
          title: "",
          reading: null,
          hearing: null,
          writing: null,
          speaking: null,
          totalLevel: null,
          explain: "",
        },
      ];
      state.degrees = [
        {
          fieldStudies: null,
          typeOwnerShips: null,
          institutionName: "",
          location: {
            area: { name: "", id: -1 },
            city: { name: "", id: -1 },
          },
          educationGrade: null,
          specialization: "",
          gpa: "",
          startDate: { Day: 0, Month: "", Year: 0 },
          endDate: { Day: 0, Month: "", Year: 0 },
          stillLearning: false,
        },
      ];
      state.skills = [
        {
          id: 0,
          title: "",
          skillLevel: null,
        },
      ];
      state.projects = [{ title: "", applicantReference: "", link: "" }];
      state.level = 1;
      state.isEdited = false;
      state.completeness = {
        percentage: 0,
        missed: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCVInfo.fulfilled, (state, action) => {
      const key = action.payload!.key;
      const newStates = action.payload!.data;
      const uniqueMissed = state.completeness.missed.filter(
        (item: any, index: number, array: any[]) =>
          array.indexOf(item) === index && item !== key
      );

      const matchingPercentage = ((1 - uniqueMissed.length / 7) * 100).toFixed(
        2
      );
      const newCompleteness = {
        missed: uniqueMissed,
        percentage: +matchingPercentage,
      };
      //@ts-ignore
      state[key] = newStates;
      state.completeness = newCompleteness;
    });

    builder.addCase(updateCVInfo.rejected, (state, action) => {
      console.error("CV update failed:", action.error);
      // You can set error state or handle the error in UI
    });
  },
});
export const {
  setYear,
  setMonth,
  setDay,
  setLevel,
  setBaseInfo,
  setJobExperiences,
  setEducationalInfo,
  setLanguageInfo,
  setDegreesInfo,
  setSkillsInfo,
  setResearchesInfo,
  setPicture,
  setMyCv,
  clearCv,
  setEdited,
  setCompeletness,
} = CvInformation.actions;

export default CvInformation.reducer;
