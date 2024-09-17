import {query, RequestOptions} from "../../utils/request";
import {number, string} from "prop-types";
import {Filter} from "../../types";
export const invoices= async function (data: { page: number }, options?: RequestOptions){
    return await query('invoices', data, {
        errorCode: true,
        errorMessage: true,
        status: true,
        count: true,
        perPage: true,
        page: true,
        data: {
            id: true,
            status:true,
            name: true,
            content: true,
            target_id: true,
            paydate:true,
            totaldiscount:true,
            category_id: true,
            city_id: true,
            area_id: true,
            transactionnumber: true,
            totalprice:true,
            registerdate:true,
            is_pay:true,
            finalprice:true,
            payable: true,
            badges: true,
            filters: {
                id:true
            },
            pictures: {
                name: true,
                image: true,
                thumbnail: true
            },
                rows:{
                    description:true,
                    vas_id:true,
                    price_id:true,
                    price:true,
                }
            }

    } , options)}