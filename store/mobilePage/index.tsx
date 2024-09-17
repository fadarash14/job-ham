import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PinnedSearch } from "../../types"
type InitialType={showMobileCategory: boolean , showMobileFilter:boolean, showHome:boolean, showProfile:boolean}
const initialState:InitialType ={showMobileCategory: false , showMobileFilter:false, showHome:true, showProfile:false};
const mobileConfig = createSlice({
    name: 'mobileConfig',
    initialState,
    reducers: {
        setShowMobileCategory:(state:InitialType,action:PayloadAction<boolean>)=>{
            return { showHome:true ,showMobileCategory: action.payload, showMobileFilter: false, showProfile:false }
        },
        setShowMobileFilter:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state,showMobileCategory:false, showMobileFilter: action.payload }
        },
        setShowHome:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {showHome:true, showMobileCategory:!action.payload, showMobileFilter: false, showProfile:false }
        },
        setShowProfile:(state:InitialType,action:PayloadAction<boolean>)=>{
            return {...state, showMobileCategory:!action.payload ,showHome:false, showProfile:action.payload }
        },
        setFalse:(state:InitialType, action:PayloadAction<boolean>)=>{
            return {showMobileCategory: false , showMobileFilter:false, showHome:false, showProfile:false}
        }

    }
})

// Action creators are generated for each case reducer function
export const { setShowMobileCategory , setShowMobileFilter, setShowHome, setShowProfile, setFalse} = mobileConfig.actions

export default mobileConfig.reducer