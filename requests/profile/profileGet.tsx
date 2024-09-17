import {query, RequestOptions} from "../../utils/request";
export const profileGet= async function (data: null, options?: RequestOptions){
    return await query('profileGet', data, {errorCode:true,
        errorMessage:true,
        name:true,
        lastname:true,
        status:true,
        iscompany:true,
        company:true,
        nationalnumber:true,
        birthdate:true,
        registernumber:true,
        financialnumber: true,
        address:true,
        roles:true
    } , options)}