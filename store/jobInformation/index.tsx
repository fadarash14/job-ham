import { IAdJob } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  post: IAdJob | null;
};

const initialState: Props = {
  post: null,
};

const jobInfo = createSlice({
  name: "jobInfo",
  initialState,
  reducers: {
    getJobDetail: (state, action: PayloadAction<IAdJob>) => {
      state.post = action.payload;
    },
    removeJobDetail: (state, action: PayloadAction) => {
      state.post = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const { getJobDetail, removeJobDetail } = jobInfo.actions;

export default jobInfo.reducer;
