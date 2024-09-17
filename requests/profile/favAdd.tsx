import {string} from "prop-types";
import {mutation, RequestOptions} from "../../utils/request";

export const favAdd=async function (data:{id:number}, options?:RequestOptions){
    return await mutation('favAdd',data, {id:true, status: true}, options)
}