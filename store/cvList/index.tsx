import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
interface IState {
  idList: string[];
}

const initialState: IState = {
  idList: [],
};

const SentCvList = createSlice({
  name: "cvList",
  initialState,
  reducers: {
    setSentCVIds: (state, action: PayloadAction<{ adv: { id: string } }[]>) => {
      const newadIds = action.payload.map((item) => item.adv.id);
      const prevadIds = state.idList;
      state.idList = _.union(newadIds, prevadIds);
    },
    setSingleId: (state, action: PayloadAction<string>) => {
      const newId = [action.payload];
      const prevadIds = state.idList;
      state.idList = _.union(newId, prevadIds);
    },
  },
});
// Action creators are generated for each case reducer function
export const { setSentCVIds, setSingleId } = SentCvList.actions;

export default SentCvList.reducer;
