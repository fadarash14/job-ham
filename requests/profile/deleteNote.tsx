import {string} from "prop-types";
import {mutation, RequestOptions} from "../../utils/request";

export const deleteNote=async function (data: { advId: number }, options?: RequestOptions){
    return await mutation('deleteNote',data, {status: true}, options)
}