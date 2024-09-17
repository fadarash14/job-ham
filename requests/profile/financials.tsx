import {query, RequestOptions} from "../../utils/request";
export const financials= async function ( options?: RequestOptions){
    return await query('financials', null, {
        prices: {
                id:true,
                category_id: true,
                name: true,
                price: true,
                fromdate: true,
                todate: true,
        },
        vases: {
            name: true,
            id: true,
            is_multipleallowed: true,
            is_availableinregister: true,
        },
        vasPrices: {
                id: true,
                category_id: true,
                price: true,
                vas_id: true,
                fromdate: true,
                todate: true,
        },
    }, options)}

export const getPrices = async function (data: {categoryId: number}, options?: RequestOptions){
    return await query('getVasPrice', data, {
        price:true,
        price_name:true,
        price_id:true,
        vases_info:{
            vass_id:true,
            vass_key:true,
            vass_price:true,
            vass_name:true,
        }
    }, options)
}
