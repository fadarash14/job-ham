import { useRouter } from "next/router";
import {useEffect, useRef, useState} from "react";
import { UrlTypes} from "../types";
import { init} from "../utils/helper";
import searchConfig, { search_keys_to_set_get} from "../utils/searchConfig";
import PropTypes from "prop-types";

export default function UseUrlValues(keys:string[]): Partial<UrlTypes>|{[key:string]:string} {
    const router=useRouter()


    const [values,setValues]=useState({});

    useEffect(()=>{
        if (router.query && Object.keys(router.query).length>0) {
            // console.log(keys,'message dd')
            let url_key=router.query;
            let new_Values = init(url_key,keys)
            setValues({...new_Values})
        }else {
            setValues({})
        }

    },[router.query])

    return values
}
UseUrlValues.prototype={
    keys: PropTypes.oneOf(Object.keys(search_keys_to_set_get))
}