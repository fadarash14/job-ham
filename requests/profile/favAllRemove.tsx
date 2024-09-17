import {number, string} from "prop-types";
import {mutation, RequestOptions} from "../../utils/request";

export const favAllRemove=async function (data:null, options?: RequestOptions){
    return await mutation('favAllRemove', null,{status:true}, options)
}