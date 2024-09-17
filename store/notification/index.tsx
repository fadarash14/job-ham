import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PinnedSearch } from "../../types"
type InitialType={decline:boolean}
const initialState:InitialType ={decline:false};
const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setDecline:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state,decline:action.payload }
        }

    }
})

// Action creators are generated for each case reducer function
export const { setDecline } = notification.actions

export default notification.reducer
