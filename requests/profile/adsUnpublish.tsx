import {mutation, RequestOptions} from "../../utils/request";

export const adsUnpublish=async function (data:{id: number}, options?: RequestOptions){
    return await mutation('adsUnpublish',data, {status: true},options)
}