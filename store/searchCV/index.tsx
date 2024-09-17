import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

interface IState {
  queries: {
    skip: number;
    limit: number;
    sort: "Desc" | "Asc";
    text: string;
    cityId: number;
    name: string;
    family: string;
    jobTitle: string;
    sexId: number;
    militaryServiceId: number;
    skillId: number[];
    educationCourseId: number;
    languageId: number[];
    degreeId: number;
    fromBirthDate: string;
    toBirthDate: string;
  };
}

const initialState: IState = {
  queries: {
    skip: 0,
    limit: 10,
    sort: "Desc",
    text: "",
    cityId: 0,
    name: "",
    family: "",
    jobTitle: "",
    sexId: 0,
    militaryServiceId: 0,
    skillId: [],
    educationCourseId: 0,
    languageId: [],
    degreeId: 0,
    fromBirthDate: "",
    toBirthDate: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQueries: (state, action: PayloadAction<IState>) => {
      const prevQureries = { ...state.queries };
      const newQueries = action.payload;
      const merged = { ...prevQureries, ...newQueries };
      state.queries = merged;
    },
  },
});

export const { setSearchQueries } = searchSlice.actions;

export default searchSlice.reducer;
