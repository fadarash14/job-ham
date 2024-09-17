import {query, RequestOptions} from "../../utils/request";
import {number, string} from "prop-types";
export const rejectReasons= async function (options?: RequestOptions){
    return await query('rejectReasons', null, {
        id:number,
        type:number,
        value:string
        }, options)}
