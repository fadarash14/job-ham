import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AcceptStatuses = {
  statusInterview: string | null;
  dateInterview: string | null;
  timeInterview: string | null;
  descInterview: string | null;
  reasonId:number|null;
};
interface IState {
  statuses: AcceptStatuses;
}

const initialState: IState = {
  statuses: {
    statusInterview: null,
    dateInterview: null,
    timeInterview: null,
    descInterview: null,
    reasonId:null
  },
};

const CvSentForAd = createSlice({
  name: "cvForAd",
  initialState,
  reducers: {
    setStatuses: (state, action: PayloadAction<AcceptStatuses>) => {
      state.statuses = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setStatuses } = CvSentForAd.actions;

export default CvSentForAd.reducer;
