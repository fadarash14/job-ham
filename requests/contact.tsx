import {query, RequestOptions} from "../utils/request";
export const loadContact = async function (data: { id: number }, options?: RequestOptions) {
    return await query('searchContact', data, {
        email: true,
        mobile: true,
        tel: true,

    }, options)
}