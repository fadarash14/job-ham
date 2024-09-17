import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import {Toggle} from "../../types";

const initialState:Partial<Toggle>={toggle:false};
const removeAllFav = createSlice({
    name: 'removeAllFav',
    initialState,
    reducers: {
        removeAll: (state: Partial<Toggle>,action:PayloadAction<boolean>) => {
           return {toggle:action.payload}

        }
    }
})
// Action creators are generated for each case reducer function
export const {removeAll} = removeAllFav.actions

export default removeAllFav.reducer