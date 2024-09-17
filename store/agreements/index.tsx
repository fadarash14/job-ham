import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PinnedSearch } from "../../types"
type InitialType={showPhoneRules:boolean}
const initialState:InitialType ={showPhoneRules:false};
const agreements = createSlice({
    name: 'agreements',
    initialState,
    reducers: {
        setShowPhoneRules:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state,showPhoneRules:action.payload }
        }

    }
})

// Action creators are generated for each case reducer function
export const { setShowPhoneRules } = agreements.actions

export default agreements.reducer