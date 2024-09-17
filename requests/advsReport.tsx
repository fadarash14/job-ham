import {mutation, RequestOptions} from "../utils/request";
import {number, string} from "prop-types";

export const signUp=async function (data:{mobile:string},options?:RequestOptions){
    return await mutation('advsReport',data, {id: number, value: string},options)
}
