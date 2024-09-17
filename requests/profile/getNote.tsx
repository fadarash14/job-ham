import {string} from "prop-types";
import {mutation, RequestOptions} from "../../utils/request";

export const getNote=async function (data:{advId:number}, options?:RequestOptions){
    return await mutation('getNote',data, {userId:true, note: true, advId: true}, options)
}