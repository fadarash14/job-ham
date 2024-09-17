import {query, RequestOptions} from "../../utils/request";
export const previewAds= async function (data: { id: number }, options?: RequestOptions){
    return await query('myAds', data, {
        errorCode: true,
        errorMessage: true,
        status: true,
        count: true,
        perPage: true,
        page: true,
        data: {
            id: true,
            isSigned: true,
            status: true,
            note: true,
            rejectreasons_id: true,
            rejectdescription: true,
            name: true,
            content: true,
            description: true,
            payment: true,
            categoryId: true,
            cityId: true,
            areaId: true,
            cityString: true,
            areaString: true,
            filters:true,
            contact:true,
            clear: true,
            location: true,
            pictures: {
                name: true,
                image: true,
                thumbnail: true
            },
            open_invoice: true,
            badges: true,
            registerDate: true,
            modifyDate: true,
            confirmDate: true,
            expireDate: true,
            search_view_count: true,
            ads_view_count: true,
            contact_view_count: true,
            suggest_view_count: true,
            adverties:{
                transactionnumber: true,
                totalprice:true,
                registerdate:true,
                id:true,
                is_pay:true,
                finalprice:true,
                rows:{
                    description:true,
                    vas_id:true,
                    price_id:true,
                    price:true,
                }
            }
        }
    }  , options)}
