import {query, RequestOptions} from "../../utils/request";
import {number} from "prop-types";
export const favSearch= async function (data: {page:number}, options?: RequestOptions){
    return await query('favSearch', data, {
        status: true,
        count: true,
        perPage: true,
        page: true,
        data: {
            id: true,
            name: true,
            code: true,
            content: true,
            category: {
                groupId: true,
                groupString: true,
                categoryId: true,
                categoryString: true
            },
            location: {
                pin: true,
                cityId: true,
                cityString:true,
                areaId: true,
                areaString: true,
            },
            filters: {
                id: true,
                key: true,
                type: true,
                label: true,
                ordernumber: true,
                options: {
                    id: true,
                    name: true,
                    option_id: true
                },
                is_visibleoncard: true,
            },
            price: {
                type: true,
                unit: true,
                absolute: true,
                rental: {
                    mortgage: true,
                    rent: true
                },
                installments: {
                    prepay: true,
                    installment: true,
                    periodsCount: true,
                    periodsDuration: true
                }
            },
            pictures: {
                thumbnail:{
                    name: true,
                    image: true,
                    thumbnail: true
                },
                all: {
                    name: true,
                    image: true
                }
            },
            releasedAt: true,
            badges: true,

            vases: {
                id: true,
                name: true,
                label: true,
                price: true
            }
        }
    }, options)
}
