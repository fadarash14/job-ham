import {query, RequestOptions} from "../utils/request";
import {number} from "prop-types";
export const getVasPrice= async function (data: number | null | undefined, options?: RequestOptions){
    return await query('getVasPrice', {categoryId:data}, {
        price_id:true,
        price:true,
        vases_info:{
            vass_id: true,
            is_multipleallowed:true
        }
    }  , options)}
