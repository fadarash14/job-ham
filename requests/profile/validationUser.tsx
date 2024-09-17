import {mutation, RequestOptions} from "../../utils/request";

export const validationUser=async function (data: { nationalCode: string; birthdate: string }, options?: RequestOptions){
    return await mutation('validationUser',data, {errorCode: true, errorMessage: true, name: true, lastname:true}, options)
}