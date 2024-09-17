import {mutation, query, RequestOptions} from "../../utils/request";
import {number, string} from "prop-types";
import {Filter} from "../../types";
export const payInvoice= async function (data: { vasPriceIds: number[], priceId:number, adsId:number }, options?: RequestOptions){
    return await mutation('invoiceSubmit', data, {
        id: true, payable: true, invoiceId:true,
    } , options)}