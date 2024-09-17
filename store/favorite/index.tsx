import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PinnedSearch } from "../../types";
import { removeOnDuplicate } from "../../utils/helper";

const initialState: (string | number)[] = [];
const favorite = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addListFavorite: (state, action: PayloadAction<number>) => {
      let _state = [...state];
      _state.push(action.payload);
      let unique = removeOnDuplicate(_state);
      return unique;
    },
    removeListFavorite: (state, action: PayloadAction<number>) => {
      let _state = [...state];
      _state.splice(_state.indexOf(action.payload), 1);
      return _state;
    },
    removeAllListFavorite: (state, action: PayloadAction<number[]>) => {
      return initialState;
    },
  },
});

export const { addListFavorite, removeListFavorite, removeAllListFavorite } =
  favorite.actions;

export default favorite.reducer;
