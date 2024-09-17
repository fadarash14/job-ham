import {string} from "prop-types";
import {mutation, RequestOptions} from "../../utils/request";

export const addNote=async function (data: { note: any; advId: number }, options?: RequestOptions){
    return await mutation('addNote',data, {status: true}, options)
}