export const DownloadTypesApp = {
    Myket: '999-99902-2595',
    KafeBazar: '999-99902-2599',
    GooglePlay: '999-99902-2598',
    Default: '999-99902-2597'
}

/**
 *
 * @param finalPrice
 * @param invoiceId
 * @param token
 */
export const  getMyketString = (finalPrice:number=0, invoiceId:number =0,token:string='') => {
    let data = {
        token: token,
        myketId: 'T' + finalPrice,
        payPrice: +finalPrice,
        invoiceId: invoiceId
    }
    return JSON.stringify(data);
}/**
 *
 * @param finalPrice
 * @param invoiceId
 * @param token
 */
export const getBazarString = (finalPrice:number=0, invoiceId:number =0,token:string='') => {
    let data = {
        token: token,
        payPrice: +finalPrice,
        bazarId: 'T' + finalPrice,
        invoiceId: invoiceId
    }
    return JSON.stringify(data);
}