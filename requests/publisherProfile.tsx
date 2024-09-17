import {query, RequestOptions} from "../utils/request";
export const publisherProfile=async function (data?:any,options?:RequestOptions){
    return await query('allAdsActive', data,{
        perPage:true,
        page:true,
        count:true,
        user:{
            id:true,
            name:true,
            lastname:true,
            company:true,
            email:true,
            mobile:true,
            telephone:true,
            iscompany:true,
            address:true,
            status:true,
            pagedetails:true,
            roles:true
        },
        data:{
            id:true,
            name:true,
            content:true,
            pictures:{
                thumbnail:{
                    thumbnail:true,
                }
            },
            category:{
                groupId:true,
                groupString:true,
            },
            location:{
                cityId:true,
                cityString:true,
                areaId:true,
                areaString:true
            },
            filters:{
                id:true
            }
        }
    }, options)
}
