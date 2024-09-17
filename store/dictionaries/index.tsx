import {createSlice, PayloadAction } from "@reduxjs/toolkit"

let cityId:{[key: string]: {id: number, name: string, lat: number, long: number ,areas: {[key:string] :{ id: number, name: string, lat: number, long: number} }}}= require( '../../dictionaries/cityId.json')
const dictionaries = createSlice({
    initialState: cityId,
    name: 'dictionaries',
    reducers: {
        cityIdJson:(state:any,action:PayloadAction<any>)=>{
            return {...state}
        }

    }
})

export const { cityIdJson } = dictionaries.actions

export default dictionaries.reducer